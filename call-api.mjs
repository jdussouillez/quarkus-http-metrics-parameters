#!/usr/bin/env zx

$.verbose = false;

function generateRandomName() {
    return Math.random().toString(36).slice(2, 7);
}

const APIs = [
    {
        url: "http://localhost:8080/hello/greeting/$name",
        method: "GET",
        values: {
            "name": generateRandomName
        }
    },
    {
        url: "http://localhost:8080/hello/greeting/$name",
        method: "POST",
        values: {
            "name": generateRandomName
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
        const value = apiDef.values[param]();
        url = url.replace(`$${param}`, value);
    });
    return `${url}?status=${status}`;
}

async function callApi(apiDef, status) {
    const url = generateUrl(apiDef, status);
    const resp = await fetch(url, {method: apiDef.method});
    return resp.ok;
}

while (true) {
    const apiDef = random(APIs);
    const status = randomStatus();
    await callApi(apiDef, status);
    // await sleep(1000);
}
