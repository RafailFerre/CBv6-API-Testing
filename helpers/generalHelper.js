import request from 'supertest';
//const chance = require('chance').Chance();
//const newEmail = 'test_' + Date.now() + '@gmail.com';


export function login(email, password) {
    return request(process.env.BASE_URL)
        .post('/user/login')
        .send({ email: email, password: password });
}

export function signup(firstName, lastName, email, password) {
    return request(process.env.BASE_URL)
    .post('/user')
    .send({ firstName, lastName, email, password });
}
