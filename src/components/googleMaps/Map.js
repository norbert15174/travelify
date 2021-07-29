import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { indyStyle } from "./MapStyle";
import { FriendsListArray as markers } from "./data";
import MarkerInfo from "./MarkerInfo";
import { GetPlaceName } from "./Geocode";

function Map({ width, height, options, initialCoordinates, type }) {

	const mapOptions = {
		options,
		styles: indyStyle,
		minZoom: 2, 
	}

	const { isLoaded } = useJsApiLoader({
    	id: "google-map-script",
    	googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  	});

	const [map, setMap] = useState(null);
	const [selected, setSelected] = useState(null);

	const onMapLoad = useCallback(function callback(map) {
		setMap(map);
	}, []);

	// not available when watching AlbumInside
	const onMapClick = (place) => {
		if (false) console.log(map);
		console.log("lat: " + place.latLng.lat() + " lng: " + place.latLng.lng());
		GetPlaceName({
			lat: place.latLng.lat(), 
			lng: place.latLng.lng()
		});
	}

	const onMarkerLoad = (marker) => {
		console.log("Marker placed on map: ", marker);
	};
	
	const onUnmount = useCallback(function callback(map) {
		setMap(null);	
	}, []);

	return isLoaded ? (		
		<GoogleMap
			mapContainerStyle={{
				width: width,
				height: height,
			}}
			center={initialCoordinates}
			zoom={type === "AlbumInside" ? 5 : 2}
			onLoad={onMapLoad}
			onUnmount={onUnmount}
			options={mapOptions}
			onClick={type === "StartPage" && ((event) => {
				onMapClick(event);
			})}
		>
			<>
				{markers && type === "StartPage" ? markers.list.map((user) => (
					<Marker
						key={user.id}
						position={{
							lat: user.position.lat,
							lng: user.position.lng,
						}}
						onClick={() => setSelected(user)}
						onLoad={onMarkerLoad}
					/>
				)) : null}
				{selected && type === "StartPage" ? (
					<InfoWindow
						position={{
							lat: selected.position.lat + 3,
							lng: selected.position.lng,
						}}
						onCloseClick={() => setSelected(null)}	
					>
						<MarkerInfo
							name={selected.name}
							url={selected.url}
							title={selected.title}
							country={selected.country}
						/>
					</InfoWindow>
				) : null}
				{type === "AlbumInside" &&
					<Marker
						position={{
							lat: initialCoordinates.lat,
							lng: initialCoordinates.lng,
						}}
						onClick={() => setSelected({name: "Japonia, Osaka", lat: initialCoordinates.lat, lng: initialCoordinates.lng })}
						onLoad={onMarkerLoad}
					/>}
				{selected && type === "AlbumInside" ? (
					<InfoWindow
						position={{
							lat: selected.lat,
							lng: selected.lng,
						}}
						onCloseClick={() => setSelected(null)}	
					>	
						<LocationInfo>
							<Name>{selected.name}</Name>
							<a href="https://www.google.com/search?q=Japonia, Osaka" target="_blank" rel="noreferrer">
								Kliknij, by dowiedzieć się więcej o tym miejscu
							</a> 
						</LocationInfo>
					</InfoWindow>
				) : null}	
			</>
		</GoogleMap>	
	) : (
		<h1>Loading... or maybe not :D</h1>
	);

}

// GrLinkNext

const LocationInfo = styled.div`
	color: ${({theme}) => theme.color.darkTurquise};
	font-size: 18px;
	a {
		color: ${({theme}) => theme.color.darkTurquise};
		font-size: 16px;
		&:link, &:visited, &:hover, &:active {
			color: ${({theme}) => theme.color.darkTurquise};
		}
	}
	@media only screen and (max-width: 510px) {
        font-size: 12px;
		a {
			font-size: 10px;
		}
    }
`;

const Name = styled.p`
	margin-bottom: 5px;
	font-weight: ${({theme}) => theme.fontWeight.bold};
`;

export default React.memo(Map);
