import styled from "styled-components";

const FormInput = styled.input`
  width: 100%;
  font-size: 24px;
  outline: none;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.color.dark};
  background-color: ${({ theme }) => theme.color.lightBackground};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  /*
    &:focus {
        border-bottom: 3px solid ${({ theme }) => theme.color.dark};
    }
    */
  &:disabled {
    color: #000;
  }
  &::placeholder {
    font-size: 18px;
  }
  @media only screen and (max-width: 870px) {
    font-size: 18px;
    &::placeholder {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 560px) {
    font-size: 14px;
    &::placeholder {
      font-size: 10px;
    }
  }
`;

export default FormInput;
