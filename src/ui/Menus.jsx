import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import useCloseOutSideClick from "../hooks/useCloseOutSideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  z-index: 50;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

function Menus({ children }) {
  const [name, setName] = useState("");
  const [position, setPostion] = useState({});
  const close = () => setName("");
  const open = setName;

  return (
    <MenuContext.Provider value={{ open, close, name, position, setPostion }}>
      {children}
    </MenuContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id }) {
  const { close, open, name, setPostion } = useContext(MenuContext);
  const toggleHandler = (e) => {
    name === "" ? open(id) : close();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPostion({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
  };
  return (
    <StyledToggle onClick={toggleHandler}>
      <HiOutlineEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, id }) {
  const { close, name, position } = useContext(MenuContext);
  const { ref } = useCloseOutSideClick(close, true);
  if (name !== id) return null;
  return (
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>
  );
}

function Button({ children, icon, onClick }) {
  return (
    <li>
      <StyledButton onClick={() => onClick?.()}>
        {icon}
        {children}
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
