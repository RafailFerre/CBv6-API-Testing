const chance = require('chance').Chance();


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