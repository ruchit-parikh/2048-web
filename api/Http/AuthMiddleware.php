<?php

namespace Http;

use Exception;

class AuthMiddleware
{
    /**
     * Checks if user is logged in or not
     */
    public static function checkAuth(Request $request)
    {
        session_start();
		try {
			$email = openssl_decrypt($request->token, openssl_get_cipher_methods()[0], APPKEY, 0, APPKEY);
			if ($_SESSION['loggedin'] == $email) {
				return true;
			}
			return false;
		} catch (Exception $e) {
			echo "Error: ".$e->getMessage();
			return false;
		}
    }
}