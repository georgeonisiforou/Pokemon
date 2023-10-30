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

const ThirdStep = ({ data, setdata }) => {
  return (
    <Container>
      <FieldContainer>
        <FieldTitle>Fancy Name</FieldTitle>
        <FieldInput
          placeholder="Enter name"
          value={data.field9}
          onChange={(e) => setdata({ ...data, field9: e.target.value })}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Fancy Name</FieldTitle>
        <FieldInput
          placeholder="Enter name"
          value={data.field10}
          onChange={(e) => setdata({ ...data, field10: e.target.value })}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Fancy Name</FieldTitle>
        <FieldInput
          placeholder="Enter name"
          value={data.field11}
          onChange={(e) => setdata({ ...data, field11: e.target.value })}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Fancy Name</FieldTitle>
        <FieldInput
          placeholder="Enter name"
          value={data.field12}
          onChange={(e) => setdata({ ...data, field12: e.target.value })}
        />
      </FieldContainer>
    </Container>
  );
};

export default ThirdStep;
