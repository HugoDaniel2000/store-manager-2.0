import sinon from 'sinon';
import chai from 'chai';

import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../index';
import UsersRepository from '../repositories/implementations/usersRepository';
import { tokenPayload, user, userCreated } from './mocks/usersMock';
import { User } from '../types/users';
import Token from '../helpers/jwt.auth';

chai.use(chaiHttp);

const { expect } = chai;

describe('Update user', async () => {
  let chaiHttpResponse: Response;
  let repositoryStub: sinon.SinonStub;
  let tokenStub: sinon.SinonStub;
  describe('Update user success', async () => {
    beforeEach(async () => {
      repositoryStub = sinon.stub(UsersRepository.prototype, 'update').resolves(user as User);
      tokenStub = sinon.stub(Token, 'validate').returns(tokenPayload);
    });
    afterEach(() => {
      repositoryStub.restore();
      tokenStub.restore();
    });

    it('Allowed user without admin role', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put('/user/1')
        .set('authorization', '123.456.789')
        .send({
          email: 'hugodaniel@gmail.com',
        });
      expect(chaiHttpResponse.status).to.be.eql(200);
      expect(chaiHttpResponse.body).to.be.eql(userCreated);
    });
  });
  describe('Update user falid', async () => {
    beforeEach(async () => {
      repositoryStub = sinon.stub(UsersRepository.prototype, 'update').resolves(user as User);
      tokenStub = sinon.stub(Token, 'validate').returns(tokenPayload);
    });
    afterEach(() => {
      repositoryStub.restore();
      tokenStub.restore();
    });

    it('User not allowed', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put('/user/2')
        .set('authorization', '123.456.789')
        .send({
          email: 'hugodaniel@gmail.com',
        });
      expect(chaiHttpResponse.status).to.be.eql(401);
      expect(chaiHttpResponse.body).to.be.eql({ message: 'You do not have permission to update this user' });
    });

    it('Email invalid format', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put('/user/2')
        .set('authorization', '123.456.789')
        .send({
          email: 'hugodanielgmail.com',
        });
      expect(chaiHttpResponse.status).to.be.eql(400);
      expect(chaiHttpResponse.body).to.be.eql({ message: 'Email must have a valid format' });
    });

    it('Email invalid format', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .put('/user/2')
        .send({
          email: 'hugodaniel@gmail.com',
        });
      expect(chaiHttpResponse.status).to.be.eql(401);
      expect(chaiHttpResponse.body).to.be.eql({ message: 'Token not found' });
    });
  });
});
