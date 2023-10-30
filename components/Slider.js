import React, { useState } from "react";
import styled from "styled-components";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

const BigContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  height: 200px;
  padding: 0.5rem;
  color: white;
  margin-top: 2rem;
  overflow-x: hidden;
  margin: 2rem;
`;

const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  transform: ${({ step, $pagenum, $itemsperview }) =>
    `translateX(calc(${step}% + ${
      step != 0
        ? Math.sign(step) === -1
          ? `-${($pagenum - 1) * $itemsperview * 0.5}rem`
          : `${$itemsperview * 0.5}rem`
        : 0
    }))`};
  transition: all 1s ease;
`;

const BtnLeft = styled.button`
  width: 80px;
  height: calc(100% - 1rem);
  position: absolute;
  left: 0;
  top: 0.5rem;
  font-size: 2rem;
  opacity: 0.2;
  cursor: pointer;
  z-index: 5;

  &:hover {
    opacity: 0.4;
  }
`;

const BtnRight = styled.button`
  width: 80px;
  height: calc(100% - 1rem);
  position: absolute;
  right: 0;
  top: 0.5rem;
  font-size: 2rem;
  opacity: 0.2;
  cursor: pointer;
  z-index: 5;

  &:hover {
    opacity: 0.4;
  }
`;

const SliderItem = styled.div`
  min-width: 20%;
  max-width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  height: 100%;
  border-radius: 3px;
  background-color: purple;
  cursor: pointer;
  transition: all 0.5s ease;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 3px;
  padding: 1rem;
`;

const Dot = styled.div`
  width: 30px;
  height: 5px;
  border-radius: 2px;
  background-color: white;
  opacity: 0.2;
  transition: all 0.5s ease;

  &:nth-child(${({ $currentpage }) => $currentpage}) {
    opacity: 1;
  }
`;

const Slider = () => {
  let itemsArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  ];
  const itemsPerView = 5;
  const numOfPages = itemsArray.length / itemsPerView;
  const pagesArray = [];
  for (let i = 1; i <= numOfPages; i++) {
    pagesArray[i] = i;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [step, setStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrev = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
      setStep(step + 100);
    } else {
      setCurrentPage(numOfPages);
      setStep(-(numOfPages - 1) * 100);
    }
  };

  const handleNext = () => {
    if (currentPage <= numOfPages - 1) {
      setCurrentPage(currentPage + 1);
      setStep(step - 100);
    } else {
      setCurrentPage(1);
      setStep(0);
    }
  };

  return (
    <BigContainer>
      <Container>
        <BtnLeft
          onClick={handlePrev}
          onMouseOver={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          {isHovered && <BsChevronLeft />}
        </BtnLeft>
        <BtnRight
          onClick={handleNext}
          onMouseOver={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          {isHovered && <BsChevronRight />}
        </BtnRight>
        <ItemsContainer
          step={step}
          $pagenum={currentPage}
          $itemsperview={itemsPerView}
        >
          {itemsArray.map((item, idx) => {
            return (
              <SliderItem
                as={motion.div}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, delay: 1 },
                }}
                key={idx}
              >
                {item}
              </SliderItem>
            );
          })}
        </ItemsContainer>
      </Container>
      <AnimatePresence>
        {isHovered && (
          <DotsContainer
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {pagesArray.map((item, idx) => {
              return <Dot key={idx} $currentpage={currentPage}></Dot>;
            })}
          </DotsContainer>
        )}
      </AnimatePresence>
    </BigContainer>
  );
};

export default Slider;
