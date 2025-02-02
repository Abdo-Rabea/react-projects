import { createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  position: relative;
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
  width: max-content;
  position: absolute;
  z-index: 100;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: -7px;
  top: 40px;
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

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  //! no need to position now
  const [position, setPosition] = useState(null);
  const open = (id) => setOpenId(id);
  const close = () => setOpenId("");

  const updatePosition = (x, y) => setPosition({ x, y });
  return (
    <MenusContext.Provider
      value={{ open, close, openId, position, updatePosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const toggleElement = useRef();
  const { open, close, openId, updatePosition } = useContext(MenusContext);
  function handleToggle(e) {
    e.stopPropagation();
    // the closest parent button (or the elemnt if it is button)
    // const rect = e.target.closest("button").getBoundingClientRect();
    //* my logic is better than john
    if (openId === id) close();
    else {
      // updatePosition(
      //   window.innerWidth - rect.x - rect.width,
      //   rect.y + rect.height + 8
      // );
      open(id);
    }
  }
  return (
    <StyledToggle onClick={handleToggle} ref={toggleElement}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const { ref } = useOutsideClick(close, false);
  return (
    openId === id && (
      <StyledList ref={ref} position={position}>
        {children}
      </StyledList>
    )
  );
}

function Button({ icon, children, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
