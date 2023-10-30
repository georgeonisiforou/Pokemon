import React, { useRef, useState } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 2rem;
`;

const GaugeContainer = styled.div`
  width: 300px;
  height: 300px;
  border: ${({ $percent }) =>
    `10px solid ${
      $percent >= 70 ? "#03C04A" : $percent >= 40 ? "#FFF700" : "#C80815"
    }`};
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: ${({ $percent }) =>
    `${$percent === 100 ? `0px 0px 35px 10px #03C04A` : null}`};
`;

const PercentNumber = styled.h3`
  /* color: ${({ $percent }) =>
    $percent >= 40 && $percent <= 70 ? "#000" : "#fafafa"}; */
  color: hsl(0, 0%, 100%);
  font-size: 7rem;
  z-index: 5;
  mix-blend-mode: ${({ $percent }) =>
    $percent >= 70 ? "normal" : "difference"};
`;

const InnerGauge = styled.div`
  width: 100%;
  height: ${({ $percent }) => `${$percent}%`};
  position: absolute;
  bottom: 0;
  background-color: ${({ $percent }) =>
    `${
      $percent >= 70
        ? "#03C04A"
        : $percent >= 40
        ? "hsl(58, 100%, 50%)"
        : "#C80815"
    }`};
  transition: all 0.3s ease;
`;

const SliderContainer = styled.div`
  width: 600px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderLine = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 3px;
  background-color: #fbfbf9;
  position: relative;
  box-shadow: inset 0px 0px 5px 1px #c5c6d0;
`;

const SliderLineColor = styled.div`
  width: ${({ $percent }) => `${$percent}%`};
  height: 10px;
  border-radius: 3px;
  background-color: #1338be;
  position: absolute;
  left: 0;
`;

const Slider = styled.div`
  width: 15px;
  height: 40px;
  background-color: lightgray;
  position: absolute;
  left: 0px;
  top: -15px;
  z-index: 5;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid black;
`;

const SVGContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
`;

const SVGText = styled.div`
  position: absolute;
  z-index: 5;
  font-size: 3rem;
`;

const GaugesContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Gauge = () => {
  const sliderRef = useRef();

  const fullWidth = 585;

  const [percent, setPercent] = useState(0);

  const [strokeOffset, setStrokeOffset] = useState(0);
  const [greyOffset, setGreyOffset] = useState(0);
  const [greenOffset, setGreenOffset] = useState(502);

  const findPercentage = (position) => {
    let result = Math.round((position * 100) / fullWidth);
    setPercent(result);
    return result;
  };

  const findStrokeOffset = (position) => {
    let result = (position * 502) / 100;
    setStrokeOffset(result);
  };

  return (
    <Container>
      <GaugesContainer>
        <GaugeContainer $percent={percent}>
          <PercentNumber $percent={percent}>{percent}</PercentNumber>
          <InnerGauge $percent={percent}></InnerGauge>
        </GaugeContainer>
        <SVGContainer>
          <SVGText>{percent}</SVGText>
          <svg
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "relative",
            }}
          >
            <circle
              style={{
                transform: "rotateZ(270deg)",
                transformOrigin: "center",
                opacity: percent >= 88 ? 0 : 1,
                transition: "opacity 1s ease",
              }}
              cx="100"
              cy="100"
              r="80"
              strokeWidth={25}
              stroke="rgba(194,197,204, 0.15)"
              strokeDashoffset={greyOffset}
              strokeDasharray={502}
              strokeLinecap="round"
              fill="transparent"
            />

            <circle
              style={{
                position: "absolute",
                transform: "rotateZ(290deg)",
                transformOrigin: "center",
                opacity: percent <= 1 ? 0 : 1,
                transition: "stroke 1s ease, opacity 1s ease",
              }}
              cx="100"
              cy="100"
              r="80"
              strokeWidth={25}
              stroke={
                percent >= 70
                  ? "#03C04A"
                  : percent >= 40
                  ? "#FFF700"
                  : "#C80815"
              }
              strokeDashoffset={greenOffset}
              strokeDasharray={502}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
        </SVGContainer>
      </GaugesContainer>

      <div>{`Progress (${percent}%)`}</div>
      <SliderContainer>
        <SliderLine $percent={percent}>
          <SliderLineColor $percent={percent} />
          <Draggable
            ref={sliderRef}
            axis="x"
            bounds={{ left: 0, top: 0, right: 585, bottom: 0 }}
            onDrag={() => {
              findPercentage(sliderRef.current.state.x);
              findStrokeOffset(percent);
              setGreyOffset(percent === 0 ? 0 : -56 - strokeOffset);
              setGreenOffset(502 - strokeOffset);
            }}
          >
            <Slider />
          </Draggable>
        </SliderLine>
      </SliderContainer>
    </Container>
  );
};

export default Gauge;
