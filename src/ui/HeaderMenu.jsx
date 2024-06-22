import React from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "./logout";
import UserAvatar from "../features/authentication/UserAvatar";
import { useNavigate } from "react-router-dom";
import ToggleTheme from "./toggleTheme";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <UserAvatar />
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
      <li>
        <ToggleTheme />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
