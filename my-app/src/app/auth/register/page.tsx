"use client";
import useAuth from "@/lib/hooks/useAuth";
import React, { useState } from "react";
import {
  EMAIL_FORMAT,
  NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/lib/config";
import RegisterForm from "./RegisterForm";
import AsyncButton from "@/lib/components/AsyncButton";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { performRegistration } = useAuth();

  const isFormValid =
    name.length > 0 &&
    name.length <= NAME_MAX_LENGTH &&
    EMAIL_FORMAT.test(email) &&
    password.length >= PASSWORD_MIN_LENGTH;

  return (
    <div className="p-4">
      <form className="bg-white p-6 rounded-lg shadow-md w-80">
        <RegisterForm
          name={name}
          email={email}
          password={password}
          onChangeName={(e) => setName(e.target.value)}
          onChangeEmail={(e) => setEmail(e.target.value)}
          onChangePassword={(e) => setPassword(e.target.value)}
        />
        <AsyncButton
          type="submit"
          onClick={() => performRegistration(name, email, password)}
          disabled={!isFormValid}
          loadingText="登録中"
          baseClassName="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
          activeClassName="bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-700"
          disabledClassName="bg-gray-400 cursor-not-allowed"
        >
          新規登録
        </AsyncButton>
      </form>
    </div>
  );
};

export default RegisterPage;
