import { useEffect, useRef } from "react";

function useCloseOutSideClick(handler, isCapturing) {
  const ref = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, isCapturing);
    return () =>
      document.removeEventListener("click", handleClick, isCapturing);
  }, [handler, isCapturing]);

  return { ref };
}

export default useCloseOutSideClick;
