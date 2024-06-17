import request from 'supertest';
//const chance = require('chance').Chance();
//const newEmail = 'test_' + Date.now() + '@gmail.com';


export function login(email, password) {
    return request(process.env.BASE_URL)
        .post('/user/login')
        .send({ email: email, password: password });
}

export function signup(data) { //signup(firstName, lastName, email, password)
    return request(process.env.BASE_URL)
    .post('/user')
    .send(data);  //.send({ firstName, lastName, email, password });
}

export function register(data) {
    return request(process.env.BASE_URL)
        .post('/user')
        .send(data)
}

export function emailSearch(email) {
    return request('https://clientbase-server.herokuapp.com')
    .post('/email/search')
    .send({ email });
}

export function emailVerify(endPoint) {
    return request('https://clientbase-server.herokuapp.com').get(endPoint).send()
}