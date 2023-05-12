import { useEffect, useState } from "react";

export const useOnClickOutside = (ref: any, handler: () => void) => {
  const [isEventAdded, setIsEventAdded] = useState(false);
  useEffect(() => {
    if (!isEventAdded) {
      setIsEventAdded(true);
      document.addEventListener("click", (evt) => {
        if (ref?.current?.contains && ref?.current?.contains(evt.target))
          return;
        handler();
      });
    }
  }, [ref, handler, isEventAdded]);
};
