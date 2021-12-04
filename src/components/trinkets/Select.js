import React from "react";
import styled from "styled-components";
import Select, { components } from "react-select";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";

const SelectValue = ({
  options,
  type,
  isMulti = false,
  setState = null,
  formik = false,
  id = null,
  name = null,
  onChange = null,
  onBlur = null,
  value = null,
}) => {
  // not for Formik and for everything else
  const setValueOnChange = (value) => {
    if (value !== null) {
      if (isMulti) {
        setState(value); // całe obiekty
      } else {
        setState(value);
      }
      return;
    }
    setState("");
  };

  // for Formik and for country selection
  const handleChange = (value) => {
    if (type === "country") {
      onChange("nationality", value);
    } else if (type === "searchVisitedCountries") {
      onChange("visitedCountries", value);
    } else if (type === "searchAlbumCountry") {
      onChange("albumCountry", value);
    }
  };

  // for Formik and for country selection
  const handleBlur = () => {
    if (type === "country") {
      onBlur("nationality", true);
    } else if (type === "searchVisitedCountries") {
      onBlur("visitedCountries", true);
    } else if (type === "searchAlbumCountry") {
      onBlur("albumCountry", true);
    }
  };

  // for Formik and normal use
  //const getValue = (options, value) => {
  //    return options ? options.find(option => option.value === value) : "";
  //}

  const { Option } = components;

  const CustomSelectOption = (props) => (
    <Option {...props}>
      <ValueContainer>
        {type === "country" ||
        type === "searchAlbumCountry" ||
        type === "searchVisitedCountries" ? (
          <CountryFlag src={props.data.icon} alt="Flag" />
        ) : (
          <ProfilePhoto
            src={props.data.icon ? props.data.icon : noProfilePictureIcon}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = noProfilePictureIcon;
            }}
            alt="Profile picture"
          />
        )}
        <p>{props.data.label}</p>
      </ValueContainer>
    </Option>
  );

  const CustomSelectValue = (props) => (
    <ValueContainer>
      {type === "country" ||
      type === "searchAlbumCountry" ||
      type === "searchVisitedCountries" ? (
        <CountryFlag src={props.data.icon} alt="Flag" />
      ) : (
        <ProfilePhoto
          src={props.data.icon ? props.data.icon : noProfilePictureIcon}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = noProfilePictureIcon;
          }}
          alt="Profile picture"
        />
      )}
      <p>{props.data.label}</p>
    </ValueContainer>
  );

  const CustomTheme = (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "rgba(18, 191, 206, 0.4)",
        background: "#F2F7F2",
      },
      borderRadius: 5,
    };
  };

  const CustomStyles = {
    menu: (provided) => ({
      ...provided,
      background: "#F2F7F2",
    }),
    control: (provided) => ({
      ...provided,
      background: "#F2F7F2",
      border: "1px solid #075459",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #075459",
      },
      "&:focus": {
        border: "1px solid #075459",
      },
    }),
    menuList: (provided) => ({
      ...provided,
      height: "100px",
      "::-webkit-scrollbar": {
        width: "10px",
      },
      "::-webkit-scrollbar-track": {
        background: "#F1F1F1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "25px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
  };

  return (
    <StyledSelect
      id={id}
      name={name}
      styles={CustomStyles}
      theme={CustomTheme}
      options={options}
      isSearchable
      isClearable={isMulti ? false : true}
      isMulti={isMulti}
      type={type}
      placeholder={
        type === "country" ||
        type === "searchAlbumCountry" ||
        type === "searchVisitedCountries"
          ? "Wybierz kraj..."
          : "..."
      }
      noOptionsMessage={() => "No results :("}
      onChange={formik ? handleChange : setValueOnChange}
      onBlur={formik ? handleBlur : null}
      value={value}
      components={{
        Option: CustomSelectOption,
        SingleValue: CustomSelectValue,
      }}
    />
  );
};

const StyledSelect = styled(Select)`
  margin-top: 5px;
  width: ${({ isMulti, type }) =>
    !isMulti ||
    type === "searchAlbumCountry" ||
    type === "searchVisitedCountries"
      ? "225px"
      : "auto"};
  min-width: 225px;
  max-width: 700px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  @media only screen and (max-width: 1080px) {
    max-width: 500px;
  }
  @media only screen and (max-width: 560px) {
    max-width: 250px;
  }
  @media only screen and (max-width: 410px) {
    max-width: 150px;
  }
`;

const CountryFlag = styled.img`
  width: 30px;
  height: 20px;
  margin-right: 10px;
`;

const ProfilePhoto = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default SelectValue;
