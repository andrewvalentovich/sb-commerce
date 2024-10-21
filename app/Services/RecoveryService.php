<?php

namespace App\Services;

use App\Models\User;

class RecoveryService extends CoreService
{
    public function generateCode(User $user)
    {
        $cacheKey = "recovery_user_{$user->id}";
        $code = rand(10000, 99999);

        if (! ($result = cache($cacheKey)) || ($result['expired_time'] - time()) <= 0) {
            $attempt = $result['attempt'] ?? 0;
            $time_resend = config('cache_lifetime');

            $start_time = time();
            $expired_time = time() + $time_resend;

            $result = compact('start_time', 'expired_time', 'time_resend');
            $result['attempt'] = $attempt + 1;

            $result['code'] = $code;

            cache([$cacheKey => $result], config('cache_lifetime'));
            $result['request_sent'] = true;
        }

        $result['time_left'] = $result['expired_time'] - time();
        \Log::info('Recovery service generate code', ['result' => $result]);

        return $result;
    }

    public function checkCode(User $user, string $code)
    {
        $cacheKey = "recovery_user_{$user->id}";
        $result = cache($cacheKey);
        \Log::info('Recovery service checkCode', ['result' => $result]);

        if (! $result || ($result['expired_time'] - time()) <= 0) {
            return $result['code'] == $code;
        }

        throw new \Exception('Прошло слишком много времени. Попробуйте сначала.', 422);
    }

    protected function getModelClass(): string {
        return User::class;
    }
}
