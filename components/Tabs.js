import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Main = styled.div`
  width: 700px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid white;
`;

const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
`;

const Tab = styled.button`
  flex: 1;
  height: 100%;
  background-color: transparent;
  border: none;
  color: black;
  cursor: pointer;
  transition: all 0.5s ease;

  &:nth-child(-n + 2) {
    border-right: 1px solid black;
  }

  &:nth-child(${({ currenttab }) => currenttab + 1}) {
    background-color: black;
    color: white;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  background-color: black;
`;

const Tabs = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const testArray = ["one", "two", "three"];
  return (
    <Container>
      <Main>
        <TabsContainer>
          <Tab currenttab={currentTab} onClick={() => setCurrentTab(0)}>
            first
          </Tab>
          <Tab currenttab={currentTab} onClick={() => setCurrentTab(1)}>
            second
          </Tab>
          <Tab currenttab={currentTab} onClick={() => setCurrentTab(2)}>
            third
          </Tab>
        </TabsContainer>
        <Content>{testArray[currentTab]}</Content>
      </Main>
    </Container>
  );
};

export default Tabs;
