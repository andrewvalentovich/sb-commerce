<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

/**
 *  ApiController
 */
abstract class ApiController extends Controller
{
    public function sendResponse(array|JsonResource|LengthAwarePaginator $data, string $message = ''): JsonResponse
    {
        $resource = [
            'success' => true,
            'data' => $data,
            'message' => $message,
        ];

        return response()->json($resource, ResponseAlias::HTTP_OK);
    }

    public function sendError(string $error, array $errorMessages = [], int $code = 404): JsonResponse
    {
        $resource = [
            'success' => false,
            'message' => $error,
        ];

        if (! empty($errorMessages)) {
            $resource['data'] = $errorMessages;
        }

        return response()->json($resource, $code);
    }

    public function noContent(): Response
    {
        return response()->noContent();
    }

    public function createdOk(string $message): JsonResponse
    {
        return response()->json(['success' => true, 'message' => $message], 201);
    }
}
