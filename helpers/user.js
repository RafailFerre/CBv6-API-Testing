const chance = require('chance').Chance();
import request from 'supertest'


// login body for user in test auth
export const user = {
    email: process.env.EMAIL, 
    password:  process.env.PASSWORD
}

// signup body for new user in test signup
export const newUser = {
    firstName: chance.first(), 
    lastName: chance.last(), 
    email: chance.email(), 
    password: process.env.PASSWORD 
}

// signup body for new user in test register
const newEmail = 'test_' + Date.now() + '@gmail.com';
export const signupBody = {
    firstName: chance.first(), 
    lastName: chance.last(), 
    email: newEmail, 
    password: process.env.PASSWORD
}

export function signup(data) { 
    return request(process.env.BASE_URL)
    .post('/user')
    .send(data);
}

export function login(email, password) {
    return request(process.env.BASE_URL)
      .post('/user/login')
      .send({ email, password });
  }

  export function getUser(userId){
    return request(process.env.BASE_URL)
    .get(`/user/${userId}`).set('Authorization', process.env.TOKEN)
  }

  export function updateUser(id, data) {
    return request(process.env.BASE_URL)
    .patch(`/user/${id}`).set('Authorization', process.env.TOKEN).send(data)
}

export function deleteUser(userId){
    return request(process.env.BASE_URL)
    .delete(`/user/${userId}`).set('Authorization', process.env.TOKEN)
  }

  export function getUserNoAuth(userId){
    return request(process.env.BASE_URL)
    .get(`/user/${userId}`)
  }

  export function deleteUserNoAuth(userId){
    return request(process.env.BASE_URL)
    .delete(`/user/${userId}`)
  }