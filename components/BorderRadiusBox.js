import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
`;

const Box = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 24px;
  padding: 8px;
  border: ${({ $bordercolor }) => `2px solid ${$bordercolor}`};
  box-shadow: ${({ $bordercolor }) => `0px 0px 8px 1px ${$bordercolor}`};
  transition: all 1s ease;
`;

const InnerBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  border: ${({ $bordercolor }) => `2px solid ${$bordercolor}`};
  box-shadow: ${({ $bordercolor }) => `0px 0px 8px 1px ${$bordercolor}`};
  padding: 8px;
  transition: all 1s ease;
`;

const InnerInnerBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: ${({ $bordercolor }) => `2px solid ${$bordercolor}`};
  box-shadow: ${({ $bordercolor }) => `0px 0px 8px 1px ${$bordercolor}`};
  padding: 8px;
  transition: all 1s ease;
`;

const InnerInnerInnerBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0px;
  border: ${({ $bordercolor }) => `2px solid ${$bordercolor}`};
  box-shadow: ${({ $bordercolor }) => `0px 0px 8px 1px ${$bordercolor}`};
  transition: all 1s ease;
`;

const GenerateBtn = styled.button`
  width: 100px;
  height: 60px;
  border: ${({ $bordercolor }) => `2px solid ${$bordercolor}`};
  cursor: pointer;
  border-radius: 8px;
  background-color: transparent;
`;

const BorderRadiusBox = () => {
  const [innerColor, setInnerColor] = useState({
    inner: "",
    inner1: "",
    inner2: "",
    inner3: "",
  });

  const generateRandomColor = () => {
    let randomRed = Math.trunc(Math.random() * 255);
    let randomGreen = Math.trunc(Math.random() * 255);
    let randomBlue = Math.trunc(Math.random() * 255);

    return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
  };

  return (
    <Container>
      <Box $bordercolor={innerColor.inner}>
        <InnerBox $bordercolor={innerColor.inner1}>
          <InnerInnerBox $bordercolor={innerColor.inner2}>
            <InnerInnerInnerBox $bordercolor={innerColor.inner3} />
          </InnerInnerBox>
        </InnerBox>
      </Box>
      <GenerateBtn
        className="interactable"
        $bordercolor={innerColor.inner}
        onClick={() => {
          setInnerColor({
            inner: generateRandomColor(),
            inner1: generateRandomColor(),
            inner2: generateRandomColor(),
            inner3: generateRandomColor(),
          });
        }}
      >
        Generate
      </GenerateBtn>
    </Container>
  );
};

export default BorderRadiusBox;
