import React from "react";
import styled from "styled-components";

const AlbumThumbnail = ({url}) => (
    <MainPhoto src={url} alt="albumMainPhoto">
        {/* additional information like title, description, localization ... */}
    </MainPhoto>
);

const MainPhoto = styled.img`
    width: 92%;
    margin: 0 auto;
`;

export default AlbumThumbnail;