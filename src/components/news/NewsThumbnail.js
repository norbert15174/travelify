import React from "react";
import styled from "styled-components";

const NewsThumbnail = ({news}) => (
    <>  
        <Container>
            <MainPhoto src={news.image} alt="albumMainPhoto"/>
            <Info>
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
    height: 734px;
    margin: 0 auto;
    position: relative;
    @media only screen and (max-width: 1400px) {
        height: 634px;
    }
    @media only screen and (max-width: 1100px) {
        height: 434px;
    }
    @media only screen and (max-width: 800px) {
        height: 284px;
    }
    @media only screen and (max-width: 500px) {
        height: 200px;
    }
`;

const MainPhoto = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Info = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0%;
    background: rgba(229, 229, 229, 0.8);
    min-height: 15%;
`;

const Text = styled.div`
    padding: 15px 30px 15px 30px;
    @media only screen and (max-width: 800px) {
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
    @media only screen and (max-width: 800px) {
        font-size: 18px;
    }
`;

const Localization = styled.h2`
    font-size: 18px;
    justify-self: end;
    @media only screen and (max-width: 800px) {
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
    @media only screen and (max-width: 1100px) {
        font-size: 10px;
        margin-top: 5px;
    }
    @media only screen and (max-width: 800px) {
        font-size: 8px;
        -webkit-line-clamp: 6;
    }
    @media only screen and (max-width: 500px) {
        font-size: 5px;
        -webkit-line-clamp: 3; 
    }
`;

export default NewsThumbnail;