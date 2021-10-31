import React from "react";
import styled from "styled-components";

const Toggle = ({ value, setValue, first, second }) => {
  return (
    <CheckBoxWrapper>
      <CheckBox
        id="checkbox"
        type="checkbox"
        value={value}
        onChange={() => {
          if (value === first) setValue(second);
          else if (value === second) setValue(first);
        }}
      />
      <CheckBoxLabel htmlFor="checkbox" />
    </CheckBoxWrapper>
  );
};

const CheckBoxWrapper = styled.div`
  position: relative;
  margin: auto 0;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 30px;
  border-radius: 15px;
  background: ${({ theme }) => theme.color.darkBackground};
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    margin: 4px;
    background: ${({ theme }) => theme.color.dark};
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.1s;
  }
  @media only screen and (max-width: 1000px) {
    width: 60px;
    height: 20px;
    &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    margin: 3px;
    background: ${({ theme }) => theme.color.dark};
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.1s;
  }
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 80px;
  height: 30px;
  &:checked + ${CheckBoxLabel} {
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 22px;
      height: 22px;
      margin-left: 55px;
      transition: 0.1s;
    }
  }
  @media only screen and (max-width: 1000px) {
    width: 60px;
    height: 20px;
    &:checked + ${CheckBoxLabel} {
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      margin-left: 43px;
      transition: 0.1s;
    }
  }
  }
`;

export default Toggle;
