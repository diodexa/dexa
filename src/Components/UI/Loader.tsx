interface LoaderProps {
  isLoading: boolean;
}

export const Loading = ({ isLoading }: LoaderProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <img
        src="/logo-dio.webp"
        alt="Logo"
        className="w-[150px] animate-spin"
      />

      <p>Memuat undangan...</p>
    </div>
  );
};