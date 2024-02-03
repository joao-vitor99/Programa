import { useState } from "react";
import { SCREEN_MODE } from "../constants";

function useScreen() {
  const [screenMode, setScreenMode] = useState(SCREEN_MODE.VIEW);

  return {
    screenMode: {
      screenMode,
      setScreenMode,
    },
  };
}

export default useScreen;
