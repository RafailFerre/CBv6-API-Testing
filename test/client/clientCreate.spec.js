import { expect } from 'chai';
import { client, createClient, deleteClient } from '../../helpers/client.js';

// const times = 3;
// for (let i = 0; i <= times; i++) {console.log(`Run #${i}`)}
describe('CLIENT CREATE', () => {
    let res, resDel, id;
    describe('POSITIVE', () => {
        before(async () => {
            res = await createClient(client);
            id = res.body.payload;
            //console.log(id);
        });
        after(async() => {
            resDel = await deleteClient(id);
            //console.log(resDel.body);
        });
        it('verify status code after client creating', () => {
            expect(res.status).to.equal(200);
        });
        it('verify message after client creating', () => {
            expect(res.body.message).to.equal('Client created');
        });
    });
    describe('NEGATIVE', () => {
        describe('WITH OUT NAME', () => {
            before(async () => {
                res = await createClient({ ...client, name: '' });
            });
            it('verify status code after attempting to create client', () => {
                // console.log(res.body);
                // console.log(res.status);
                expect(res.status).to.equal(400);
            });
            it('verify message after attempting to create client', () => {
                expect(res.body.message).to.equal('Client create error');
            });
        });
        describe.skip('WITH OUT PHONE', () => {
            before(async () => {
                res = await createClient({ ...client, phone: '' });
            });
            it('verify status code after attempting to create client', () => {
                // console.log(res.body);
                // console.log(res.status);
                expect(res.status).to.equal(400);
            });
            it('verify message after attempting to create client', () => {
                expect(res.body.message).to.equal('Client create error');
            });
        });
    });
});
