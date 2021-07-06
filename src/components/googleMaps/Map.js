import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { indyStyle } from "./MapStyle";
import { FriendsListArray as users } from "./data";
import MarkerInfo from "./MarkerInfo";


// map coordinates
const center = {
  lat: 0,
  lng: 0,
};

const options = {
  disableDefaultUI: true, // disables little yellow guy and satellite view
  zoomControl: true, // enables zoom in/out tool
  gestureHandling: "cooperative",
  styles: indyStyle,
  minZoom: 2, //
  maxZoom: 3,
};

function MapComponent({ width, height }) {
	const { isLoaded } = useJsApiLoader({
    	id: "google-map-script",
    	googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY, // HIDE IT!!!
  	});

	const [map, setMap] = useState(null);
	const [marker, setMarker] = useState(null);
	const [selected, setSelected] = useState(null);

	const onMapLoad = useCallback(function callback(map) {
		setMap(map);
	}, []);

	const onMarkerLoad = (markerr) => {
		console.log("marker: ", markerr);
		setMarker(markerr);
		console.log(marker)
		console.log(map);
		//setMarker(markerr.anchorPoint);
		//console.log(marker);
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
			center={center}
			zoom={2}
			onLoad={onMapLoad}
			onUnmount={onUnmount}
			options={options}
		>
			<>
				{users
				? users.list.map((user) => (
					<Marker
						key={user.id}
						position={{
							lat: user.position.lat,
							lng: user.position.lng,
						}}
						onClick={() => {
							setSelected(user);
						}}
						onLoad={onMarkerLoad}
					/>
					))
				: null}
				{selected ? (
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
					/>
				</InfoWindow>
				) : null}
			</>
		</GoogleMap>	
	) : (
		<h1>Loading...</h1>
	);
}
/*
const StyledDiv = styled.div`
	border-radius: 50%;
	overflow: hidden;
`;
*/

export default React.memo(MapComponent);

// <Marker onLoad={onMarkerLoad} position={position}/>
