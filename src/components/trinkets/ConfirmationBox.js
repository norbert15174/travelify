import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toggleBlur } from "../../redux/blurSlice";

const ConfirmationBox = ({
  children,
  confirmation = "Tak",
  refusal = "Nie",
  confirm,
  refuse,
}) => {
  const ref = useRef(null);

  const dispatch = useDispatch();
  const blurState = useSelector((state) => state.blur.value);

  useEffect(() => {
    document.addEventListener("click", handler, true);
    document.body.style.overflow = "hidden";
    if (!blurState) {
      dispatch(toggleBlur());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handler(e) {
    if (!ref.current || ref.current.contains(e.target)) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <Container>
      <Box ref={ref}>
        <Text>
          <p>{children}</p>
        </Text>
        <Buttons>
          <ConfirmButton
            className="modal"
            onClick={() => {
              confirm(true);
              document.removeEventListener("click", handler, true);
              document.body.style.overflow = "";
              dispatch(toggleBlur());
            }}
          >
            {confirmation}
          </ConfirmButton>
          <DeclineButton
            className="modal"
            onClick={() => {
              refuse(true);
              document.removeEventListener("click", handler, true);
              document.body.style.overflow = "";
              dispatch(toggleBlur());
            }}
          >
            {refusal}
          </DeclineButton>
        </Buttons>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100% - 120px); // 120px - menu bar
  z-index: 10000;
  @media only screen and (max-width: 720px) {
    width: 100%; // menu bar ignored
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 46.8%;
  transform: translate(-50%, -50%);
  z-index: 10000;

  background-color: ${({ theme }) => theme.color.lightBackground};
  width: 25%;
  height: 25%;
  border: 2px solid ${({ theme }) => theme.color.dark};
  padding: 50px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 0 ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 720px) {
    width: 35%;
    height: 20%;
    left: 50%;
  }
  @media only screen and (max-width: 560px) {
    width: 50%;
    height: 25%;
    padding: 20px;
  }
  @media only screen and (max-width: 400px) {
    padding: 10px;
    min-width: 264px;
    width: 264px;
    height: 155px;
    min-height: 155px;
  }
`;

const Text = styled.div`
  color: #000;
  font-size: 24px;
  text-align: center;
  @media only screen and (max-width: 400px) {
    font-size: 16px;
  }
`;

const Buttons = styled.div`
  margin-top: 75px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media only screen and (max-width: 560px) {
    margin-top: 35px;
  }
`;

const ConfirmButton = styled.button`
  width: 100px;
  height: 50px;
  margin-right: 15px;
  background-color: ${({ theme }) => theme.color.dark};
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.color.lightBackground};
  border-radius: 50px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  @media only screen and (max-width: 400px) {
    width: 75px;
    height: 40px;
    font-size: 16px;
  }
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.light};
  }
`;

const DeclineButton = styled.button`
  width: 100px;
  height: 50px;
  margin-left: 15px;
  background-color: ${({ theme }) => theme.color.dark};
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.color.lightBackground};
  border-radius: 50px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  @media only screen and (max-width: 400px) {
    width: 75px;
    height: 40px;
    font-size: 16px;
  }
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.light};
  }
`;

export default ConfirmationBox;
