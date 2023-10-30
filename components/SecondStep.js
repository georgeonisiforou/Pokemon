import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const FieldTitle = styled.h3`
  font-size: 1rem;
  color: #fff;
`;

const FieldInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 3px;
  border: none;
  padding: 1rem;
`;

const SecondStep = ({ data, setdata }) => {
  return (
    <Container>
      <FieldContainer>
        <FieldTitle>Last Name</FieldTitle>
        <FieldInput
          placeholder="Enter name"
          value={data.field5}
          onChange={(e) => setdata({ ...data, field5: e.target.value })}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Last Name</FieldTitle>
        <FieldInput
          placeholder="Enter name"
          value={data.field6}
          onChange={(e) => setdata({ ...data, field6: e.target.value })}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Last Name</FieldTitle>
        <FieldInput
          placeholder="Enter name"
          value={data.field7}
          onChange={(e) => setdata({ ...data, field7: e.target.value })}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Last Name</FieldTitle>
        <FieldInput
          placeholder="Enter name"
          value={data.field8}
          onChange={(e) => setdata({ ...data, field8: e.target.value })}
        />
      </FieldContainer>
    </Container>
  );
};

export default SecondStep;
