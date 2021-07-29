import React, { Component} from 'react';
import UserTemplate from '../templates/UserTemplate';
import AlbumInside from "../components/albums/AlbumInside";

// AlbumDetails is a view for album inside

class AlbumDetails extends Component {

    componentDidMount() {
        
        // możnaby przekazywać id albumów itd w ten sposób

        console.log(this.props.location.state.albumId);
        
    }

    render() {

        return (
            <UserTemplate>
                <AlbumInside/>
            </UserTemplate>
        );
    }

};

export default AlbumDetails;