import { expect } from 'chai'
import { client, createClient, deleteClient, getClient, searchClient } from '../../helpers/client.js'
import request from 'supertest'

describe('GET CLIENT', () => {
    let id, res, resGet, resGetAll, resDelete
    before(async () => {
        res = await createClient(client)
        id = res.body.payload

        resGet = await getClient(id)
        //console.log(resGet.body.payload._id);

        resGetAll = await searchClient() // get all the clients
        //console.log(resGetAll.body.payload.items.length);
        //console.log(resGetAll.body.message);
        //console.log(resGetAll.body.payload.items);
    })
    after(async () => {
        resDelete = await deleteClient(id)
        //console.log(resDelete.body);
    })

    it('verify status code when trying to get client', () => {
        expect(resGet.status).to.equal(200)
    })
    it('verify message when trying to get client', () => {
        expect(resGet.body.message).to.equal('Get Client by id ok')
    })
    it('verify total clients when trying to get clients', () => {
        expect(resGetAll.body.message).to.equal('ClientSearch ok')
    })
    it('verify id when trying to get client', () => {
        expect(resGetAll.body.payload.items[0]._id).to.equal(resGet.body.payload._id)
    })
})
