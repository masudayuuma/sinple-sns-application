"use client";

import React, { useState } from "react";
import { EMAIL_FORMAT, PASSWORD_MIN_LENGTH } from "@/lib/config";
import useAuth from "@/lib/hooks/useAuth";
import LoginForm from "./LoginForm";
import AsyncButton from "@/lib/components/AsyncButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { performLogin } = useAuth();

  const isFormValid =
    EMAIL_FORMAT.test(email) && password.length >= PASSWORD_MIN_LENGTH;

  return (
    <div className="p-4">
      <form className="bg-white p-6 rounded-lg shadow-md w-80">
        <LoginForm
          email={email}
          password={password}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
        />
        <AsyncButton
          type="submit"
          onClick={() => performLogin(email, password)}
          disabled={!isFormValid}
          loadingText={"ログイン中"}
          baseClassName="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
          activeClassName="bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-700"
          disabledClassName="bg-gray-400 cursor-not-allowed"
        >
          ログイン
        </AsyncButton>
      </form>
    </div>
  );
};

export default LoginPage;
