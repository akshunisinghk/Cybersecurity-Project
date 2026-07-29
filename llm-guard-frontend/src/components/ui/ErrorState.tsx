interface ErrorStateProps {
  message?: string;
}

const ErrorState = ({
  message = "Something went wrong.",
}: ErrorStateProps) => {
  return (
    <div className="rounded-xl border border-red-600 bg-red-950 py-10 text-center">
      <h2 className="text-xl font-bold text-red-400">
        Error
      </h2>

      <p className="mt-2 text-gray-300">
        {message}
      </p>
    </div>
  );
};

export default ErrorState;