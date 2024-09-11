interface LoginButtomProps {
  isSubmitting: boolean;
  isFormValid: boolean;
}

const LoginButton: React.FC<LoginButtomProps> = ({
  isSubmitting,
  isFormValid,
}) => {
  return (
    <button
      type="submit"
      disabled={!isFormValid || isSubmitting}
      className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
        isFormValid && !isSubmitting
          ? "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-indigo-700"
          : "bg-gray-400 cursor-not-allowed"
      }`}
    >
      {isSubmitting ? "ログイン中..." : "ログイン"}
    </button>
  );
};

export default LoginButton;
