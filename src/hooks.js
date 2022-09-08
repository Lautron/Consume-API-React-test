import { useState } from "react";

let useChangeDisplayState = (initialState) => {
  let [shouldDisplay, setShouldDisplay] = useState(initialState);
  let changeDisplayState = (...components) => {
    setShouldDisplay((shouldDisplay) => {
      components.forEach(
        (component) => (shouldDisplay[component] = !shouldDisplay[component])
      );
    });
  };
  return [shouldDisplay, changeDisplayState];
};

export default useChangeDisplayState;
