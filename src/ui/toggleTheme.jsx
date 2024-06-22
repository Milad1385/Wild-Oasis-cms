import React from "react";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { useDarkMode } from "../context/darkModeContext";

function ToggleTheme() {
  const { isDark, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon>
      {isDark ? (
        <HiOutlineSun onClick={toggleDarkMode} />
      ) : (
        <HiOutlineMoon onClick={toggleDarkMode} />
      )}
    </ButtonIcon>
  );
}

export default ToggleTheme;
