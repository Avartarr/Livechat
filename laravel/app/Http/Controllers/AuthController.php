<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)

    {

        $credentials = $request->only('username', 'password');

    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        return response()->json(['user' => $user, 'message' => 'Login Successful'], 200);
    }

    return response()->json(['message' => 'Invalid Credentials'], 401);
}
}
