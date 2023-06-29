#!/usr/bin/env zx

$.verbose = false;

function generateRandomName() {
    return Math.random().toString(36).slice(2, 7);
}

const APIs = [
    {
        url: "http://localhost:8080/hello/greeting/$name",
        method: "GET",
        // method: "POST",
        values: {
            "name": generateRandomName
        }
    }
];

function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function random(values) {
    if (values.length === 1) {
        return values[0];
    }
    return values[rand(0, values.length)];
}

function generateUrl(apiDef) {
    let url = apiDef.url;
    Object.keys(apiDef.values).forEach(param => {
        const value = apiDef.values[param]();
        url = url.replace(`$${param}`, value);
    });
    return url;
}

async function callApi(apiDef) {
    const url = generateUrl(apiDef);
    const resp = await fetch(url, {method: apiDef.method});
    return resp.ok;
}

while (true) {
    const apiDef = random(APIs);
    await callApi(apiDef);
}
