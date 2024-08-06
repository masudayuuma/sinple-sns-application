'use client';

import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const isFormValid = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(email) && password.length >= 8;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid && !isLoading) {
            setIsLoading(true);
            setError(null);
            try {
                await login(email, password);
            } catch (err) {
                setError('メールアドレスまたはパスワードが間違っています');
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        if (searchParams.get('success') === 'true') {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                router.replace('/auth/login');
            }, 3000);
        }
        
        if (error) {
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [searchParams, router, error]);

    return (
        <div className="container mx-auto p-4">
            {showSuccessMessage && (
                <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                    ログアウトしました！
                </div>
            )}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-6">ログイン</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
                    <input
                        type="email"
                        value={email}
                        placeholder='メールアドレスを入力してください'
                        onChange={handleEmailChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                        disabled={isLoading}
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
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            disabled={isLoading}
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
                    {isLoading ? 'Loading...' : 'ログイン'}
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

export default LoginForm;
