import { expect } from 'chai';
import request from 'supertest';
import { register } from '../helpers/generalHelper';
import { signupBody } from '../helpers/user';

const chance = require('chance').Chance();

describe('REGISTER', () => {
    let res;

    describe('POSITIVE', () => {
        before(async () => {
            res = await register(signupBody);
        })
        it('Verify response status code', () => {
            expect(res.status).to.equal(201);
        });
        it('Verify response message', () => {
            expect(res.body.message).contain('User created');
        });
    });
    describe('NEGATIVE', () => {
        describe('REGISTER WITH EXISTING EMAIL', () => {
            before(async () => {
                res = await register({...signupBody, email: process.env.EMAIL}); 
            })
            it('Verify response status code', () => {
                expect(res.status).to.equal(409);
            });
            it('Verify response message', () => {
                expect(res.body.message).contain('e-mail exists');
            });
        });
        describe('REGISTER WITHOUT FIRST NAME', () => {
            before(async () => {
                res = await register({...signupBody, firstName: '', email: 'new@mail.com'}); 
            })
            it('Verify response status code', () => {
                expect(res.status).to.equal(404);
            });
            it('Verify response message', () => {
                expect(res.body.message).contain('not created');
            });
        });
        describe('REGISTER WITHOUT LAST NAME', () => {
            before(async () => {
                res = await register({...signupBody, lastName: '', email: 'new@mail.com'}); 
            })
            it('Verify response status code', () => {
                expect(res.status).to.equal(404);
            });
            it('Verify response message', () => {
                expect(res.body.message).contain('not created');
            });
        });
        describe('REGISTER WITHOUT EMAIL', () => {
            before(async () => {
                res = await register({...signupBody, email: ''}); 
            })
            it('Verify response status code', () => {
                expect(res.status).to.equal(404);
            });
            it('Verify response message', () => {
                expect(res.body.message).contain('not created');
            });
        });
        describe('REGISTER WITHOUT PASSWORD', () => {
            before(async () => {
                res = await register({...signupBody, password: ''}); 
            })
            it('Verify response status code', () => {
                expect(res.status).to.equal(400);
            });
            it('Verify response message', () => {
                expect(res.body.message).contain('Wrong password format');
            });
        });
    });
});
