const chance = require('chance').Chance();
import { expect } from 'chai'
// import { client, createClient, deleteClient } from '../../helpers/client.js';
import * as clientHelper from '../../helpers/client'

// const times = 3;
// for (let i = 0; i <= times; i++) {console.log(`Run #${i}`)}
describe('CLIENT CREATE', () => {
    let res, id
    describe('POSITIVE', () => {
        describe('CREATE CLIENT WITH ALL DATA', () => {
            before(async () => {
                res = await clientHelper.createClient(clientHelper.clientData)
                id = res.body.payload
                // console.log(id);
                // console.log(res.request._data);
            })
            after(async () => {
                await clientHelper.deleteClient(id)
            })
            it('verify status code after client creating', () => {
                expect(res.status).to.equal(200)
            })
            it('verify message after client creating', () => {
                expect(res.body.message).to.equal('Client created')
            })
        })
        describe('CREATE CLIENT WITH REQUIRED DATA: NAME AND PHONE', () => {
            before(async () => {
                res = await clientHelper.createClient({ ...clientHelper.clientData, name: chance.first(), phone: chance.phone(), email: '', description: '' })
                id = res.body.payload
                // console.log(id);
                // console.log(res.request._data);
            })
            after(async () => {
                await clientHelper.deleteClient(id)
            })
            it('verify status code after client creating', () => {
                expect(res.status).to.equal(200)
            })
            it('verify message after client creating', () => {
                expect(res.body.message).to.equal('Client created')
            })
        })
    })
    describe('NEGATIVE', () => {
        describe('CREATE CLIENT WITH OUT REQUIRED DATA: NAME', () => {
            before(async () => {
                res = await clientHelper.createClient({ ...clientHelper.clientData, name: '' })
            })
            it('verify status code after attempting to create client', () => {
                // console.log(res.body);
                // console.log(res.status);
                expect(res.status).to.equal(400)
            })
            it('verify message after attempting to create client', () => {
                expect(res.body.message).to.equal('Client create error')
            })
        })
        describe.skip('CREATE CLIENT WITH OUT REQUIRED DATA: PHONE', () => {
            before(async () => {
                res = await clientHelper.createClient({ ...clientHelper.clientData, phone: '' })
            })
            it('verify status code after attempting to create client', () => {
                // console.log(res.body);
                // console.log(res.status);
                expect(res.status).to.equal(400)
            })
            it('verify message after attempting to create client', () => {
                expect(res.body.message).to.equal('Client create error')
            })
        })
    })
})


describe('Create client through api', () => {
    let id, res, resGet, resDel;
    before(async () => {
        res = await clientHelper.createClientAuth(clientHelper.clientData)
        // console.log(res.body)
        id = res.body.payload
    });
    
    after(async () => {
        resDel = await clientHelper.deleteClientAuth(id);

        resGet = await clientHelper.getClient(id);
        // console.log(resGet.body);
    });
    
    it('verify status code', async () => {
            expect(res.status).to.equal(200);
    
    })
    
    it('verify response message', async () => {
            expect(res.body.message).to.equal('Client created');    
    })
});