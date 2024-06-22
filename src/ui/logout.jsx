import React from "react";
import ButtonIcon from "./ButtonIcon";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import useLogout from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";

function Logout() {
  const { logoutHandler, isLoading } = useLogout();
  return (
    <ButtonIcon>
      {isLoading ? (
        <SpinnerMini />
      ) : (
        <HiArrowLeftOnRectangle
          style={{ fontSize: "25px" }}
          onClick={() => logoutHandler()}
        />
      )}
    </ButtonIcon>
  );
}

export default Logout;
