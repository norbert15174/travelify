import React from "react";
import Map from "../googleMaps/Map";
import styled from "styled-components";
import "./userScrollbar.css";

const MapSection = ({ data, type }) => {
  // map options
  const options = {
    disableDefaultUI: true, // disables little yellow guy and satellite view
    zoomControl: true, // enables zoom in/out tool
    gestureHandling: "greedy", // "none" < "cooperative" < "greedy"
    maxZoom: 3,
  };

  return (
    <Container>
      <Header>
        <h1>Odwiedzone miejsca</h1>
        <Line />
      </Header>
      <MapContainer>
        <Map
          width={"100%"}
          height={"100%"}
          options={options}
          initialCoordinates={{
            lat: 0,
            lng: 0,
          }}
          markers={data}
          type={type}
        />
      </MapContainer>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 20px 25px;
  height: 80vh;
  margin-bottom: 15px;
  @media only screen and (max-width: 560px) {
    height: 60vh;
    padding: 15px 20px;
  }
`;

const Header = styled.div`
  font-size: 17px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1080px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 8px;
  }
`;

const Line = styled.div`
  margin-top: 10px;
  border-top: 2px solid ${({ theme }) => theme.color.dark};
`;

const MapContainer = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  border: 2px solid ${({ theme }) => theme.color.light};
  display: inline-block;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 25px;
  @media only screen and (max-width: 560px) {
    margin-top: 15px;
    height: calc(100% - 60px);
  }
`;

export default MapSection;
