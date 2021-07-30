import React, { useState, useCallback, useEffect } from "react";
import Geocode from "react-geocode";
import styled from "styled-components";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { indyStyle } from "./MapStyle";
import { FriendsListArray as markers } from "./data";
import MarkerInfo from "./MarkerInfo";

function Map({ width, height, options, initialCoordinates, type, setLocalization, deleteMarker=false}) {
	// deleteMarker - Localization.js - marker won't show up when we have cleared form

	const mapOptions = {
		options,
		styles: indyStyle,
		minZoom: 2, 
	}

	const { isLoaded } = useJsApiLoader({
    	id: "google-map-script",
    	googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  	});

	// eslint-disable-next-line
	const [map, setMap] = useState(null);
	const [selected, setSelected] = useState(null);
	const [marker, setMarker ] = useState(null);

	const onMapLoad = useCallback(function callback(map) {
		setMap(map);
	}, []);

	const onMapClick = (place) => {
		setMarker({lat: place.latLng.lat(), lng: place.latLng.lng()})
	}

	const onMarkerLoad = (marker) => {
		console.log("Marker placed on map: ", marker);
	};

	
	useEffect(() => {
		if (marker != null) {
			let country = "";
			let place = "";
			Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY);
			Geocode.setLanguage("en");
			Geocode.fromLatLng(marker.lat, marker.lng).then(
				(response) => {
					const address = response.results[0].address_components;
					for (let i = 0; i < address.length; i++) {
						for (let j = 0; j < address[i].types.length; j++) {
							if ( country && place ) {
								// when country and place is found
								break;
							}
							switch (address[i].types[j]) {
								case "country":
									country = address[i].long_name;
									break;
								case "natural_feature":
									place = address[i].long_name;
									break;
								case "point_of_interest":
									place = address[i].long_name;
									break;
								case "locality":
									place = address[i].long_name;
									break;	
								default:
									break;
							}
						}
					}
					if (place === "") {
						place = "Brak informacji";
					}
					if (country === "") {
						country = "Brak informacji";
					}
					setLocalization({
						lat: marker.lat,
						lng: marker.lng,
						country: country,
						place: place,
					});
				}, 
				(error) => {
					console.log(error);
					setLocalization({
						lat: marker.lat,
						lng: marker.lng,
						country: "Brak informacji",
						place: "Brak informacji",
					});
				}     
			)
		}
    }, [marker, setLocalization]);
	

	// @ts-ignore
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
			onClick={type === "AlbumCreator" && ((event) => {
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
						<
// @ts-ignore
						MarkerInfo
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
				{marker && type === "AlbumCreator" && !deleteMarker ? (
					<Marker
						position={{
							lat: marker.lat,
							lng: marker.lng,
						}}
					/>
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
