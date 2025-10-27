import { useEffect, useRef, useState } from "react";

/** returns "up" | "down" with a small threshold to avoid flicker */
export function useScrollDirection(threshold = 8) {
  const [dir, setDir] = useState("up");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - lastY.current;
      if (Math.abs(delta) > threshold) {
        setDir(delta > 0 ? "down" : "up");
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return dir;
}
