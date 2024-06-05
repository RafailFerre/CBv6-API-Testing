import colors from 'colors';
import { expect } from 'chai';
import { login } from '../helpers/generalHelper';

describe('AUTHENTICATION', () => {
    let res;
    describe('POSITIVE'.green, () => {
        before(async () => {
            res = await login(process.env.EMAIL, process.env.PASSWORD);
        });
        it('Verify response status when login with valid credentials', () => {
            expect(res.status).to.equal(200);
        });
        it('Verify response message when login with valid credentials', () => {
            expect(res.body.message).to.equal('Auth success');
        });
    });
    describe('NEGATIVE'.red, () => {
        describe('INVALID PASSWORD'.blue, () => {
            before(async () => {
                res = await login(process.env.EMAIL, 'invalid password');
            });
            it('Verify response status when login with invalid password', () => {
                expect(res.status).to.eq(400);
            });
            it('Verify response message when login with invalid password', () => {
                expect(res.body.message).to.equal('Auth failed');
            });
        });
        describe('INVALID EMAIL'.blue, () => {
            before(async () => {
                res = await login('invalid email', process.env.PASSWORD);
            });
            it('Verify response status when login with invalid email', async () => {
                expect(res.status).to.eq(400);
            });
            it('Verify response message when login with invalid email', async () => {
                expect(res.body.message).to.equal('Auth failed');
            });
        });
    });
});
