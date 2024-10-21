<?php

namespace App\Http\Controllers\Api\Auth;

use App\Enums\Users\StatusesEnum;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class LoginController extends ApiController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request) {
        $this->validateLogin($request);
        $credentials = $this->credentials($request);

        if (Auth::attempt($credentials)) {
            if ($request->hasSession()) {
                $request->session()->put('auth.password_confirmed_at', time());
            }

            $user = Auth::user();

            if ($user) {
                if ($user->status === StatusesEnum::BlackList) {
                    throw ValidationException::withMessages([
                        'message' => "Ваш аккаунт находится в чёрном списке."
                    ]);
                }

                if ($user->status === StatusesEnum::Moderated) {
                    throw ValidationException::withMessages([
                        'message' => "Ваш аккаунт находится в процессе модерации."
                    ]);
                }
            }

            $token = $user->createToken('api');

            return $this->sendResponse([
                'token' => $token->plainTextToken,
                'token_type' => 'bearer',
            ]);
        } else {
            throw ValidationException::withMessages([
                $this->username() => [trans('auth.failed')],
            ]);
        }
    }

    protected function credentials(Request $request)
    {
        return $request->only('email', 'password');
    }

    protected function validateLogin(Request $request) {
        return $request->validate([
//            'email' => ['required', 'string', 'regex:/^\+?\d{11,15}$/'],
            'email' => ['required', 'string', 'email', 'exists:users,email'],
            'password' => ['required', 'string', Password::min(6)->symbols()],
        ], [
            'phone.required' => 'Введите номер телефона',
            'phone.regex' => 'Телефон указан не верно. Пример: +7 (999) 123-45-67',
            'password.required' => 'Введите пароль',
            'password.min' => 'Минимальная длина пароля 6 символов',
            'password.symbols' => 'Пароль должен содержать минимум один специальный символ («!», «@», «#», «$» и т.д.)',
        ]);
    }

    public function logout(Request $request) {
        Auth::user()->currentAccessToken()->delete();
        return response('', 204);
    }
}
