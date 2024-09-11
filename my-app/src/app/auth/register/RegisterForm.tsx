"use client";

import { nameMaxLenght, passwordMinLenght } from "@/lib/config";
import React, { useState } from "react";

interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  email,
  password,
  onChangeName,
  onChangeEmail,
  onChangePassword,
  isSubmitting,
}) => {
  const [showPassword, setShowPassword] = useState(false);
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
          onChange={onChangeName}
          placeholder={`${nameMaxLenght}文字以内で入力してください`}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          disabled={isSubmitting}
        />
        <p className="text-xs text-gray-500">
          現在の文字数: {name.length}/{nameMaxLenght}
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          メールアドレス
        </label>
        <input
          type="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="メールアドレスを入力してください"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          disabled={isSubmitting}
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
            onChange={onChangePassword}
            placeholder={`${passwordMinLenght}文字以上で入力してください`}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            disabled={isSubmitting}
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
