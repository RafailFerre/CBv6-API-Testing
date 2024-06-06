import { expect } from 'chai';
import { signup } from '../helpers/generalHelper';
import colors from 'colors';
import { newUser, user } from '../helpers/user';
const chance = require('chance').Chance();

describe('SIGNUP', () => {
    let res;
    describe('POSITIVE'.green, () => {
        //const newEmail = 'test_' + Date.now() + '@gmail.com';
        before(async () => {
            res = await signup(
                newUser.firstName,
                newUser.lastName,
                newUser.email, //newEmail
                newUser.password
            );
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
                res = await signup(
                    newUser.firstName,
                    newUser.lastName,
                    user.email,
                    newUser.password
                );
            });
            it('Verify response status code', async () => {
                expect(res.status).to.equal(409);
            });
            it('Verify response message', async () => {
                expect(res.body.message).contain('exist');
            });
        });
        describe('WITH EMPTY FIRST NAME FIELD'.blue, () => {
            //const newEmail = 'test_' + Date.now() + '@mail.com';
            before(async () => {
                res = await signup(
                    '',
                    newUser.lastName,
                    newUser.email + 'COM', //newEmail
                    newUser.password
                );
            });
            it('Verify response status code', async () => {
                expect(res.status).to.equal(404);
                //console.log(res.request._data);
            });
            it('Verify response message', async () => {
                expect(res.body.message).contain('not created');
            });
        });
    });
});