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

const FirstStep = ({ data, setdata }) => {
  return (
    <Container>
      <FieldContainer>
        <FieldTitle>First Name</FieldTitle>
        <FieldInput
          placeholder="Enter name"
          value={data.field1}
          onChange={(e) => setdata({ ...data, field1: e.target.value })}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>First Name</FieldTitle>
        <FieldInput
          placeholder="Enter name"
          value={data.field2}
          onChange={(e) => setdata({ ...data, field2: e.target.value })}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>First Name</FieldTitle>
        <FieldInput
          placeholder="Enter name"
          value={data.field3}
          onChange={(e) => setdata({ ...data, field3: e.target.value })}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>First Name</FieldTitle>
        <FieldInput
          placeholder="Enter name"
          value={data.field4}
          onChange={(e) => setdata({ ...data, field4: e.target.value })}
        />
      </FieldContainer>
    </Container>
  );
};

export default FirstStep;
