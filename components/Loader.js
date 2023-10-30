import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const LoaderContainer = styled.div`
  width: 100px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const spin = keyframes`
from{
    transform: rotateZ(0);
}
to{
    transform: rotateZ(360deg);
}
`;

const reverseSpin = keyframes`
from{
    transform: rotateZ(360deg);
}
to{
    transform: rotateZ(0);
}
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border-top: 3px solid purple;
  border-radius: 50%;
  animation: ${spin} 1s ease infinite;

  position: absolute;
`;

const LightSpinner = styled.div`
  width: 35px;
  height: 35px;
  border-bottom: 3px solid violet;
  border-radius: 50%;
  animation: ${reverseSpin} 1s ease infinite;
  position: absolute;
`;

const InnerSpinner = styled.div`
  width: 20px;
  height: 20px;
  border-bottom: 3px solid pink;
  border-top: 3px solid pink;
  border-radius: 50%;
  animation: ${spin} 2s ease infinite;
  position: absolute;
`;

const Circle = styled.div`
  width: 70px;
  height: 70px;
  border-bottom: 3px solid red;
  border-top: 3px solid red;
  border-radius: 50%;
  animation: ${reverseSpin} 0.8s ease infinite;
  position: absolute;
`;

const Loader = () => {
  return (
    <Container>
      <LoaderContainer>
        <Circle />
        <Spinner />
        <LightSpinner />
        <InnerSpinner />
      </LoaderContainer>
    </Container>
  );
};

export default Loader;
