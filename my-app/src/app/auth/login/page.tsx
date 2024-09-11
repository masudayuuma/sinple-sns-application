"use client";

import React, { useState, useEffect } from "react";
import useFlashMessage from "@/lib/hooks/useFlashMessage";
import { emailFormat, passwordMinLenght } from "@/lib/config";
import LoginButton from "./loginButtom";
import FlashMessage from "@/lib/components/flashMessage";
import LoginForm from "./loginForm";
import useAuth from "@/lib/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const { login } = useAuth();
  const { flashMessage, type, isVisible, showFlashMessage } = useFlashMessage();

  const isFormValid =
    emailFormat.test(email) && password.length >= passwordMinLenght;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setisSubmitting(true);
    const error = await login(email, password);
    if (error) {
      showFlashMessage(error, "error");
      setisSubmitting(false);
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
    <div className="p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <LoginForm
          email={email}
          password={password}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          isSubmitting={isSubmitting}
        />
        <LoginButton isSubmitting={isSubmitting} isFormValid={isFormValid} />
      </form>
      <FlashMessage message={flashMessage} type={type} visible={isVisible} />
    </div>
  );
};

export default LoginPage;
