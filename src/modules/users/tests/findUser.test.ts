import sinon from 'sinon';
import chai from 'chai';

import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { Users } from '@prisma/client';
import { app } from '../../../index';
import UsersRepository from '../../../repositories/implementations/usersRepository';
import { users } from './mocks/usersMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Find user', async () => {
  let chaiHttpResponse: Response;
  let repositoryStub: sinon.SinonStub;

  describe('Find by id user', async () => {
    describe('Find by id user success', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(UsersRepository.prototype, 'findById').resolves(users[2] as unknown as Users);
      });
      afterEach(() => {
        repositoryStub.restore();
      });
      it('return status 200', async () => {
        chaiHttpResponse = await chai
          .request(app).get('/user/1')
          .send();
        expect(chaiHttpResponse.status).to.be.eql(200);
        expect(chaiHttpResponse.body).to.be.eql(users[2]);
      });
    });

    describe('Find by id user falid', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(UsersRepository.prototype, 'findById').resolves(null);
      });
      afterEach(() => {
        repositoryStub.restore();
      });
      it('return status 200', async () => {
        chaiHttpResponse = await chai
          .request(app).get('/user/1')
          .send();
        expect(chaiHttpResponse.status).to.be.eql(404);
        expect(chaiHttpResponse.body).to.be.eql({ message: 'User not found' });
      });
    });
  });

  describe('Find all users', async () => {
    describe('Find all users success', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(UsersRepository.prototype, 'findAll').resolves(users as unknown as Users[]);
      });
      afterEach(() => {
        repositoryStub.restore();
      });
      it('return status 200', async () => {
        chaiHttpResponse = await chai
          .request(app).get('/user')
          .send();
        expect(chaiHttpResponse.status).to.be.eql(200);
        expect(chaiHttpResponse.body).to.be.eql(users);
      });
    });
  });
});
