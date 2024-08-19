import { expect } from 'chai';
import * as user from '../../helpers/user';
import * as company from '../../helpers/company';


describe('GET COMPANY BY ID', () => {
  let resGetUser, resGetCompany, companyEmail, companyName, companyId;
  before(async () => {
    await user.signup(user.newUser)
    resGetUser = await user.getUser(await user.userId());
    companyId = await company.companyId();
    // console.log(resGetUser.body, '+++++++++++++++++++++++++++++++++');
    // console.log(companyId, '*******************************');

    companyName = resGetUser.body.payload.companyAccount.companyName;
    companyEmail = resGetUser.body.payload.companyAccount.email;
  })

  describe('POSITIVE - Get company by id', () => {
    before(async () => {
      resGetCompany = await company.getCompany(companyId);
      // console.log(resGetCompany.body, '----------------------------');
    });

    it('verify status code', async () => {
      expect(resGetCompany.status).to.eq(200);
    });

    it('verify response message', async () => {
      expect(resGetCompany.body.message).to.eq('Company Account get by id OK');
    });

    it('verify company name', async () => {
      expect(resGetCompany.body.payload.companyName).to.eq(companyName);
    });

    it('verify company email', async () => {
      expect(resGetCompany.body.payload.email).to.eq(companyEmail);
    });
  });

  describe('NEGATIVE', () => {
    describe('NEGATIVE - Get company with invalid company id', () => {
      before(async () => {
        const invalidCompanyId = await companyId + '1';

        resGetCompany = await company.getCompany(invalidCompanyId);
      });

      it('verify status code', async () => {
        expect(resGetCompany.status).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resGetCompany.body.message).to.eq('Company Account get error');
      });

      it('verify company name', async () => {
        expect(resGetCompany.body.payload.companyName).to.eq(undefined);
      });

      it('verify company email', async () => {
        expect(resGetCompany.body.payload.email).to.eq(undefined);
      });
    });

    describe('NEGATIVE - Get company without company id', () => {
        before(async () => {
          resGetCompany = await company.getCompany('');
        });
  
        it('verify status code', async () => {
          expect(resGetCompany.status).to.eq(400);
        });
  
        it('verify response message', async () => {
          expect(resGetCompany.body.message).to.eq('Permission denied');
        });
  
        it('verify company name', async () => {
          expect(resGetCompany.body.payload.companyName).to.eq(undefined);
        });
  
        it('verify company email', async () => {
          expect(resGetCompany.body.payload.email).to.eq(undefined);
        });
      });

    describe('NEGATIVE - Get company without authorization', () => {
      before(async () => {
        resGetCompany = await company.getCompany(companyId, 'NO_TOKEN');
      });

      it('verify status code', async () => {
        expect(resGetCompany.status).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resGetCompany.body.message).to.eq('Auth failed');
      });

      it('verify company name', async () => {
        expect(resGetCompany.body.payload.companyName).to.eq(undefined);
      });

      it('verify company email', async () => {
        expect(resGetCompany.body.payload.email).to.eq(undefined);
      });
    });
  });
});
