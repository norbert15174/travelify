import { useEffect } from "react";

// hook for detecting click outside pop up screen and disabling it

export const useDetectOutsideClick = (ref, handler=null) => {

    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      if (handler !== null) {
        handler(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
      };
    });
  };
  