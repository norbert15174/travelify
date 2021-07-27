import React from "react";
import styled from "styled-components";

const NewsThumbnail = ({news}) => (
    <>  
        <Container>
            <MainPhoto src={news.image} alt="albumMainPhoto"/>
            <Info>
                {/* Album owner name and avatar */}
                <Text>
                    <InfoHeader>
                        <Title>{news.title}</Title>
                        <Localization>{news.localization}</Localization>
                    </InfoHeader>
                    <Description>
                        {news.description}
                    </Description>
                </Text>
            </Info>
        </Container>
    </>
);

const Container = styled.div`
    width: 92%;
    margin: 0 auto;
    position: relative;
`;

const MainPhoto = styled.img`
    width: 100%;
`;

const Info = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0%;
    background: rgba(229, 229, 229, 0.8);
`;

const Text = styled.div`
    padding: 15px 30px 15px 30px;
    @media only screen and (max-width: 890px) {
       padding: 5px 15px 5px 15px;
    }
`;

const InfoHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: center;
`;

const Title = styled.h1`
    font-size: 32px;    
    display: inline-block;
    @media only screen and (max-width: 890px) {
        font-size: 18px;
    }
`;

const Localization = styled.h2`
    font-size: 18px;
    justify-self: end;
    @media only screen and (max-width: 890px) {
        font-size: 10px;
    }
`;

const Description = styled.p`
    margin-top: 20px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
    @media only screen and (max-width: 1020px) {
        font-size: 10px;
        margin-top: 5px;
    }
    @media only screen and (max-width: 890px) {
        font-size: 8px;
        -webkit-line-clamp: 6;
    }
    @media only screen and (max-width: 530px) {
        font-size: 5px;
        -webkit-line-clamp: 3; 
    }
`;

export default NewsThumbnail;