import { useEffect, MutableRefObject } from "react";

const useOutsideClick = (
  ref: MutableRefObject<any>,
  handler: () => void,
  exceptionRef?: MutableRefObject<any>
): void => {
  useEffect(() => {
    const listener = (event: any): void => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        exceptionRef?.current.contains(event.target)
      ) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, exceptionRef, handler]);
};

export default useOutsideClick;