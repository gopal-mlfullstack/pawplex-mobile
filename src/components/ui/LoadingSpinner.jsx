// src/ui/LoadingSpinner.jsx
import React from "react";
import Lottie from "lottie-react";
import dogLoading from "../../assets/animations/dog-walking.json";
export default function LoadingSpinner({
  fullScreen = true,
  size = 180, // width & height in px
  message = "Walking to fetch your pet's data...",
}) {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm"
    : "flex flex-col items-center justify-center p-6";

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div style={{ width: size, height: size }}>
        <Lottie
          animationData={dogLoading}
          loop
          autoplay
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      </div>

      {message && (
        <p className="mt-5 text-gray-600 font-medium text-center px-4">
          {message}
        </p>
      )}
    </div>
  );
}
