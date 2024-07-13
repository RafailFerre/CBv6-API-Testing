const chance = require('chance').Chance()
import { expect } from 'chai'
import * as user from '../../helpers/user'

describe('UPDATE USER', () => {
  let userId, resUpdate, resGet, resLogin, resGetUpdate
  describe('POSITIVE', () => {
    before(async () => {
      await user.signup(user.newUser)

      resLogin = await user.login(user.newUser.email, user.newUser.password)
      userId = resLogin.body.payload.userId

      resGet = await user.getUser(userId)
      // console.log(resGet.body)

      resUpdate = await user.updateUser(userId, {...user.newUser, firstName: 'NEW', lastName: 'NAME',})
      // console.log(resUpdate.body)

      resGetUpdate = await user.getUser(userId)
      // console.log(resGetUpdate.body)
    })

    after(async () => {
      await user.deleteUser(userId)
    })

    it('verify status code after user updating', () => {
      expect(resUpdate.status).to.equal(200)
    })

    it('verify message after user updating', () => {
      expect(resUpdate.body.message).to.equal('User updated')
    })

    it('verify firstName after user updating', () => {
      expect(resGetUpdate.body.payload.firstName).to.not.equal(resGet.body.payload.firstName)
    })

    it('verify lastName after user updating', () => {
      expect(resGetUpdate.body.payload.lastName).to.not.equal(resGet.body.payload.lastName)
    })
  })

  describe('NEGATIVE - UPDATE USER WITH INVALID DATA: FIRST NAME', () => {
    before(async () => {
      await user.signup(user.newUser)

      resLogin = await user.login(user.newUser.email, user.newUser.password)
      userId = resLogin.body.payload.userId

      resGet = await user.getUser(userId)
      // console.log(resGet.body)

      resUpdate = await user.updateUser(userId, {...user.newUser, firstName: ''})
      // console.log(resUpdate.body)
    })

    after(async () => {
      await user.deleteUser(userId)
    })

    it('verify status code after user updating', () => {
      expect(resUpdate.status).to.equal(400)
    })

    it('verify message after user updating', () => {
      expect(resUpdate.body.message).to.equal('User update error')
    })

    it('verify name after user updating with out firstName', () => {
      expect(resUpdate.body.payload.name).to.equal('ValidationError')
    })
  })

  describe('NEGATIVE - UPDATE USER WITH INVALID DATA: LAST NAME', () => {
    before(async () => {
      await user.signup(user.newUser)

      resLogin = await user.login(user.newUser.email, user.newUser.password)
      userId = resLogin.body.payload.userId

      resGet = await user.getUser(userId)
      // console.log(resGet.body)

      resUpdate = await user.updateUser(userId, {...user.newUser, lastName: ''})
      // console.log(resUpdate.body)
    })

    after(async () => {
      await user.deleteUser(userId)
    })

    it('verify status code after user updating', () => {
      expect(resUpdate.status).to.equal(400)
    })

    it('verify message after user updating', () => {
      expect(resUpdate.body.message).to.equal('User update error')
    })

    it('verify name after user updating with out lastName', () => {
      expect(resUpdate.body.payload.name).to.equal('ValidationError')
    })
  })
})
