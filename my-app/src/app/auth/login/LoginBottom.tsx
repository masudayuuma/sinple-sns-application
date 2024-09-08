interface LoginBottomProps {
  onLogin: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  isFormValid: boolean;
}

const LoginButton: React.FC<LoginBottomProps> = ({
  onLogin,
  isLoading,
  isFormValid,
}) => {
  return (
    <button
      type="submit"
      disabled={!isFormValid || isLoading}
      className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
        isFormValid && !isLoading
          ? "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-700"
          : "bg-gray-400 cursor-not-allowed"
      }`}
      onClick={onLogin}
    >
      {isLoading ? "Loading..." : "ログイン"}
    </button>
  );
};

export default LoginButton;
