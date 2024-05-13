import { useState } from "react";

export default function useDebounce() {
  const [to, setTo] = useState<NodeJS.Timeout | null>(null);

  function debounce(fn: () => void, delay = 200) {
    if (to !== null) {
      clearTimeout(to);
    }

    setTo(
      setTimeout(() => {
        fn();
        setTo(null);
      }, delay)
    );
  }

  return debounce;
}
