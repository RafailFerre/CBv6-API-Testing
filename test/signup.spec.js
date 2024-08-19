import { expect } from 'chai';
import { signup } from '../helpers/generalHelper';
import colors from 'colors';
import { user, userData } from '../helpers/user';
const chance = require('chance').Chance();

describe('SIGNUP', () => {
    let res;
    describe('POSITIVE'.green, () => {
        //const newEmail = 'test_' + Date.now() + '@gmail.com';
        before(async () => {
            res = await signup(userData)   // (userData.firstName, userData.lastName, userData.email, userData.password);
            //console.log(userData);
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
                res = await signup({ ...userData, email: user.email} ); // (userData.firstName, userData.lastName, user.email, userData.password);
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
                res = await signup({ ...userData, firstName: '', email: 'new@mail.com' }); //(firstName: '', userData.lastName, userData.email + 'COM', userData.password);
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
                res = await signup({ ...userData, lastName: '', email: 'new@mail.com' })   // (userData.firstName, lastName:'', userData.email + 'COM', userData.password);
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
                res = await signup({ ...userData, email: '' })  // (userData.firstName, userData.lastName, email: '', userData.password);
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
                res = await signup({ ...userData, password: '' })   // (userData.firstName, userData.lastName, userData.email, password: '');
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
