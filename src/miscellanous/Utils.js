/*
* Returns urlUserName
*/
export function getUrlUsername(firstname, lastname) {
    return (firstname + "." + lastname).toLowerCase();
}

export const userTypes = {
    logged: "logged",
    friend: "friend",
    unknown: "unknown"
}
/*
const options = [
    { value: 'Poland', label: 'Poland', icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png", },
    { value: 'Germany', label: 'Germany', icon: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png", },
    { value: 'Russia', label: 'Russia', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Slovakia', label: 'Slovakia', icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png", },
    { value: 'Czech', label: 'Czech', icon: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png", },
    { value: 'Belarus', label: 'Belarus', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Ukraine', label: 'Ukraine', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Lithuania', label: 'Lithuania', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Sweden', label: 'Sweden', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Norway', label: 'Norway', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
]

export function getCountryData(name) {
    return JSON.parse(localStorage.getItem("countryList")).find((item) => item.country === name);
}*/


export function getCountryData(input) {
    let output = [];
    let list = JSON.parse(localStorage.getItem("countryList"));
    for ( let i = 0; i < list.length; i++) {
        for ( let j = 0; j < input.length; j++) {
            if (list[i].country === input[j]) {
                output.push(list[i]);
            }
        }
        if (output.length === input.length) {
            break;
        }
    }
    return output;
}

export function mapCountriesToSelect() {
    let list = JSON.parse(localStorage.getItem("countryList"));
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        newList.push({
            value: list[i].country,
            label: list[i].country,
            icon: list[i].url,
            country: list[i].country,
            url: list[i].url,
            id: list[i].id,
        })
    }
    localStorage.setItem("countryList", JSON.stringify(newList));    
}