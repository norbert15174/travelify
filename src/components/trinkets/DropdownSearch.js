import React from "react";
import styled from "styled-components";
import Select, { components } from "react-select";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";

/*
    Dropdown search is used at AlbumsPage
*/

const { Option } = components;

const AlbumSelectOption = (props) => (
  <Option {...props}>
    <ValueContainer>
      <Album src={props.data.mainPhoto} />
      <InnerContainer>
        <MobileContainer>
          <Title>{props.data.value}</Title>
          <Place>{props.data.place}</Place>
        </MobileContainer>
        {props.data.owner !== undefined && (
          <User>
            <Profile
              src={props.data.owner.photo}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = noProfilePictureIcon;
              }}
              alt="Profile picture"
            />
            <Name>
              {props.data.owner.name + " " + props.data.owner.surName}
            </Name>
          </User>
        )}
      </InnerContainer>
    </ValueContainer>
  </Option>
);

const AlbumSelectValue = (props) => (
  <ValueContainer>
    <Album src={props.data.mainPhoto} />
    <InnerContainer>
      <MobileContainer>
        <Title>{props.data.value}</Title>
        <Place>{props.data.place}</Place>
      </MobileContainer>
      {props.data.owner !== undefined && (
        <User>
          <Profile
            src={props.data.owner.photo}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = noProfilePictureIcon;
            }}
            alt="Profile picture"
          />
          <Name>{props.data.owner.name + " " + props.data.owner.surName}</Name>
        </User>
      )}
    </InnerContainer>
  </ValueContainer>
);

const GroupSelectOption = (props) => (
  <Option {...props}>
    <ValueContainer>
      <Album src={props.data.groupPicture} />
      <InnerContainer>
        <MobileContainer>
          <Title>{props.data.value}</Title>
          <Place>{props.data.place}</Place>
        </MobileContainer>
        <MembersAmount>
          {props.data.membersAmount > 1
            ? props.data.membersAmount + " członków grupy"
            : "1 członek grupy"}
        </MembersAmount>
      </InnerContainer>
    </ValueContainer>
  </Option>
);

const GroupSelectValue = (props) => (
  <ValueContainer>
    <Album src={props.data.groupPicture} />
    <InnerContainer>
      <MobileContainer>
        <Title>{props.data.value}</Title>
        <Place>{props.data.place}</Place>
      </MobileContainer>
      <MembersAmount>
        {props.data.membersAmount > 1
          ? props.data.membersAmount + " członków grupy"
          : "1 członek grupy"}
      </MembersAmount>
    </InnerContainer>
  </ValueContainer>
);

const CustomTheme = (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "rgba(18, 191, 206, 0.4)",
      background: "#E0E5E0",
    },
    borderRadius: 5,
  };
};

const CustomStyles = {
  menu: (provided) => ({
    ...provided,
    background: "#E0E5E0",
  }),
  control: (provided) => ({
    ...provided,
    background: "#E0E5E0",
    border: "1px solid #075459",
    "&:hover": {
      border: "1px solid #075459",
    },
    "&:focus": {
      border: "1px solid #075459",
    },
  }),
  menuList: (provided) => ({
    ...provided,
    "::-webkit-scrollbar": {
      width: "10px",
    },
    "::-webkit-scrollbar-track": {
      background: "#E0E5E0",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "25px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
    borderRadius: 4,
    border: "1px solid #075459",
    "&:hover": {
      border: "1px solid #075459",
    },
    "&:focus": {
      border: "1px solid #075459",
    },
  }),
};

const DropdownSearch = ({ options, setState, value, searchType }) => {
  const setValueOnChange = (value) => {
    if (value) {
      setState(value.id); // albumId
    }
  };

  return (
    <StyledSelect
      styles={CustomStyles}
      theme={CustomTheme}
      options={options}
      isSearchable
      isClearable
      placeholder="Szukaj..."
      noOptionsMessage={() =>
        searchType === "albums" ? "Brak albumów :(" : "Brak grup :("
      }
      onChange={setValueOnChange}
      value={value}
      components={{
        Option: searchType === "albums" ? AlbumSelectOption : GroupSelectOption,
        SingleValue:
          searchType === "albums" ? AlbumSelectValue : GroupSelectValue,
      }}
    />
  );
};

const StyledSelect = styled(Select)`
  min-width: 50%;
  max-width: 50%;
  margin: 35px auto 0 auto;
  font-size: 16px;
`;

const Album = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
  @media only screen and (max-width: 1110px) {
    width: 100px;
    height: 100px;
  }
  @media only screen and (max-width: 905px) {
    width: 80px;
    height: 80px;
  }
  @media only screen and (max-width: 760px) {
    width: 50px;
    height: 50px;
  }
  @media only screen and (max-width: 560px) {
    display: none;
  }
`;

const ValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
  @media only screen and (max-width: 1110px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 905px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 760px) {
    margin-bottom: 0px;
  }
  @media only screen and (max-width: 435px) {
    font-size: 8px;
  }
`;

const Place = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
  @media only screen and (max-width: 1110px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 905px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 760px) {
    margin-bottom: 0px;
  }
  @media only screen and (max-width: 435px) {
    font-size: 6px;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media only screen and (max-width: 435px) {
    align-items: none;
  }
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid ${({ theme }) => theme.color.light};
  @media only screen and (max-width: 1110px) {
    width: 30px;
    height: 30px;
  }
  @media only screen and (max-width: 905px) {
    width: 20px;
    height: 20px;
  }
  @media only screen and (max-width: 760px) {
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }
  @media only screen and (max-width: 435px) {
    display: none;
    margin-right: 0px;
  }
`;

const Name = styled.p`
  font-size: 18px;
  @media only screen and (max-width: 1110px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 905px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 435px) {
    font-size: 8px;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  @media only screen and (max-width: 905px) {
    margin-left: 10px;
  }
  @media only screen and (max-width: 435px) {
    display: block;
  }
`;

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MembersAmount = styled.h1`
  color: ${({ theme }) => theme.color.greyFont};
  font-size: 16px;
  @media only screen and (max-width: 1110px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 905px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 760px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 435px) {
    font-size: 8px;
  }
`;

export default DropdownSearch;
