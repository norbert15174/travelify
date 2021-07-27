import Geocode from "react-geocode";

export const GetPlaceName = ({lat, lng}) => {
    
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY);
    
    Geocode.setLanguage("en");
    
    //Geocode.setRegion(""); optional
    //Geocode.enableDebug();

    Geocode.fromLatLng(lat, lng).then(
        (response) => {
            console.log(response);
            const address = response.results[0].address_components;
            for (let i = 0; i < address.length; i++) {
                for (let j = 0; j < address[i].types.length; j++) {
                    if ( address[i].types[j] === "country" ) {
                        console.log(address[i].long_name);
                    } else if (address[i].types[j] === "natural_feature") {
                        console.log(address[i].long_name)
                    }
                }
            }
        },
        (error) => {
          console.log("No information about this place. Returning lat and lng... \nlat: " + lat.toFixed(4) + " lng: " + lng.toFixed(4));
        }
    );

}