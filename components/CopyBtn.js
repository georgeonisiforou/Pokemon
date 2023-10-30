import {
  AnimatePresence,
  motion,
  optimizedAppearDataAttribute,
} from "framer-motion";
import React, { useState } from "react";
import { MdOutlineContentCopy, MdDone } from "react-icons/md";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const TextareaContainer = styled.div`
  width: 700px;
  height: 150px;
  padding: 1rem;
  position: relative;
  background-color: rgb(40, 42, 54);
  border-radius: 5px;
`;

const Copy = styled(MdOutlineContentCopy)`
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.5);
`;

const Done = styled(MdDone)`
  width: 20px;
  height: 20px;
  color: green;
`;

const CopyContainer = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  background-color: transparent;
  transition: all 0.5s ease;

  &:hover {
    border: 1px solid white;

    & > ${Copy} {
      color: white;
    }
  }
`;

const CopyBtn = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <Container>
      <TextareaContainer>
        <CopyContainer onClick={() => setClicked(true)}>
          <AnimatePresence>
            {clicked ? (
              <div
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Done />
              </div>
            ) : (
              <div
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Copy />
              </div>
            )}
          </AnimatePresence>
        </CopyContainer>
      </TextareaContainer>
    </Container>
  );
};

export default CopyBtn;
