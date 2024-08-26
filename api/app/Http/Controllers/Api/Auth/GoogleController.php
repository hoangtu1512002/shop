<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver("google")->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver("google")->user();
            return response()->json($googleUser);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }
    }
}
