import { expect } from 'chai';
import { client, createClient, deleteClient, getClient } from '../../helpers/client.js';

describe('DELETE CLIENT', () => {
    let res, resDelete, resGet, resGetDelete;
    before(async () => {
        res = await createClient(client);
        const id = res.body.payload;
        // console.log(id);

        resGet = await getClient(id);
        // console.log(resGet.body);
        
        resDelete = await deleteClient(id);
        // console.log(resDel.body);

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