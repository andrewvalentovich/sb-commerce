<?php

namespace App\Http\Middleware\Roles;

use App\Exceptions\Handler;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if ($user->hasRole('admin')) {
            return $next($request);
        }

        return response()->json(['message' => 'У вас недостаточно прав.'], 403);
    }
}
