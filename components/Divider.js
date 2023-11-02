import React from "react";
import styled from "styled-components";

const PageDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
`;

const Divider = () => {
  return <PageDivider></PageDivider>;
};

export default Divider;
