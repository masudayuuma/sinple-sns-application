"use client";

import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import LoginButton from "@/app/auth/login/LoginBottom";
import LoginForm from "@/app/auth/login/LoginForm";
import FlashMessage from "@/components/FlashMessage";
import useFlashMessage from "@/hooks/useFlashMessage";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { flashMessage, type, isVisible, showFlashMessage } = useFlashMessage();

  const isFormValid =
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(
      email
    ) && password.length >= 8;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await login(email, password);
    if (response) {
      showFlashMessage(response, "error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      showFlashMessage("ログアウトしました", "success");
      router.replace("/auth/login");
    }
    if (searchParams.get("success") === "false") {
      showFlashMessage("エラーが発生したためログアウトしました", "error");
      router.replace("/auth/login");
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <form className="bg-white p-6 rounded-lg shadow-md w-80">
        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          isLoading={isLoading}
        />
        <LoginButton
          onLogin={handleLogin}
          isLoading={isLoading}
          isFormValid={isFormValid}
        />
      </form>
      <FlashMessage message={flashMessage} type={type} visible={isVisible} />
    </div>
  );
};

export default LoginPage;
