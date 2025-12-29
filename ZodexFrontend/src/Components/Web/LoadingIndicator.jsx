export default function LoadingIndicator() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        {/* Text */}
        <h2 className="text-white text-lg font-semibold">Loading...</h2>
      </div>
    </div>
  );
}
