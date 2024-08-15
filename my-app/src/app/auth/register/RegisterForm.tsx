'use client';

import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const { register } = useAuth();


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const isFormValid =
            name.length > 0 &&
            name.length <= 20 &&
            /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(email) &&
            password.length >= 8;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid && !isLoading) {
            setIsLoading(true);
            setError(null);

            const response = await register(name, email, password);
            if (!response.success) {
                setError(response.error || 'メールアドレスまたはパスワードが間違っています');
                setShowErrorMessage(true);
                setTimeout(() => {
                    setError(null);
                    setIsLoading(false);
                    setShowErrorMessage(false);
                }, 2000);
                // ダイアログとフラッシュメッセージともに表示する必要はないと考える
                // alert(error); 
            }
        }
    }

    return (
        <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-2xl font-bold mb-6">新規登録</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">アカウント名</label>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder='20文字以内で入力してください'
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
                <p className="text-xs text-gray-500">現在の文字数: {name.length}/20</p>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder='メールアドレスを入力してください'
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">パスワード</label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder='8文字以上で入力してください'
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                        {showPassword ? '非表示' : '表示'}
                    </button>
                </div>
            </div>
            <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isFormValid && !isLoading
                      ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
            >
                {isLoading ? 'Loading...' : '新規登録'}
            </button>
        </form>
        {showErrorMessage && (
                <div className="mt-4 text-sm text-red-700 bg-red-100 p-2 rounded-lg">
                {error}
                </div>
            )}
        </div>
    );
};

export default RegisterForm;
