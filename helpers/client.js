const chance = require('chance').Chance();
//require('../setup/global.js');
import request from 'supertest'

export const client = {
    name: chance.first(),
    phone: chance.phone(),
    email: chance.email()
}

export function createClient(data) {
    return request(process.env.BASE_URL)
    .post('/client').set('Authorization', process.env.TOKEN)
    .send(data)
}