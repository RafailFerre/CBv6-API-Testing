import * as user from '../../helpers/user'
import { expect } from 'chai'

describe('DELETE USER', () => {
  let resLogin, resGet, resDelete, userId

  describe('POSITIVE - DELETE USER BY ID', () => {
    before(async () => {
      await user.signup(user.newUser)

      resLogin = await user.login(user.newUser.email, user.newUser.password)
      userId = resLogin.body.payload.userId

      resDelete = await user.deleteUser(userId)
      // console.log(resDelete.body);

      resGet = await user.getUser(userId) // get user after deletion
      // console.log(resGet.body);
    })

    it('verify status code', async () => {
      expect(resDelete.status).to.eq(200)
    })

    it('verify response message', async () => {
      expect(resDelete.body.message).to.eq('User deleted')
    })

    it('verify user does not exist after deletion', async () => {
      expect(resGet.body.message).to.eq('No User for provided id')
    })

  })
  describe('NEGATIVE - DELETE USER WITH INVALID ID', () => {
    before(async () => {
      await user.signup(user.newUser)

      resLogin = await user.login(user.newUser.email, user.newUser.password)
      userId = resLogin.body.payload.userId
      const invalidUserId = userId + '1' // change invalid id with valid id

      resDelete = await user.deleteUser(invalidUserId)
      // console.log(resDelete.body);
    })

    after(async () => {
        await user.deleteUser(userId)
      })

    it('verify status code', async () => {
      expect(resDelete.status).to.eq(400)
    })

    it('verify response message', async () => {
      expect(resDelete.body.message).to.eq('User delete error')
    })

  })
  describe('NEGATIVE - DELETE USER WITHOUT AUTHORIZATION', () => {
    before(async () => {
      await user.signup(user.newUser)

      resLogin = await user.login(user.newUser.email, user.newUser.password)
      userId = resLogin.body.payload.userId

      resDelete = await user.deleteUserNoAuth(userId)
      // console.log(resDelete.body);
    })

    after(async () => {
      await user.deleteUser(userId)
    })

    it('verify status code', async () => {
      expect(resDelete.status).to.eq(400)
    })

    it('verify response message', async () => {
      expect(resDelete.body.message).to.eq('Auth failed')
    })
  })
  describe('NEGATIVE - DELETE USER AFTER DELETION', () => {
    before(async () => {
      await user.signup(user.newUser)

      resLogin = await user.login(user.newUser.email, user.newUser.password)
      userId = resLogin.body.payload.userId

      resDelete = await user.deleteUser(userId)

      resDelete = await user.deleteUser(userId)
      // console.log(resDelete.body);
    })

    after(async () => {
      await user.deleteUser(userId)
    })

    it('verify status code', async () => {
      expect(resDelete.status).to.eq(400)
    })

    it('verify response message', async () => {
      expect(resDelete.body.message).to.eq('User not found')
    })
  })
})
