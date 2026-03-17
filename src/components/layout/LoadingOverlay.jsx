// src/layout/LoadingOverlay.jsx
import React from "react";
import Lottie from "lottie-react";
import dogLoading from "../../assets/animations/dog-walking.json";

export default function LoadingOverlay({
  isLoading,
  message = "Walking your way...",
}) {
  if (!isLoading) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999] flex flex-col items-center justify-center
        bg-cream/95 backdrop-blur-sm transition-opacity duration-400
      "
      role="status"
      aria-live="assertive"
    >
      <div className="w-72 h-72 sm:w-80 sm:h-80">
        <Lottie
          animationData={dogLoading}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      </div>

      <p className="mt-6 text-lg font-medium text-gray-700 text-center px-6">
        {message}
      </p>
    </div>
  );
}
