import { useState } from "react";

let useChangeDisplayState = (initialState) => {
  let [shouldDisplay, setShouldDisplay] = useState(initialState);
  let changeDisplayState = (...components) => {
    setShouldDisplay((shouldDisplay) => {
      let shouldDisplayCopy = { ...shouldDisplay };
      components.forEach(
        (component) =>
          (shouldDisplayCopy[component] = !shouldDisplay[component])
      );
      return shouldDisplayCopy;
    });
  };
  return [shouldDisplay, changeDisplayState];
};

export default useChangeDisplayState;
