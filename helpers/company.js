import request from 'supertest';
import * as user from './user';
const chance = require('chance').Chance();

export const companyUpdateData = {
  companyName: chance.company(),
  email: chance.email(),
};

export const companyId = async () => {
    return (await user.getUser(await user.userId())).body.payload.companyAccount._id; 
  }

export function getCompany(companyId, token = process.env.TOKEN) {
  return request(process.env.BASE_URL)
    .get(`/company/${companyId}`)
    .set('Authorization', token);
}

export function updateCompany(companyId, companyData, token = process.env.TOKEN) {
  return request(process.env.BASE_URL)
    .patch(`/company/${companyId}`)
    .set('Authorization', token)
    .send(companyData);
}