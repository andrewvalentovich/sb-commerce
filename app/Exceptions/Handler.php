<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class Handler extends Exception
{
    /**
     * Render the exception as an HTTP response.
     */
    public function render(Request $request): Response
    {
        return response()->json(['message' => $this->getMessage()], $this->getCode());
    }
}
