import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  align-items: center;
  padding: 2rem;
`;

const ripple = keyframes`
  from{
width: 0px;
height: 0px;
opacity: 0.5;
  }
  to{
  width: 300px;
  height: 300px;
  opacity: 0;
  }
  `;

const NiceBtn = styled.button`
  width: 250px;
  height: 80px;
  opacity: 0.9;
  cursor: pointer;
  border-radius: 20px;
  font-size: 1.5rem;
  border: none;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const RippleBubble = styled.div`
  position: absolute;
  background-color: white;
  transform: translate(-50%, -50%);
  left: ${({ positionleft }) => `${positionleft}px`};
  top: ${({ positiontop }) => `${positiontop}px`};
  border-radius: 50%;
  animation: ${ripple} 750ms ease infinite;
`;

const ActionsContainer = styled.div`
  background-color: lightgray;
  border-radius: 15px;
`;

const AnotherBtn = styled.button`
  width: 200px;
  height: 60px;
  background-color: blue;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 3;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    border-radius: 50px;
    background-color: blue;
    width: 100%;
    height: 100%;
    scale: ${({ ishovered }) => (ishovered ? "1.5" : "1")};
    opacity: ${({ ishovered }) => (ishovered ? 0 : 1)};
    transition: all 0.7s ease;
  }
`;

const MyInput = styled.div`
  width: 350px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  border: none;
  outline: none;
  color: white;
  position: relative;
  padding: 16px 16px 0 16px;
  cursor: text;

  &::after {
    position: absolute;
    content: "Email";
    left: 16px;
    top: 16px;
    top: ${({ isclicked }) => (isclicked ? "0px" : "12px")};
    width: ${({ isclicked }) => (isclicked ? "30px" : "50px")};
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: ${({ isclicked }) => (isclicked ? "0.8rem" : " 1rem")};
    transition: all 0.3s ease;
  }
`;

const InnerInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  caret-color: ${({ isclicked }) => (isclicked ? "white" : "transparent")};
`;

const ActionsModal = () => {
  const [position, setPosition] = useState({ x: "", y: "", isVisible: false });
  const [openModal, setOpenModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const positionRef = useRef(null);
  const bubbleRef = useRef(null);

  return (
    <Container>
      <MyInput onClick={() => setIsClicked(true)} isclicked={isClicked}>
        <InnerInput
          isclicked={isClicked}
          onChange={(e) => e.target.value === "" && setIsClicked(false)}
        />
      </MyInput>
      <AnotherBtn
        ishovered={isHovered}
        as={motion.div}
        className="interactable"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          y: -5,
          opacity: 0.8,
        }}
      >
        Press me
      </AnotherBtn>
      <NiceBtn
        className="interactable"
        ref={positionRef}
        onClick={(e) => {
          const pos = positionRef.current.getBoundingClientRect();
          setPosition({
            x: e.clientX - pos.left,
            y: e.clientY - pos.top,
            isVisible: true,
          });

          setTimeout(() => {
            setPosition({ x: "", y: "", isVisible: false });
          }, 700);
          setOpenModal(!openModal);
        }}
      >
        {position.isVisible && (
          <RippleBubble
            positionleft={position.x}
            positiontop={position.y}
            ref={bubbleRef}
          />
        )}
        Actions
      </NiceBtn>

      <AnimatePresence>
        {openModal && (
          <ActionsContainer
            as={motion.div}
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: 350,
              height: 500,
              opacity: 1,
              transition: { type: "tween" },
            }}
            transition={{ duration: 0.3 }}
            exit={{ width: 0, height: 0, opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ActionsModal;
