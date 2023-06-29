#!/usr/bin/env zx

$.verbose = false;

const APIs = [
    {
        url: "http://localhost:8080/hello/greeting/$name",
        values: {
            "name": () => Math.random().toString(36).slice(2, 7)
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
