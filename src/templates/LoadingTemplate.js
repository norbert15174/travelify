import React from "react";
import styled, { keyframes } from "styled-components";
import refreshIcon from "../assets/refreshIcon.svg";

export const Loading = () => (
  <LoadingContainer>
    <LoadingSpinner active={true} />
    <Messages>
      <h1>Ładowanie ...</h1>
    </Messages>
  </LoadingContainer>
);

export const ErrorAtLoading = () => (
  <LoadingContainer>
    <LoadingSpinner active={false} />
    <Messages>
      <h1>Coś poszło nie tak ...</h1>
      <InnerContainer>
        <h2>Odśwież stronę</h2>
        <Refresh onClick={() => window.location.reload(false)} />
      </InnerContainer>
    </Messages>
  </LoadingContainer>
);

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2.5px;
`;

const LoadingContainer = styled.div`
  background-color: ${({ theme }) => theme.color.darkBackground};
  border-radius: 50px;
  width: auto;
  height: auto;
  margin: 45vh auto 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 30px;
  @media only screen and (max-width: 720px) {
    padding: 10px 20px;
  }
`;

const Refresh = styled.div`
  margin-left: 10px;
  width: 25px;
  height: 25px;
  background-image: url(${() => refreshIcon});
  background-size: 25px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  cursor: pointer;
  @media only screen and (max-width: 720px) {
    width: 20px;
    height: 20px;
    background-size: 20px;
  }
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: #000;
  }
  h2 {
    margin-top: 0px;
    color: ${({ theme }) => theme.color.greyFont};
  }
  @media only screen and (max-width: 720px) {
    h1 {
      font-size: 15px;
    }
    h2 {
      font-size: 10px;
    }
  }
`;

const rotate = keyframes`
    from {
        transform :rotate(0deg);
    }
    to {
        transform :rotate(360deg);
    }
`;

const LoadingSpinner = styled.div`
  max-width: 30px;
  width: 30px;
  height: 30px;
  margin-right: 15px;
  border: 12px solid ${({ theme }) => theme.color.light};
  border-top: 12px solid ${({ theme }) => theme.color.dark};
  border-radius: 50%;
  animation-name: ${({ active }) => (active ? rotate : "none")};
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-delay: 0.5s;
  animation-play-state: running;
  animation-iteration-count: infinite;
  @media only screen and (max-width: 720px) {
    max-width: 20px;
    width: 20px;
    height: 20px;
    border: 8px solid ${({ theme }) => theme.color.light};
    border-top: 8px solid ${({ theme }) => theme.color.dark};
  }
`;
