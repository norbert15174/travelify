import React from "react";
import styled from "styled-components";

const User = () => {
  return (
      <Container
        src="https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x"
        alt="User Photo"
      />
  );
};

const Container = styled.img`
  width: 80px;
  height: 80px;
  margin-top: 7px;
  border-radius: 100%;
  cursor: pointer;
`;

export default User;

// https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x
//https://storage.googleapis.com/telephoners/20210216_225118.jpg