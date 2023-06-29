#!/usr/bin/env zx

$.verbose = false;

function generateRandomName() {
    return Math.random().toString(36).slice(2, 7);
}

const APIs = [
    {
        url: "http://localhost:8080/api/hello/greeting/$name",
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
    try {
        const resp = await fetch(
            url,
            {
                method: apiDef.method,
                // API can take 500ms to respond, so with this timeout we can get "RESET" errors
                signal: AbortSignal.timeout(450)
            }
        );
        return resp.ok;
    } catch (e) {
    }
    return false;
}

while (true) {
    const apiDef = random(APIs);
    await callApi(apiDef);
}
