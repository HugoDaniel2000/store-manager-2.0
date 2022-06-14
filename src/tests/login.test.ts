import sinon from 'sinon';
import chai from 'chai';

import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../index';
import UsersRepository from '../repositories/implementations/usersRepository';
import { user } from './mocks/usersMock';
import { User } from '../types/users';
import Bcrypt from '../helpers/bcrypt';

// import Users from '../database/models/users.model';
// import Token from '../helpers/jwt.auth';
// import Encrypt from '../helpers/encrypt';
// import { users } from './mocks/users';

chai.use(chaiHttp);

const { expect } = chai;

describe('rota login/', async () => {
  let chaiHttpResponse: Response;
  let repositoryStub: sinon.SinonStub;

  describe('Realiza login', async () => {
    describe('login success', async () => {
      // const tokenValidate = 'abc.def.ghi';
      beforeEach(async () => {
        repositoryStub = sinon.stub(UsersRepository.prototype, 'findByEmail').resolves(user as User);
        sinon.stub(Bcrypt, 'validate').resolves(true);
      });
      afterEach(() => {
        repositoryStub.restore();
        (Bcrypt.validate as sinon.SinonStub).restore();
      });
      it('deve retorna status 200', async () => {
        chaiHttpResponse = await chai
          .request(app).post('/login')
          .send({
            email: 'hugodaniel@gmail.com',
            password: '123456789',
          });

        expect(chaiHttpResponse.status).to.be.eql(200);
        expect(chaiHttpResponse.body).to.be.an('object');
        expect(chaiHttpResponse.body).to.have.property('user');
        expect(chaiHttpResponse.body).to.have.property('token');
        expect(chaiHttpResponse.body.user).to.be.an('object');
        expect(chaiHttpResponse.body.user).to.have.property('id');
        expect(chaiHttpResponse.body.user).to.have.property('firstName');
        expect(chaiHttpResponse.body.user).to.have.property('lastName');
        expect(chaiHttpResponse.body.user).to.have.property('email');
      });
    });
  });
});
