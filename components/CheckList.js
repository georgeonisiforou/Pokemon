import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { motion, stagger, useAnimate } from "framer-motion";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const CheckListContainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 5px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  color: black;
  font-weight: 600;
  font-size: 1.25rem;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Item = styled.button`
  height: 40px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ checked }) => (checked ? "lightgrey" : "black")};
  background-color: transparent;
  cursor: pointer;
  border: none;
  position: relative;
  text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
  transition: text-decoration 0.5s ease, color 0.5s ease,
    background-color 0.5s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &::after {
    position: absolute;
    content: "";
    height: 1px;
    width: 90%;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Tick = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ checked }) => (checked ? "#0077B6" : "transparent")};
`;

const CheckList = () => {
  const [list, setList] = useState([
    { id: "1", text: "Drink water", checked: true },
    { id: "2", text: "Breathe", checked: false },
    { id: "3", text: "Watch movie", checked: true },
    { id: "4", text: "Restaurant at 8", checked: false },
    { id: "5", text: "Call the doctor", checked: true },
    { id: "6", text: "Buy groceries", checked: true },
  ]);

  let [scope, animate] = useAnimate();

  const handleChange = (id) => {
    let newItems = list.map((item) => ({
      ...item,
      checked: item.id === id ? !item.checked : item.checked,
    }));
    setList(newItems);

    if (newItems.every((item) => item.checked)) {
      let lastCompletedItem = list.findIndex((item) => !item.checked);

      let random = Math.random();

      if (random < 1 / 3) {
        animate(
          "div",
          { scale: [1, 1.15, 1] },
          { duration: 0.35, delay: stagger(0.075, { from: lastCompletedItem }) }
        );
      } else if (random < 2 / 3) {
        //shake
        animate(
          "div",
          { x: [0, 3, -3, 0] },
          { duration: 0.35, delay: stagger(0.075, { from: lastCompletedItem }) }
        );
      } else {
        //rotate
        animate(
          "div",
          { rotate: [0, 10, -10, 0] },
          { duration: 0.4, delay: stagger(0.1, { from: lastCompletedItem }) }
        );
      }
    }
  };

  return (
    <Container>
      <CheckListContainer>
        <Title>
          <AiOutlineUnorderedList /> Checklist
        </Title>
        <ItemsList as={motion.div} ref={scope}>
          {list.map((item, idx) => (
            <Item
              key={idx}
              onClick={() => handleChange(item.id)}
              checked={item.checked}
            >
              <Tick checked={item.checked}>
                {item.checked === true && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="#fff"
                    fill="none"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </Tick>
              {item.text}
            </Item>
          ))}
        </ItemsList>
      </CheckListContainer>
    </Container>
  );
};

export default CheckList;
