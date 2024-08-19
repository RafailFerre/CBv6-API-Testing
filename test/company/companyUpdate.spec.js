import { expect } from 'chai';
import * as user from '../../helpers/user';
import * as company from '../../helpers/company';

describe('UPDATE COMPANY', () => {
  let resUpdateCompany, resGetCompany, resGetUpdatedCompany;
  before(async () => {
    await user.signup(user.newUser);
    resGetCompany = await company.getCompany(await company.companyId());
  });

  describe('POSITIVE - Update company', () => {
    before(async () => {
      resUpdateCompany = await company.updateCompany(await company.companyId(), company.companyUpdateData);
      resGetUpdatedCompany = await company.getCompany(await company.companyId());
    });

    it('verify status code', async () => {
      expect(resUpdateCompany.status).to.eq(200);
    });

    it('verify response message', async () => {
      expect(resUpdateCompany.body.message).to.eq('Company Account updated');
    });

    it('verify company new name not equal to previous', async () => {
      expect(resGetUpdatedCompany.body.payload.companyName).not.to.eq(resGetCompany.body.payload.companyName);
    });

    it('verify company new email not equal to previous', async () => {
      expect(resGetUpdatedCompany.body.payload.email).not.to.eq(resGetCompany.body.payload.email);
    });

    it('verify company name to equal company new name', async () => {
      expect(resGetUpdatedCompany.body.payload.companyName).to.eq(company.companyUpdateData.companyName);
    });

    it('verify company email to equal company new email', async () => {
      expect(resGetUpdatedCompany.body.payload.email).to.eq(company.companyUpdateData.email);
    });

  });

  describe('NEGATIVE', () => {
    describe('NEGATIVE - Update company with empty company name', () => {
      before(async () => {
        resUpdateCompany = await company.updateCompany(await company.companyId(), { ...company.companyUpdateData, companyName: '' });
        resGetUpdatedCompany = await company.getCompany(await company.companyId());
      });

      it('verify status code', async () => {
        expect(resUpdateCompany.status).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resUpdateCompany.body.message).to.eq('Company Account update error');
      });

      it('verify company name not to equal empty', async () => {
        expect(resGetUpdatedCompany.body.payload.companyName).not.to.eq('');
      });

    });

    describe.skip('NEGATIVE - Update company with empty company email', () => {
      before(async () => {
        resUpdateCompany = await company.updateCompany(await company.companyId(), { ...company.companyUpdateData, email: '' });
        resGetUpdatedCompany = await company.getCompany(await company.companyId());
      });

      it('verify status code', async () => {
        expect(resUpdateCompany.status).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resUpdateCompany.body.message).to.eq('Company Account update error');
      });

      it('verify company email not to equal empty', async () => {
        expect(resGetUpdatedCompany.body.payload.email).not.to.eq('');
      });

    });

    describe('NEGATIVE - Update company with invalid company id', () => {
      before(async () => {
        const invalidCompanyId = (await company.companyId()) + '1';
        resUpdateCompany = await company.updateCompany(invalidCompanyId, company.companyUpdateData);
      });

      it('verify status code', async () => {
        expect(resUpdateCompany.status).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resUpdateCompany.body.message).to.eq('Company Account update error');
      });

    });

    describe('NEGATIVE - Update company without company id', () => {
      before(async () => {
        resUpdateCompany = await company.updateCompany('', company.companyUpdateData);
      });

      it('verify status code', async () => {
        expect(resUpdateCompany.status).to.eq(404);
      });

      it('verify response message', async () => {
        expect(resUpdateCompany.body.message).to.eq('API not found');
      });

    });

    describe('NEGATIVE - Update company without authorization', () => {
      before(async () => {
        resUpdateCompany = await company.updateCompany(await company.companyId(), company.companyUpdateData, 'NO_TOKEN');
      });

      it('verify status code', async () => {
        expect(resUpdateCompany.status).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resUpdateCompany.body.message).to.eq('Auth failed');
      });

    });
  });
});
