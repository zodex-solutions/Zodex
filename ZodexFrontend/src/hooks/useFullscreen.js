import { useState, useEffect } from "react";

export const useFullscreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .catch((err) => console.error("Failed to enter fullscreen:", err));
    } else {
      document
        .exitFullscreen()
        .catch((err) => console.error("Failed to exit fullscreen:", err));
    }
  };

  return { isFullScreen, toggleFullScreen };
};
