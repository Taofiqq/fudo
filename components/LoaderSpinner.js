import React from "react";
import styled from "styled-components";

const LoaderSpinner = () => {
  return <Spinner></Spinner>;
};

export default LoaderSpinner;

const Spinner = styled.div`
  width: 30px;
  height: 30px;
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #383636; /* Black */
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
