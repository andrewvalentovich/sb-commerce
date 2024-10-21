<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RecoveryCode extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public $data
    ) {
    }

    public function envelope(): Envelope {
        return new Envelope(
            subject: 'Восстановление пароля slovo-book.ru',
        );
    }

    public function content(): Content {
        return new Content(
            view: 'emails.recovery.code'
        );
    }
}
