import sinon from 'sinon';
import chai from 'chai';

import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { Users } from '@prisma/client';
import { app } from '../../../index';
import UsersRepository from '../../../repositories/implementations/usersRepository';
import { user, userCreated } from './mocks/usersMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Create user', async () => {
  let chaiHttpResponse: Response;
  let repositoryStub: sinon.SinonStub;
  let repositoryStub2: sinon.SinonStub;
  describe('Create user success', async () => {
    beforeEach(async () => {
      repositoryStub = sinon.stub(UsersRepository.prototype, 'create').resolves(user as Users);
      repositoryStub2 = sinon.stub(UsersRepository.prototype, 'findByEmail').resolves(null);
    });
    afterEach(() => {
      repositoryStub.restore();
      repositoryStub2.restore();
    });
    it('return status 201', async () => {
      chaiHttpResponse = await chai
        .request(app).post('/user')
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
    beforeEach(async () => {
      repositoryStub = sinon.stub(UsersRepository.prototype, 'create').resolves(user as Users);
      repositoryStub2 = sinon.stub(UsersRepository.prototype, 'findByEmail').resolves(user as Users);
    });
    afterEach(() => {
      repositoryStub.restore();
      repositoryStub2.restore();
    });
    it('Email is already being used', async () => {
      chaiHttpResponse = await chai
        .request(app).post('/user')
        .send({
          first_name: 'Hugo Daniel',
          last_name: 'Caxias das Virgens',
          email: 'hugodaniel@gmail.com',
          password: '123456789',
        });
      expect(chaiHttpResponse.status).to.be.eql(409);
      expect(chaiHttpResponse.body).to.be.eql({ message: 'Email is already being used' });
    });
    it('Password less than 6 characters', async () => {
      chaiHttpResponse = await chai
        .request(app).post('/user')
        .send({
          first_name: 'Hugo Daniel',
          last_name: 'Caxias das Virgens',
          email: 'hugodaniel@gmail.com',
          password: '1234',
        });
      expect(chaiHttpResponse.status).to.be.eql(400);
      expect(chaiHttpResponse.body).to.be.eql({ message: 'Password must be at least 6 characters long' });
    });
    it('Email invalid format', async () => {
      chaiHttpResponse = await chai
        .request(app).post('/user')
        .send({
          first_name: 'Hugo Daniel',
          last_name: 'Caxias das Virgens',
          email: 'hugodanielgmail.com',
          password: '1234',
        });
      expect(chaiHttpResponse.status).to.be.eql(400);
      expect(chaiHttpResponse.body).to.be.eql({ message: 'Email must have a valid format' });
    });
    it('Field last_name empty', async () => {
      chaiHttpResponse = await chai
        .request(app).post('/user')
        .send({
          first_name: 'Hugo Daniel',
          email: 'hugodaniel@gmail.com',
          password: '1234',
        });
      expect(chaiHttpResponse.status).to.be.eql(400);
      expect(chaiHttpResponse.body).to.be.eql({ message: 'All fields must be filled' });
    });
    it('first_name field less than 3 characters', async () => {
      chaiHttpResponse = await chai
        .request(app).post('/user')
        .send({
          first_name: 'Hu',
          last_name: 'Caxias das Virgens',
          email: 'hugodaniel@gmail.com',
          password: '123456789',
        });
      expect(chaiHttpResponse.status).to.be.eql(400);
      expect(chaiHttpResponse.body).to.be.eql({ message: 'First Name must be at least 3 characters long' });
    });
  });
});
