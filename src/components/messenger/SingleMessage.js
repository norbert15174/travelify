import styled from "styled-components";

const SingleMessage = () => {
  return (
    <Container>
      <ProfileIcon
        src="https://storage.googleapis.com/telephoners/20210216_225118.jpg"
        alt="User Photo"
      />
      <TextContainer>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five

      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 60px 140px;
  position: relative;
`;

const TextContainer = styled.div`
  padding: 10px;
  width: 100%;
  background: #e0e5e0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
  overflow-wrap: break-word;
`;

const ProfileIcon = styled.img`
  width: 34px;
  height: 36px;
  border-radius: 100%;
  margin-top: 10px;
  position: relative;
`;

export default SingleMessage;
