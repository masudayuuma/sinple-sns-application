import { passwordMinLenght } from "@/lib/config";
import React, { useState } from "react";

interface LoginFormProps {
  email: string;
  password: string;
  isSubmitting: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  isSubmitting,
  onEmailChange,
  onPasswordChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">ログイン</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          メールアドレス
        </label>
        <input
          type="email"
          value={email}
          placeholder="メールアドレスを入力してください"
          onChange={onEmailChange}
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
            onChange={onPasswordChange}
            placeholder={`${passwordMinLenght}文字以上で入力してください`}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            disabled={isSubmitting}
          >
            {showPassword ? "非表示" : "表示"}
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
