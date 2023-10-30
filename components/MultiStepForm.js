import React, { useState } from "react";
import styled from "styled-components";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 3rem;
`;

const FormContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StepsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 0.25rem;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 33%;
  opacity: 0.3;
  transition: all 0.5s ease;

  &:nth-child(${({ active }) => `-n + ${active}`}) {
    opacity: 1;
  }
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
`;

const StepLine = styled.div`
  width: 100%;
  height: 15px;
  background-color: #fff;
  border-radius: 3px;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const NextBtn = styled.button`
  width: 100px;
  height: 50px;
  cursor: pointer;
  background-color: blue;
  border-radius: 8px;
  outline: none;
  border: none;
  transition: all 0.3s ease;

  &:active {
    background-color: rgb(56, 20, 210);
  }
`;

const MultiStepForm = () => {
  const [isActive, setIsActive] = useState(1);
  const [formDetails, setFormDetails] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    field7: "",
    field8: "",
    field9: "",
    field10: "",
    field11: "",
    field12: "",
  });
  const stepsArray = [
    <FirstStep key={0} data={formDetails} setdata={setFormDetails} />,
    <SecondStep key={1} data={formDetails} setdata={setFormDetails} />,
    <ThirdStep key={2} data={formDetails} setdata={setFormDetails} />,
  ];

  const goToNextStep = () => {
    if (isActive < 3) {
      setIsActive(isActive + 1);
    }
  };

  const goToPreviousStep = () => {
    if (isActive > 1) {
      setIsActive(isActive - 1);
    }
  };

  return (
    <Container>
      <FormContainer>
        <StepsContainer>
          <Step active={isActive}>
            <StepTitle>Step 1</StepTitle>
            <StepLine />
          </Step>
          <Step active={isActive}>
            <StepTitle>Step 2</StepTitle>
            <StepLine />
          </Step>
          <Step active={isActive}>
            <StepTitle>Step 3</StepTitle>
            <StepLine />
          </Step>
        </StepsContainer>
        {stepsArray[isActive - 1]}
        <BtnContainer>
          <NextBtn onClick={goToPreviousStep}>BACK</NextBtn>
          <NextBtn onClick={goToNextStep}>NEXT</NextBtn>
        </BtnContainer>
      </FormContainer>
    </Container>
  );
};

export default MultiStepForm;
