"use client";
import useAuth from "@/lib/hooks/useAuth";
import React, { useState } from "react";
import FlashMessage from "@/lib/components/flashMessage";
import useFlashMessage from "@/lib/hooks/useFlashMessage";
import { emailFormat, nameMaxLenght, passwordMinLenght } from "@/lib/config";
import RegisterForm from "./registerForm";
import RegisterButton from "./registerButtom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSumbitting, setisSumbitting] = useState(false);
  const { showFlashMessage, type, isVisible, flashMessage } = useFlashMessage();
  const { register } = useAuth();

  const isFormValid =
    name.length > 0 &&
    name.length <= nameMaxLenght &&
    emailFormat.test(email) &&
    password.length >= passwordMinLenght;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setisSumbitting(true);
    const error = await register(name, email, password);
    if (error) {
      showFlashMessage(error, "error");
      setisSumbitting(false);
    }
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <RegisterForm
          name={name}
          email={email}
          password={password}
          onChangeName={(e) => setName(e.target.value)}
          onChangeEmail={(e) => setEmail(e.target.value)}
          onChangePassword={(e) => setPassword(e.target.value)}
          isSubmitting={isSumbitting}
        />
        <RegisterButton isSubmitting={isSumbitting} isFormValid={isFormValid} />
      </form>
      <FlashMessage message={flashMessage} type={type} visible={isVisible} />
    </div>
  );
};

export default RegisterPage;
