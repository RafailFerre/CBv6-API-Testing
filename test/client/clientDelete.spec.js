import { expect } from 'chai';
import { clientData, createClient, deleteClient, getClient, searchClient } from '../../helpers/client.js';

describe('DELETE CLIENT', () => {
    let res, resDelete, resGet, resGetDelete;
    before(async () => {
        res = await createClient(clientData);
        const id = res.body.payload; // id created client
        // console.log(id);

        resGet = await getClient(id);
        // console.log(resGet.body);
        
        resDelete = await deleteClient(id);
        // console.log(resDelete.body);

        resGetDelete = await getClient(id);
        // console.log(resGetDelete.body);
    })
    it('verify status code after client deleting', () => {
        expect(resDelete.status).to.equal(200);
    }); 
    it('verify message after client deleting', () => {
        expect(resDelete.body.message).to.equal('Client deleted');
    });
    it('verify status code when trying to get deleted client', () => {
        expect(resGetDelete.status).to.equal(404);
    })
    it('verify message when trying to get deleted client', () => {
        expect(resGetDelete.body.message).to.equal('No client for provided id');
    })
});


describe.skip('DELETE CLIENT BY LAST ID', () => {
    let res, resGetAll;
    before(async () => {
        resGetAll = await searchClient();
        const id = resGetAll.body.payload.items[0]._id; //last id

        res = await deleteClient(id);
        //console.log(res.body);
    });
    it('verify status code after client deleting', () => {
        expect(res.status).to.equal(200);
    });
    it('verify message after client deleting', () => {
        expect(res.body.message).to.equal('Client deleted');
    });
});
