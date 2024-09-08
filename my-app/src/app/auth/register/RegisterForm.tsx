"use client";

import React, { useEffect, useState } from "react";

interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  isLoading,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">新規登録</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          アカウント名
        </label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="20文字以内で入力してください"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          disabled={isLoading}
        />
        <p className="text-xs text-gray-500">現在の文字数: {name.length}/20</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          メールアドレス
        </label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="メールアドレスを入力してください"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          disabled={isLoading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          パスワード
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="8文字以上で入力してください"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? "非表示" : "表示"}
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
