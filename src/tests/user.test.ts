import sinon from 'sinon';
import chai from 'chai';

import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../index';
import UsersRepository from '../repositories/implementations/usersRepository';
import { user, userCreated } from './mocks/usersMock';
import { User } from '../types/users';

chai.use(chaiHttp);

const { expect } = chai;

describe('User', async () => {
  let chaiHttpResponse: Response;
  let repositoryStub: sinon.SinonStub;
  describe('Create user success', async () => {
    let repositoryStub2: sinon.SinonStub;

    beforeEach(async () => {
      repositoryStub = sinon.stub(UsersRepository.prototype, 'create').resolves(user as User);
      repositoryStub2 = sinon.stub(UsersRepository.prototype, 'findByEmail').resolves(null);
    });
    afterEach(() => {
      repositoryStub.restore();
      repositoryStub2.restore();
    });
    it('return status 201', async () => {
      chaiHttpResponse = await chai
        .request(app).post('/register')
        .send({
          first_name: 'Hugo Daniel',
          last_name: 'Caxias das Virgens',
          email: 'hugodaniel@gmail.com',
          password: '123456789',
        });
      expect(chaiHttpResponse.status).to.be.eql(201);
      expect(chaiHttpResponse.body).to.be.eql(userCreated);
    });
  });

  describe('Create user falid', async () => {
    let repositoryStub2: sinon.SinonStub;

    beforeEach(async () => {
      repositoryStub = sinon.stub(UsersRepository.prototype, 'create').resolves(user as User);
      repositoryStub2 = sinon.stub(UsersRepository.prototype, 'findByEmail').resolves(user);
    });
    afterEach(() => {
      repositoryStub.restore();
      repositoryStub2.restore();
    });
    it('return  status 409', async () => {
      chaiHttpResponse = await chai
        .request(app).post('/register')
        .send({
          first_name: 'Hugo Daniel',
          last_name: 'Caxias das Virgens',
          email: 'hugodaniel@gmail.com',
          password: '123456789',
        });
      expect(chaiHttpResponse.status).to.be.eql(409);
      expect(chaiHttpResponse.body).to.be.eql({ message: 'Email is already being used' });
    });
  });
});
