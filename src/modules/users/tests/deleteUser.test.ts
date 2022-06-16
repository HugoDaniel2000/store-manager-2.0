import sinon from 'sinon';
import chai from 'chai';

import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../../../index';
import UsersRepository from '../../../repositories/implementations/usersRepository';
import { tokenPayload } from './mocks/usersMock';
import Token from '../../../helpers/jwt.auth';

chai.use(chaiHttp);

const { expect } = chai;

describe('Delete user', async () => {
  let chaiHttpResponse: Response;
  let repositoryStub: sinon.SinonStub;
  let tokenStub: sinon.SinonStub;
  describe('Delete user success', async () => {
    beforeEach(async () => {
      repositoryStub = sinon.stub(UsersRepository.prototype, 'deleteById').resolves();
      tokenStub = sinon.stub(Token, 'validate').returns(tokenPayload);
    });
    afterEach(() => {
      repositoryStub.restore();
      tokenStub.restore();
    });

    it('Allowed user without admin role', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .delete('/user/1')
        .set('authorization', '123.456.789');

      expect(chaiHttpResponse.status).to.be.eql(200);
      expect(chaiHttpResponse.body).to.be.eql({ message: 'User successfully deleted' });
    });
  });
  describe('Update user falid', async () => {
    beforeEach(async () => {
      tokenStub = sinon.stub(Token, 'validate').returns(tokenPayload);
    });
    afterEach(() => {
      repositoryStub.restore();
      tokenStub.restore();
    });

    it('User not allowed', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .delete('/user/2')
        .set('authorization', '123.456.789');

      expect(chaiHttpResponse.status).to.be.eql(401);
      expect(chaiHttpResponse.body).to.be.eql({ message: 'You do not have permission to update or delete this user' });
    });
    it('Token not found', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .delete('/user/2');

      expect(chaiHttpResponse.status).to.be.eql(401);
      expect(chaiHttpResponse.body).to.be.eql({ message: 'Token not found' });
    });
  });
});
