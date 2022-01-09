import React, { useState, useCallback, useEffect } from "react";
import Geocode from "react-geocode";
import "./styles/markerInfo.css";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { indyStyle } from "./MapStyle";

import MarkerInfo from "./MarkerInfo";
import { albumCreator } from "../../miscellanous/Utils";
import { getCountryId } from "../../miscellanous/Utils";

function Map({
  width,
  height,
  options,
  markers = null,
  initialCoordinates,
  type,
  setLocalization = null,
  deleteMarker = false,
}) {
  const mapOptions = {
    options,
    styles: indyStyle,
    minZoom: 2,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // eslint-disable-next-line
  const [map, setMap] = useState(null);
  const [selected, setSelected] = useState(null);
  const [marker, setMarker] = useState(null);

  const onMapLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onMapClick = (place) => {
    setMarker({ lat: place.latLng.lat(), lng: place.latLng.lng() });
  };

  const onMarkerLoad = (marker) => {};

  useEffect(() => {
    if (marker != null) {
      let country = "";
      let place = "";
      Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
      Geocode.setLanguage("en");
      Geocode.fromLatLng(marker.lat, marker.lng).then(
        (response) => {
          console.log(response);
          const address = response.results[0].address_components;
          for (let i = 0; i < address.length; i++) {
            for (let j = 0; j < address[i].types.length; j++) {
              if (country && place) {
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
                case "park":
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
            countryId: getCountryId(country),
            countryName: country,
            place: place,
          });
        },
        (error) => {
          setLocalization({
            lat: marker.lat,
            lng: marker.lng,
            country: "Brak informacji",
            place: "Brak informacji",
          });
        }
      );
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
      onClick={
        (type === albumCreator.creation || type === albumCreator.edition) &&
        ((event) => {
          onMapClick(event);
        })
      }
    >
      <>
        {markers &&
        (type === "StartPage" || type === "UserPage" || type === "groups")
          ? markers.map((item) => (
              <Marker
                key={item.id}
                position={{
                  lat: item.coordinate.lat,
                  lng: item.coordinate.lang,
                }}
                onClick={() => setSelected(item)}
                onLoad={onMarkerLoad}
              />
            ))
          : null}
        {selected &&
        (type === "StartPage" || type === "UserPage" || type === "groups") ? (
          <InfoWindow
            position={{
              lat: selected.coordinate.lat + 3,
              lng: selected.coordinate.lang,
            }}
            onCloseClick={() => setSelected(null)}
          >
            <MarkerInfo details={selected} type={type} />
          </InfoWindow>
        ) : null}
        {type === "AlbumInside" && (
          <Marker
            position={{
              lat: initialCoordinates.lat,
              lng: initialCoordinates.lng,
            }}
            onLoad={onMarkerLoad}
          />
        )}
        {type === albumCreator.creation && marker && !deleteMarker ? (
          <Marker
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          />
        ) : null}
        {type === albumCreator.edition ? (
          <Marker
            position={{
              lat: initialCoordinates.lat,
              lng: initialCoordinates.lng,
            }}
          />
        ) : null}
      </>
    </GoogleMap>
  ) : (
    <h1>Loading Google Maps...</h1>
  );
}

export default React.memo(Map);
