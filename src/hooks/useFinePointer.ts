import { useEffect, useState } from "react";

/**
 * True on devices with an accurate pointing device (mouse/trackpad).
 * Used to gate cursor-following and magnetic effects, which don't
 * make sense — and can actively hurt usability — on touch.
 */
export function useFinePointer(): boolean {
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setIsFinePointer(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isFinePointer;
}
