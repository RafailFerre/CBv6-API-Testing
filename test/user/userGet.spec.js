import * as user from '../../helpers/user'
import { expect } from 'chai'

describe('GET USER', () => {
  let resLogin, resGet, userId

  describe('POSITIVE - Get user by id', () => {
    before(async () => {
      await user.signup(user.newUser)

      resLogin = await user.login(user.newUser.email, user.newUser.password)
      userId = resLogin.body.payload.userId

      resGet = await user.getUser(userId)
    })

    after(async () => {
      await user.deleteUser(userId)
    })

    it('verify status code', async () => {
      expect(resGet.status).to.eq(200)
    })

    it('verify response message', async () => {
      expect(resGet.body.message).to.eq('User found')
    })

    it('verify user email', async () => {
      expect(resGet.body.payload.email).to.eq(user.newUser.email)
    })

    it('verify user name', async () => {
      expect(resGet.body.payload.name).to.eq(`${user.newUser.firstName} ${user.newUser.lastName}`)
    })

    it('verify user role', async () => {
      expect(resGet.body.payload.roles).to.include('new')
    })
  })
  describe('NEGATIVE - Get user with invalid id', () => {
    before(async () => {
      await user.signup(user.newUser)

      resLogin = await user.login(user.newUser.email, user.newUser.password)
      userId = resLogin.body.payload.userId

      resGet = await user.getUser('')
    })

    after(async () => {
      await user.deleteUser(userId)
    })

    it('verify status code', async () => {
      expect(resGet.status).to.eq(400)
    })

    it('verify response message', async () => {
      expect(resGet.body.message).to.eq('Permission denied')
    })
  })
  describe('NEGATIVE - Get user without authorization', () => {
    before(async () => {
      await user.signup(user.newUser)

      resLogin = await user.login(user.newUser.email, user.newUser.password)
      userId = resLogin.body.payload.userId

      resGet = await user.getUserNoAuth(userId)
    })

    after(async () => {
      await user.deleteUser(userId)
    })

    it('verify status code', async () => {
      expect(resGet.status).to.eq(400)
    })

    it('verify response message', async () => {
      expect(resGet.body.message).to.eq('Auth failed')
    })
  })
})
