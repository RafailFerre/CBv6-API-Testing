import request from 'supertest';
import colors from 'colors';
import { expect } from 'chai';
import 'dotenv/config';

describe('AUTHENTICATION', () => {
    describe('POSITIVE'.green, () => {
        let res;
        before(async () => {
            res = await request(process.env.BASE_URL).post('user/login').send({
                email: process.env.EMAIL,
                password: process.env.PASSWORD,
            });
        });
        it('Verify response status when login with valid credentials', () => {
            expect(res.status).to.equal(200);
        });
        it('Verify response message when login with valid credentials', () => {
            expect(res.body.message).to.equal('Auth success');
        });
    });
    describe('NEGATIVE'.red, () => {
        let res;
        before(async () => {
            res = await request(process.env.BASE_URL).post('user/login').send({
                email: process.env.EMAIL,
                password: 'invalid password',
            });
        });
        it('Verify response status when login with invalid password', () => {
            expect(res.status).to.eq(400);
        });
        it('Verify response message when login with invalid password', () => {
            expect(res.body.message).to.equal('Auth failed');
        });

        it('Verify response status when login with invalid email', async () => {
            const res = await request(process.env.BASE_URL)
                .post('user/login')
                .send({
                    email: 'invalid email',
                    password: process.env.EMAIL,
                });
            expect(res.status).to.eq(400);
        });
        it('Verify response message when login with invalid email', async () => {
            const res = await request(process.env.BASE_URL)
                .post('user/login')
                .send({
                    email: 'invalid email',
                    password: process.env.EMAIL,
                });
            expect(res.body.message).to.equal('Auth failed');
        });
    });
});
