const chance = require('chance').Chance();

export const user = {
    email: process.env.EMAIL, 
    password:  process.env.PASSWORD
}

export const newUser = {
    firstName: chance.first(), 
    lastName: chance.last(), 
    email: chance.email(), 
    password: process.env.PASSWORD 
}


const newEmail = 'test_' + Date.now() + '@gmail.com';
export const signupBody = {
    firstName: chance.first(), 
    lastName: chance.last(), 
    email: newEmail, 
    password: process.env.PASSWORD
}