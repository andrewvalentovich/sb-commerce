<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Api\Recovery\PasswordRequest;
use App\Models\User;
use App\Services\EmailService;
use App\Services\RecoveryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class RecoveryController extends ApiController
{
    protected mixed $recoveryService;

    CONST LOGIN_ITERATION = 'login';
    CONST CODE_ITERATION = 'code';
    CONST PASSWORD_ITERATION = 'password';
    CONST SUCCESS_ITERATION = 'success';


    public function __construct(RecoveryService $recoveryService)
    {
        $this->recoveryService = $recoveryService;
    }

    public function recovery(Request $request)
    {
        $user = $this->checkUser($request);

        switch ($request->query('action')) {
            case 'login':
                return $this->loginIteration($request, $user);
            case 'code':
                return $this->codeIteration($request, $user);
            case 'password':
                return $this->passwordIteration($request, $user);
            default:
                return $this->sendError('Неизвестаня итерация восстановления пароля, попробуйте сначала.');
        }

//        return $this->sendError('Не удалось получить событие для выполнения сценария. Попробуйте ещё раз.');
    }

    public function loginIteration(Request $request, User $user)
    {
        $emailService = EmailService::make();
        $emailService->sendRecoveryCode($user, $this->recoveryService->generateCode($user));
        \Log::info('loginIteration is good');

        return response()->json([
            'success' => true,
            'message' => 'Сообщение с кодом для восстановления отправлено на почту ' . $emailService->maskEmail($user->email),
            'data' => [
                'maskEmail' => $emailService->maskEmail($user->email),
                'iterations' => [
                    'prev' => self::LOGIN_ITERATION,
                    'current' => self::CODE_ITERATION,
                    'next' => self::PASSWORD_ITERATION,
                ]
            ]
        ], 200);
    }

    public function codeIteration(Request $request, User $user)
    {
        \Log::info('RecoveryController codeIteration', [$this->codeCredentials($request, $user)]);

        return response()->json([
            'success' => true,
            'message' => 'Код для восстановления пароля совпадает.',
            'data' => [
                'iterations' => [
                    'prev' => self::CODE_ITERATION,
                    'current' => self::PASSWORD_ITERATION,
                    'next' => self::SUCCESS_ITERATION,
                ]
            ]
        ], 200);
    }

    public function passwordIteration(Request $request, User $user)
    {
        $data = $this->passwordCredentials($request, $user);
        \Log::info('RecoveryController passwordIteration', [$this->passwordCredentials($request, $user)]);
        $user->update([
            'password' => Hash::make($data['password'])
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Пароль успешно изменён.',
            'data' => [
                'iterations' => [
                    'prev' => self::PASSWORD_ITERATION,
                    'current' => self::SUCCESS_ITERATION,
                    'next' => null,
                ]
            ]
        ], 200);
    }

    private function loginCredentials(Request $request)
    {
        if (str_contains($request->get('login'), '@')) {
            $validator = Validator::make($request->all(), ['login' => 'required|string|email|exists:users,email']);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            return ['email' => $request->get('login')];
        } else {
            $validator = Validator::make($request->all(), ['login' => ['required', 'string', 'regex:/^\+?\d{11,15}$/', 'exists:users,phone']]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            return ['phone' => $request->get('login')];
        }
    }

    private function checkUser(Request $request)
    {
        $data = $this->loginCredentials($request);
        \Log::info('RecoveryService loginIteration login', [$data]);

        $user = User::where(array_key_first($data), $data[array_key_first($data)])->first();
        \Log::info('RecoveryService checkUser $user', [$user]);

        if ($user) {
            return $user;
        }

        throw ValidationException::withMessages(['message' => 'Пользователя с такими данными не найдено.']);
    }

    private function codeCredentials(Request $request, $user)
    {
        $data = $this->loginCredentials($request);

        if ($this->recoveryService->checkCode($user, $request->get('code'))) {
            return ['code' => $request->get('code'), ...$data];
        }

        throw ValidationException::withMessages([
            'message' => 'Указан некорректный код.'
        ]);
    }

    private function passwordCredentials(Request $request, $user)
    {
        $data = $this->codeCredentials($request, $user);

        $passwordRequest = app(PasswordRequest::class);
        return [...$passwordRequest->validated(), ...$data];
    }
}
