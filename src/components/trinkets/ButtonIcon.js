import styled from "styled-components";

const ButtonIcon = styled.button`
  width: 80px;
  height: 80px;
  margin-top: 8px;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  background-color: ${({ theme }) => theme.color.dark};
  border: none;
  cursor: pointer;
`;

export default ButtonIcon;
