const chance = require('chance').Chance();
//require('../setup/global.js');
import request from 'supertest'

export const clientData = {
    name: chance.first(),
    phone: chance.phone(),
    email: chance.email(),
    description: chance.sentence()
}

export function createClient(data) {
    return request(process.env.BASE_URL)
    .post('/client').set('Authorization', process.env.TOKEN)
    .send(data)
}

export function getClient(id) {
    return request(process.env.BASE_URL)
    .get(`/client/${id}`).set('Authorization', process.env.TOKEN)
}

export function deleteClient(id) {
    return request(process.env.BASE_URL)
    .delete(`/client/${id}`).set('Authorization', process.env.TOKEN)
}

export function updateClient(id, data) {
    return request(process.env.BASE_URL)
    .patch(`/client/${id}`).set('Authorization', process.env.TOKEN).send(data)
}

export function searchClient() {
    return request(process.env.BASE_URL)
    .post('/client/search').set('Authorization', process.env.TOKEN).send({limit: 100})
}