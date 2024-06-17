import { expect } from 'chai';
import { emailSearch, emailVerify, login, signup } from '../helpers/generalHelper';
import { newUser } from '../helpers/user';
import request from 'supertest';

describe('VERIFY EMAIL TRIM ON SIGNUP', () => {
    let res;
    const newEmail = '  user' + Date.now() + '@mail.com  ';
    const trimedEmail = newEmail.trim();

    before(async () => {
        await signup({ ...newUser, email: newEmail });

        res = await login(trimedEmail, process.env.PASSWORD);
    });
    it('verify response status code', () => {
        expect(res.status).to.equal(200);
    });
    it('verify response message', () => {
        expect(res.body.message).to.equal('Auth success');
    });
    it('verify trimed email equal saved email from database', () => {
        expect(trimedEmail).to.eq(res.body.payload.user.email);
    });
});

describe('VERIFY USER', () => {
    let res, resSignup, resLogin, resSearch, confirmEmail;
    const newEmail = 'confirmEmail' + Date.now() + '@mail.com';

    describe('SIGNUP', () => {
        before(async () => {
            // signup call
            resSignup = await signup({ ...newUser, email: newEmail });
        });
        it('verify response status code', () => {
            expect(resSignup.status).to.equal(201);
            //console.log(resSignup.request._data);
        });
    });
    describe('LOGIN BEFORE EMAIL VERIFY', () => {
        before(async () => {
            // login call before email confirmation
            resLogin = await login(newEmail, process.env.PASSWORD);
        });
        it('verify status and role before email confirmation', () => {
            expect(resLogin.status).to.equal(200);
            expect(resLogin.body.payload.user.roles).to.include('new');
            // console.log(resLogin.body.payload.user.roles, 'Login before email confirmation');
            // console.log(resLogin.body.payload.acl, 'New user rights');
        });
    });
    describe('EMAIL SEARCH', () => {
        before(async () => {
            // get response after email search
            resSearch = await emailSearch(newEmail);
        });
        it('verify response status', () => {
            expect(resSearch.status).to.equal(200);
        });
    });
    describe('EMAIL VERIFY', () => {
        before(async () => {
            // extract endpoint from response when made email search
            const endPoint = resSearch.body.payload.items[0].message.split('\n')[4].split('https://clientbase.us')[1];
            // confirm email
            confirmEmail = await emailVerify(endPoint);
        });
        it('verify response status and message', () => {
            expect(confirmEmail.status).to.equal(200);
            expect(confirmEmail.body.message).to.equal('Email confirmed. Success');
            // console.log(confirmEmail.status);
            // console.log(confirmEmail.body);
        });
    });

    describe('LOGIN AFTER EMAIL CONFIRMATION', () => {
        before(async () => {
            res = await login(newEmail, process.env.PASSWORD);
        });
        it('verify role after email confirmation', () => {
            expect(res.body.payload.user.roles).to.include('verified');
            // console.log(res.body.payload.user.roles, 'Login after email confirmation');
            // console.log(res.body.payload.acl, 'Verified user rights');
        });
    });
});
