<?php

namespace App\Http\Controllers\Api\Admin\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\Api\Admin\UserRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use App\Mail\Verified;
use DateTime;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;

use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    /**
     * Get all users
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users, Response::HTTP_OK);
    }

    /**
     * Register user
     *
     * @param UserRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws Throwable
     */
    public function regist(UserRequest $request)
    {
        try {
            $data = $request->all();

            $data['password'] = Hash::make($request->password);

            if ($acc = User::create($data)) {
                Mail::to($acc->email)->send(new Verified($acc));
            }

            return response()->json(['message' => 'User registered successfully'], Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Registration failed'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Verified
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws TokenExpiredException
     * @throws TokenInvalidException
     * @throws JWTException
     */
    public function verified(Request $request)
    {
        try {
            $token = $request->token;

            $data = JWTAuth::getJWTProvider()->decode($token);

            $emailVerified = $data['email'];

            $user = User::where('email', $emailVerified)->whereNull('email_verified_at')->firstOrFail();

            $user->email_verified_at = new DateTime();

            $user->save();

            return response()->json(['message' => 'Email verification successful'], Response::HTTP_OK);

        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'Token has expired'], Response::HTTP_BAD_REQUEST);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Token Invalid'], Response::HTTP_BAD_REQUEST);
        } catch (JWTException $e) {
            return response()->json(['error' => 'There was an error processing the token'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
