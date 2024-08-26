<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;

class JwtController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized', 'message' => trans('auth.login.failed')], Response::HTTP_UNAUTHORIZED);
        }

        $refreshToken = $this->createRefreshToken();

        return $this->respondWithToken($token, $refreshToken);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws JWTException
     */
    public function refresh()
    {
        try {
            $refreshToken = request()->refresh_token;
            $data = JWTAuth::getJWTProvider()->decode($refreshToken);

            $user = User::find($data['user_id']);

            if (!$user) {
                return response()->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
            }

            Auth::invalidate();

            $token = auth()->login($user);
            $refreshToken = $this->createRefreshToken();

            return $this->respondWithToken($token, $refreshToken);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Refresh Token Invalid'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile()
    {
        return response()->json(auth()->user(), Response::HTTP_OK);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out'], Response::HTTP_OK);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    private function respondWithToken($token, $refreshToken)
    {
        return response()->json([
            'access_token' => $token,
            'refresh_token' => $refreshToken,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60

        ]);
    }

    /**
     * Get the expiration time of the access token
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws JWTException
     */
    private function getAccessTokenExpiration()
    {
        try {
            $token = request()->bearerToken();

            $payload = JWTAuth::setToken($token)->getPayload();

            $expiration = $payload['exp'];

            $expirationTime = Carbon::createFromTimestamp($expiration);

            return response()->json([
                'expires_at' => $expirationTime->toDateTimeString(),
                'expires_in' => $expirationTime->diffForHumans()
            ]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token is invalid'], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Created refresh token
     *
     */
    private function createRefreshToken()
    {
        $data = [
            'user_id' => auth()->user()->id,
            'random' => rand() . time(),
            'exp' => time() + config('jwt.refresh_ttl')
        ];

        $refreshToken = JWTAuth::getJWTProvider()->encode($data);

        return $refreshToken;
    }
}
