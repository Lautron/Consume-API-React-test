import { useState } from "react";

let useChangeDisplayState = (initialState) => {
  let [shouldDisplay, setShouldDisplay] = useState();
  let changeDisplayState = (...components) => {
    let shouldDisplayCopy = { ...shouldDisplay };
    components.map((component, index) => {
      shouldDisplayCopy[component] = !shouldDisplayCopy[component];
      return "";
    });
    setShouldDisplay(shouldDisplayCopy);
  };
  return changeDisplayState;
};

export default useChangeDisplayState;
