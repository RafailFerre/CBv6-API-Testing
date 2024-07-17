import { expect } from 'chai'
import { clientData, createClient, getClient, updateClient, deleteClient } from '../../helpers/client.js'

describe('UPDATE CLIENT', () => {
    let id, res, resUpdate, resGet, resGetUpdate
    before(async () => {
        res = await createClient(clientData)
        id = res.body.payload

        resGet = await getClient(id)
        // console.log(resGet.body);

        resUpdate = await updateClient(id, {
            ...clientData,
            name: 'new name',
            phone: 'new phone',
            email: 'new email',
            description: 'new description',
        })
        // console.log(resUpdate.body);
   
        resGetUpdate = await getClient(id)
        // console.log(resGetUpdate.body);
    })

    after(async () => {
        await deleteClient(id)
    })

    it('verify status code after client updating', () => {
        expect(resUpdate.status).to.equal(200)
    })
    it('verify message after client updating', () => {
        expect(resUpdate.body.message).to.equal('Client updated')
    })
    it('verify name after client updating', () => {
        expect(resGetUpdate.body.payload.name).to.not.equal(resGet.body.payload.name)
    })
    it('verify phone after client updating', () => {
        expect(resGetUpdate.body.payload.phone).to.not.equal(resGet.body.payload.phone)
    })
    it('verify email after client updating', () => {
        expect(resGetUpdate.body.payload.email).to.not.equal(resGet.body.payload.email)
    })
})
