import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme, bgColor }) => bgColor || theme.color.dark};
  width: ${({ width }) => width || "200px"};
  height: ${({ height }) => height || "45px"};
  padding: 0px;
  border: none;
  border-radius: ${({ borderRadius }) => borderRadius || "30px"};
  font-weight: ${({ fontWeight, theme }) =>
    fontWeight || theme.fontWeight.bold};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  font-family: "Cuprum";
  color: ${({ fontColor, theme }) => fontColor || theme.color.lightBackground};
  cursor: pointer;
  text-decoration: none;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.light};
  }
`;

export default Button;
