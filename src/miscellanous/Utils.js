export const errors = {
  noAccess: "noAccess",
  notFound: "notFound",
};

export const userTypes = {
  logged: "logged",
  friend: "friend",
  unknown: "unknown",
};

export const albumTypes = {
  public: "public",
  private: "private",
  shared: "shared",
};

export const albumRights = {
  owner: "owner",
  visitor: "visitor", // only when public album
  sharedPerson: "sharedPerson",
  notLogged: "notLogged",
};

export const albumCreator = {
  creation: "creation",
  edition: "edition",
};

export const groupCreator = {
  creation: "creation",
  edition: "edition",
};

export const groupMember = {
  owner: "owner",
  member: "member",
};

export const newsTypes = {
  friends: "friends",
  community: "community",
};

export const notification = {
  share: "ALBUM_SHARE",
  comment: "COMMENT",
  tag: "PHOTO_TAG",
  request: "FRIEND_REQUEST",
};

export const PHOTO_SIZE_LIMIT = {
  TOTAL: 50000000,
  SINGLE: 10000000,
};

/*
    Function for parsing string with country names to array with objects.
*/
export function getCountryData(input) {
  let output = [];
  let parsedInput = input.split(",");
  let list = JSON.parse(sessionStorage.getItem("countryList"));
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < parsedInput.length; j++) {
      if (list[i].country === parsedInput[j]) {
        output.push(list[i]);
      }
    }
    if (output.length === parsedInput.length) {
      break;
    }
  }
  return output;
}

/*
    Function for 
*/
export function mapCountriesToSelect(countries) {
  let list = countries;
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    newList.push({
      value: list[i].country,
      label: list[i].country,
      icon: list[i].url,
      country: list[i].country,
      url: list[i].url,
      id: list[i].id,
    });
  }
  sessionStorage.setItem("countryList", JSON.stringify(newList));
}

export function mapFriendsToSelect(input, type = null) {
  // type jest podawany ponieważ czasem możemy otrzymać lastName lub surName xD
  let output = [];
  if (type === "shared") {
    for (let i = 0; i < input.length; i++) {
      output.push({
        value: input[i].name + " " + input[i].surName,
        label: input[i].name + " " + input[i].surName,
        name: input[i].name + " " + input[i].surName,
        icon: input[i].photo,
        id: input[i].id, // share id (NOT USERID)
        userId: input[i].userId,
      });
    }
  } else {
    for (let i = 0; i < input.length; i++) {
      output.push({
        value: input[i].name + " " + input[i].lastName,
        label: input[i].name + " " + input[i].lastName,
        name: input[i].name + " " + input[i].lastName,
        icon: input[i].profilePicture,
        id: input[i].id, // (USER_ID)
      });
    }
  }
  return output;
}

export function getCountryId(countryName) {
  let list = JSON.parse(sessionStorage.getItem("countryList"));
  let foundId = null;
  for (let i = 0; i < list.length; i++) {
    if (list[i].country === countryName) {
      foundId = list[i].id;
    }
  }
  return foundId;
}

export function getCountryName(countryId) {
  let list = JSON.parse(sessionStorage.getItem("countryList"));
  let found = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === countryId) {
      found = list[i].country;
    }
  }
  return found;
}

export const getDate = (input) => {
  const months = [
    "stycznia",
    "lutego",
    "marca",
    "kwietnia",
    "maj",
    "czerwca",
    "lipca",
    "sierpnia",
    "września",
    "października",
    "listopada",
    "grudnia",
  ];
  /* const days = [
        'Niedz',
        'Pon',
        'Wt',
        'Śr',
        'Czw',
        'Pt',
        'Sb'
    ] */
  let temp = new Date(input);
  // days[temp.getDay()] + " " +
  let output =
    temp.getDate() + " " + months[temp.getMonth()] + " " + temp.getFullYear();
  return output;
};
