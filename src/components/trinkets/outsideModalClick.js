import { useEffect } from "react";

// hook for detecting click outside pop up screen and closing it

export const useDetectOutsideClick = (ref, handler) => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(false);
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", listener);
  
      return () => {
        document.removeEventListener("mousedown", listener);
      };
    });
  };
  