import { expect } from 'chai';
import { signup } from '../helpers/generalHelper';
import colors from 'colors';
import { user, newUser } from '../helpers/user';
const chance = require('chance').Chance();

describe('SIGNUP', () => {
    let res;
    describe('POSITIVE'.green, () => {
        //const newEmail = 'test_' + Date.now() + '@gmail.com';
        before(async () => {
            res = await signup(newUser)   // (newUser.firstName, newUser.lastName, newUser.email, newUser.password);
            //console.log(newUser);
        });
        it('Verify response status code', async () => {
            expect(res.status).to.equal(201);
        });
        it('Verify response message', async () => {
            expect(res.body.message).contain('User created');
        });
    });

    describe('NEGATIVE'.red, () => {
        describe('EXISTING EMAIL'.blue, () => {
            before(async () => {
                res = await signup({...newUser, email: user.email}); // (newUser.firstName, newUser.lastName, user.email, newUser.password);
                //console.log(res.request._data);
            });
            it('Verify response status code', async () => {
                expect(res.status).to.equal(409);
            });
            it('Verify response message', async () => {
                expect(res.body.message).contain('e-mail exists');
            });
        });
        describe('WITH EMPTY FIRST NAME FIELD'.blue, () => {
            //const newEmail = 'test_' + Date.now() + '@mail.com';
            before(async () => {
                res = await signup({...newUser, firstName: '', email: 'new@mail.com'}); //(firstName: '', newUser.lastName, newUser.email + 'COM', newUser.password);
                //console.log(res.request._data);
            });
            it('Verify response status code', async () => {
               expect(res.status).to.equal(404);
            });
            it('Verify response message', async () => {
               expect(res.body.message).contain('not created');
            });
        });
        describe('WITH EMPTY LAST NAME FIELD'.blue, () => {
            //const newEmail = 'test_' + Date.now() + '@mail.com';
            before(async () => {
                res = await signup({...newUser, lastName: '', email: 'new@mail.com'})   // (newUser.firstName, lastName:'', newUser.email + 'COM', newUser.password);
                //console.log(res.request._data);
            });
            it('Verify response status code', async () => {
                expect(res.status).to.equal(404);
            });
            it('Verify response message', async () => {
                expect(res.body.message).contain('not created');
            });
        });
        describe('WITH EMPTY EMAIL FIELD'.blue, () => {
            //const newEmail = 'test_' + Date.now() + '@mail.com';
            before(async () => {
                res = await signup({...newUser, email: ''})  // (newUser.firstName, newUser.lastName, email: '', newUser.password);
                //console.log(res.request._data);
            });
            it('Verify response status code', async () => {
                expect(res.status).to.equal(404);
            });
            it('Verify response message', async () => {
                expect(res.body.message).contain('not created');
            });
        });
        describe('WITH EMPTY PASSWORD FIELD'.blue, () => {
            //const newEmail = 'test_' + Date.now() + '@mail.com';
            before(async () => {
                res = await signup({...newUser, password: ''})   // (newUser.firstName, newUser.lastName, newUser.email, password: '');
                //console.log(res.request._data);
            });
            it('Verify response status code', async () => {
                expect(res.status).to.equal(400);
            });
            it('Verify response message', async () => {
                expect(res.body.message).contain('Wrong password format');
            });
        });
    });
});
