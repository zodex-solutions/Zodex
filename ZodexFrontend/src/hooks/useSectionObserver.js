import { useEffect, useState } from "react";

const useSectionObserver = (ids) => {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    let rafId = null;

    const observer = new IntersectionObserver(
      (entries) => {
        rafId = window.requestAnimationFrame(() => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible.length > 0) {
            setActiveId(visible[0].target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px", // Triggers when top half is visible
        threshold: Array.from({ length: 21 }, (_, i) => i / 20), // 0 → 1 in 0.05 steps
      }
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    elements.forEach((el) => observer.observe(el));

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [ids]);

  return activeId;
};

export default useSectionObserver;
