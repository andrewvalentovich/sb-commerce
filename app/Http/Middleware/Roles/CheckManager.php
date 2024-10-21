<?php

namespace App\Http\Middleware\Roles;

use App\Exceptions\Handler;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckManager
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if (!($user->hasRole('manager') || $user->hasRole('admin'))) {
            return response()->json(['message' => 'У вас недостаточно прав.'], 403);
        }

        return $next($request);
    }
}
