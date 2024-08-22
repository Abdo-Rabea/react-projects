import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  max-height: calc(100% - 10px);
  overflow: auto;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

/**
 * createPortal: don't do anything to the component tree
 * it moves the element position in the browser dom causing you to render it in any location in the dom you want
 * the behaviour is still the same because modal takes full width but this ensures that the modal styling will not be affected by the parent styling as it make parent flex :(
 * this gives you the same behaviour as the modal library (wow)
 */

//1. create context
const ModalContext = createContext();

//2. create parent
function Modal({ children }) {
  // state updating functions in the parent
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: windowOpenName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(windowOpenName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  //* custom hooks that takes the close function and returns ref
  const { ref } = useOutsideClick(close, true);
  return (
    openName === name &&
    createPortal(
      <Overlay>
        <StyledModal ref={ref}>
          <Button onClick={close}>
            <HiXMark />
          </Button>
          {cloneElement(children, { onCloseModal: close })}
        </StyledModal>
      </Overlay>,
      document.body
    )
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
