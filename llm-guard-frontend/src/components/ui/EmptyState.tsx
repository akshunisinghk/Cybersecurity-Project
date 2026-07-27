interface EmptyStateProps {
  message: string;
}

const EmptyState = ({
  message,
}: EmptyStateProps) => {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-900 py-10 text-center text-gray-400">
      {message}
    </div>
  );
};

export default EmptyState;