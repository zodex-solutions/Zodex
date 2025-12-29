import { useEffect, useState, useRef } from "react";

export function useOnScreen(options) {
  const ref = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect(); // Load once, no need to observe again
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
}
