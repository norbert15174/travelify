import styled from "styled-components";
import homeIcon from "./assets/homeIcon.svg";
import aboutIcon from "./assets/aboutIcon.svg";
import interestsIcon from "./assets/interestsIcon.svg";
import visitedIcon from "./assets/visitedIcon.svg";

const InfoSection = ({birthplace, about, interests, visitedCountries}) => (
    <Container>
        <Header>
            <h1>Informacje o użytkowniku</h1>
            <Line/>
        </Header>
        <Title>
            <Icon src={homeIcon}/>
            <h3>Pochodzenie</h3>
        </Title>
        <Text>
            {birthplace !== undefined ? birthplace : <p>Brak informacji</p>}
        </Text>
        <Title>
            <Icon src={aboutIcon}/>
            <h3>O mnie</h3>
        </Title>
        <Text>
            {about !== undefined ? about : <p>Brak informacji</p>}
        </Text>
        <Title>
            <Icon src={interestsIcon}/>
            <h3>Zainteresowania</h3>
        </Title>
        <Text>
            {interests !== undefined ? interests : <p>Brak informacji</p>}
        </Text>
        <Title>
            <Icon src={visitedIcon}/>
            <h3>Odwiedzone kraje</h3>
        </Title>
        <VisitedCountries>
            {
                visitedCountries.length !== 0 ?
                visitedCountries.map((countryName) => (
                    <Country icon={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png"}>{countryName}</Country>
                )) : <p>Brak informacji</p>
            }
        </VisitedCountries> 
    </Container>
);

const Container = styled.div`
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 20px 25px;
    font-size: 17px;
    margin-bottom: 15px;
    @media only screen and (max-width: 1080px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 8px;
        padding: 15px 20px;
    }
`;

const Header = styled.div`
    width: 100%;
    color: ${({theme}) => theme.color.greyFont};
`;

const Line = styled.div`
    margin-top: 10px;
    border: 1px solid ${({theme}) => theme.color.darkTurquise};

`;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 1080px) {
        margin-top: 15px;
    }
    @media only screen and (max-width: 560px) {
        margin-top: 10px;
    }
`;

const Icon = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 15px;
    @media only screen and (max-width: 1080px) {
        width: 25px;
        height: 25px;
    }
    @media only screen and (max-width: 560px) {
        width: 20px;
        height: 20px;
        margin-right: 10px; 
    }
`;

const Text = styled.p`
    font-size: 16px;
    margin-left: 48px;
    margin-top: 10px;
    color: #000;
    @media only screen and (max-width: 1080px) {
        font-size: 12px;
        margin-left: 40px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 8px;
        margin-top: 5px;
        margin-left: 30px;
    }
    
`;

const VisitedCountries = styled.div`
    margin-left: 48px;
    margin-top: 2px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    @media only screen and (max-width: 1080px) {
        margin-left: 40px;
    }
    @media only screen and (max-width: 560px) {
        margin-left: 30px;
    }
`;

const Country = styled.div`
    display: inline-block;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    background-color: #E0E5E0;
    border-radius: 15px;
    color: #000;
    background-image: url(${({icon}) => icon});
    background-size: 20%;
    background-position: 10% 50%;
    background-repeat: no-repeat;
    font-size: 16px;
    margin-top: 8px;
    margin-right: 10px;
    padding: 5px 10px 5px 30px;
    flex-shrink: 1;
    @media only screen and (max-width: 1080px) {
        padding: 5px 10px 5px 25px;
        font-size: 10px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 8px;
        padding: 5px 5px;
        margin-top: 5px;
        background-image: none;
    }
`;


export default InfoSection;
