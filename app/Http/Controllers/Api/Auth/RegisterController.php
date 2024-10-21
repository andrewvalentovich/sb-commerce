<?php

namespace App\Http\Controllers\Api\Auth;

use App\Enums\Users\StatusesEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Register\CodeRequest;
use App\Http\Requests\Api\Register\StoreRequest;
use App\Models\User;
use App\Services\SmsRuService;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    use RegistersUsers;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function register(StoreRequest $request)
    {
        $data = $request->validated();
        \Log::info('register', [$data]);

        event(new Registered($user = $this->create($data)));
        $token = $user->createToken('api');

        return response()->json([
            'id' => $user->getKey(),
            'token' => $token->plainTextToken,
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param array $data
     * @return \App\Models\User
     * @throws \Psr\SimpleCache\InvalidArgumentException
     */
    protected function create(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
//            'phone_verified_at' => Carbon::now(),
            'password' => Hash::make($data['password']),
            'status' => StatusesEnum::Moderated
        ]);

        $user->syncRoles(['client']);

        return $user;
    }
}
