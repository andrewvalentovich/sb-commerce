<?php

namespace App\Services;

use App\Mail\RecoveryCode;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class EmailService
{
    public function sendRecoveryCode(User $user, array $data)
    {
        \Log::info('sendRecoveryCode result - ', [
            $this->sendEmail(
                RecoveryCode::class,
                [$user->email],
                $data
            )
        ]);
    }

    private function sendEmail(string $className, array $recipients, array $data) {
        \Log::info('sendEmail data', [
            'recipient' => $recipients,
            'className' => $className,
            'data' => $data,
        ]);

        foreach ($recipients as $recipient) {
            try {
                Mail::to($recipient)
                    ->send(new $className($data));
            } catch (\Exception $e) {
                \Log::error('SendEmail error', [
                    'recipient' => $recipient,
                    'className' => $className,
                    'data' => $data,
                    'line' => $e->getLine(),
                    'message' => $e->getMessage()
                ]);
            }
        }
    }

    public function maskEmail(string $email): string
    {
        return preg_replace('/(?<!^).(?=[^@]+@)/', '*', $email);
    }

    public static function make(): static {
        return app(static::class);
    }
}
