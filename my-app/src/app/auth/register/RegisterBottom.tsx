interface RegisterBottomProps {
  onRegister: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  isFormValid: boolean;
}

const RegisterBotton: React.FC<RegisterBottomProps> = ({
  onRegister,
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
      onClick={onRegister}
    >
      {isLoading ? "Loading..." : "新規登録"}
    </button>
  );
};

export default RegisterBotton;
