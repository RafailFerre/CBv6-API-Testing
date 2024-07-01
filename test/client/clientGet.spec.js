import { expect } from 'chai';
import { client, createClient, getClient, searchClient } from '../../helpers/client.js';
import request from 'supertest';

describe('GET CLIENT', () => {
    let res, resGet, resGetAll;
    before(async () => {
        res = await createClient(client);
        const id = res.body.payload;

        resGet = await getClient(id);
        //console.log(resGet.body.payload._id);

        resGetAll = await searchClient();
        //console.log(resGetAll.body.message);

        //console.log(resGetAll.body.payload.items[0]);
    })

    it('verify status code when trying to get client', () => {
        expect(resGet.status).to.equal(200);
    });
    it('verify message when trying to get client', () => {
        expect(resGet.body.message).to.equal('Get Client by id ok');
    });
    it('verify id when trying to get client', () => {
       expect(resGetAll.body.payload.items[0]._id).to.equal(resGet.body.payload._id);
    });
});