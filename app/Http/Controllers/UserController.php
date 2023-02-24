<?php

namespace App\Http\Controllers;

use App\Classes\ActionResponseMessage;
use App\Classes\SingleResponseMessage;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $loginResponse = new SingleResponseMessage();
        try {
            $userLoginRequest = $request->all();
            $userNameLogin = $userLoginRequest['userName'];
            $passwordLogin = md5($userLoginRequest['password']);
            $userFounded = User::select('Id', 'UserName', 'FullName', 'DateOfBirth', 'PhoneNumber', 'IsAdmin')->where('UserName', $userNameLogin)->where('Password', $passwordLogin)->first();
            if ($userFounded == null) {
                throw new \Exception("Tên đăng nhập hoặc mật khẩu không hợp lệ! Vui lòng thử lại!");
            } else {
                $loginResponse->setIsSuccess(true);
                $loginResponse->setItem($userFounded);
            }
        } catch (\Exception $ex) {
            $loginResponse->setIsSuccess(false);
            $loginResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($loginResponse);
    }

    public function register(Request $request)
    {
        $registerActionResponse = new ActionResponseMessage();
        try {
            $userRegisterRequest = $request->all();
            if (User::where('UserName', $userRegisterRequest['userName'])->count() > 0) {
                $registerActionResponse->setIsSuccess(false);
                throw new \Exception("Tên đăng nhập đã tồn tại! Vui lòng nhập tên đăng nhập khác!");
            } else {
                $userRegister = new User();
                $userRegister->UserName = $userRegisterRequest['userName'];
                $userRegister->FullName = $userRegisterRequest['fullName'];
                $userRegister->DateOfBirth = $userRegisterRequest['dateOfBirth'];
                $userRegister->PhoneNumber = $userRegisterRequest['phoneNumber'];
                $userRegister->Password = md5($userRegisterRequest['password']);
                if ($userRegister->save()) {
                    $registerActionResponse->setIsSuccess(true);
                }
            }
        } catch (\Exception $ex) {
            $registerActionResponse->setIsSuccess(false);
            $registerActionResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($registerActionResponse);
    }

    public function getUser(Request $request)
    {
        $userResponse = new SingleResponseMessage();
        try {
            $userId = $request->query('userId');
            $userFounded = User::select('Id', 'UserName', 'FullName', 'DateOfBirth', 'PhoneNumber', 'IsAdmin')->where('Id', $userId)->first();
            if ($userFounded == null) {
                throw new \Exception("Không tìm thấy user! Vui lòng thử lại!");
            } else {
                $userResponse->setIsSuccess(true);
                $userResponse->setItem($userFounded);
            }
        } catch (\Exception $ex) {
            $userResponse->setIsSuccess(false);
            $userResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($userResponse);
    }
}
