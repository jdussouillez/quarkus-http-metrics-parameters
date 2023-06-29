#!/usr/bin/env zx

$.verbose = false;

const APIs = [
    {
        url: "http://localhost:8080/hello/greeting/$name",
        values: {
            "name": [
                // https://catonmat.net/tools/generate-random-names
                "Skylar",
                "Kara",
                "Allyson",
                "Roman",
                "Abraham",
                "Alexandro",
                "Jalyn",
                "Tristan",
                "Jordy",
                "Lawson",
                "Keely",
                "Karleigh",
                "Herman",
                "Elizabeth",
                "Allen",
                "Danny",
                "Dexter",
                "Sharon",
                "Juliann",
                "Erik",
                "Rita",
                "Isai",
                "Dan",
                "Edgar",
                "Mordechai",
                "Alberto",
                "Zion",
                "Ernesto",
                "Cameryn",
                "Menachem",
                "Jonah",
                "Jaylon",
                "Stefanie",
                "Jesenia",
                "Diane",
                "Davonte",
                "Shemar",
                "Shekinah",
                "Bo",
                "Dimitri",
                "Celia",
                "Savanah",
                "Nico",
                "Chauncey",
                "Harlee",
                "Erich",
                "Charlene",
                "Kristi",
                "Theo",
                "Semaj",
                "Juancarlos",
                "Bishop",
                "Adrian",
                "Aspen",
                "Stacy",
                "Kayla",
                "Gianni",
                "Kearra",
                "Justina",
                "Oliver",
                "Dangelo",
                "Shakira",
                "Brianna",
                "Danica",
                "Clay",
                "Ryland",
                "Vladimir",
                "Keona",
                "Christie",
                "Abriana",
                "Hailie",
                "Kiley",
                "Ian",
                "Roy",
                "Essence",
                "Johanna",
                "Curtis",
                "Kai",
                "Kaya",
                "Kyle",
                "Ricky",
                "Dianna",
                "Roderick",
                "Dakota",
                "Ester",
                "Trinity",
                "Cydney",
                "Addie",
                "Maya",
                "Isabel",
                "Deandra",
                "Carlo",
                "Brieanna",
                "Kaleigh",
                "Obed",
                "Shelby",
                "Jana",
                "Rylie",
                "Davin",
                "Laney"
            ]
        }
    }
];

function random(values) {
    if (values.length === 1) {
        return values[0];
    }
    return values[Math.floor(Math.random() * values.length)];
}

function randomStatus() {
    return Math.random() < 0.5 ? 200 : random([401, 405, 406]);
}

function generateUrl(apiDef, status) {
    let url = apiDef.url;
    Object.keys(apiDef.values).forEach(param => {
        const value = random(apiDef.values[param]);
        url = url.replace(`$${param}`, value);
    });
    return `${url}?status=${status}`;
}

async function callApi(url) {
    // console.log(url);
    const resp = await fetch(url);
    return resp.ok;
}

while (true) {
    const apiDef = random(APIs);
    const status = randomStatus();
    const url = generateUrl(apiDef, status);
    await callApi(url);
    // await sleep(1000);
}
