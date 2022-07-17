import React from "react";
import styled from "styled-components";

const LoaderSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner></Spinner>
    </SpinnerContainer>
  );
};

export default LoaderSpinner;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Spinner = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 1px solid #1b2430; /* Black */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: spinner 1.5s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
