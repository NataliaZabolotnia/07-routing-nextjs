interface StatusWrapperProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty?: boolean;
  error?: unknown;
  children: React.ReactNode;
}

export default function StatusWrapper({
  isLoading,
  isError,
  isEmpty = false,
  error,
  children,
}: StatusWrapperProps) {
  if (isLoading) {
    return <p>Завантаження...</p>;
  }

  if (isError) {
    return <p>Помилка: {(error as Error).message}</p>;
  }

  if (isEmpty) {
    return <p>Нічого не знайдено.</p>;
  }

  return <>{children}</>;
}
