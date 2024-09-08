"use client";
import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import RegisterBotton from "@/app/auth/register/RegisterBottom";
import FlashMessage from "@/components/FlashMessage";
import RegisterForm from "@/app/auth/register/RegisterForm";
import useFlashMessage from "@/hooks/useFlashMessage";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showFlashMessage, type, isVisible, flashMessage } = useFlashMessage();
  const { register } = useAuth();

  const isFormValid =
    name.length > 0 &&
    name.length <= 20 &&
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(
      email
    ) &&
    password.length >= 8;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await register(name, email, password);
    if (response) {
      showFlashMessage(response, "error");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form className="bg-white p-6 rounded-lg shadow-md w-80">
        <RegisterForm
          name={name}
          email={email}
          password={password}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          isLoading={isLoading}
        />
        <RegisterBotton
          onRegister={handleRegister}
          isLoading={isLoading}
          isFormValid={isFormValid}
        />
      </form>
      <FlashMessage message={flashMessage} type={type} visible={isVisible} />
    </div>
  );
};

export default RegisterPage;
