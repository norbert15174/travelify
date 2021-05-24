import React from "react";
import styled from "styled-components";
const User = () => {
  return (
    <Container
      src="https://storage.googleapis.com/telephoners/20210216_225118.jpg"
      alt="User Photo"
    />
  );
};

const Container = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 100%;
`;

export default User;
