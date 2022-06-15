import sinon from 'sinon';
import chai from 'chai';

import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { Products } from '@prisma/client';
import { app } from '../../../index';
import ProductsRepository from '../../../repositories/implementations/productsRepository';
import { product } from './mocks/productsMocks';
import Token from '../../../helpers/jwt.auth';
import { tokenPayload, tokenPayloadAdmin } from '../../users/tests/mocks/usersMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Products', async () => {
  let chaiHttpResponse: Response;
  let repositoryStub: sinon.SinonStub;
  let tokenStub: sinon.SinonStub;

  describe('Create products', async () => {
    describe('create products success', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(ProductsRepository.prototype, 'create').resolves(product as Products);
        tokenStub = sinon.stub(Token, 'validate').returns(tokenPayloadAdmin);
      });
      afterEach(() => {
        repositoryStub.restore();
        tokenStub.restore();
      });
      it('return status 200', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/products')
          .set('authorization', '123.456.789')
          .send({
            name: 'Vapor Max',
            quantity: 10,
          });
        expect(chaiHttpResponse.status).to.be.eql(201);
        expect(chaiHttpResponse.body).to.be.eql(product);
      });
    });

    describe('Create products falid', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(ProductsRepository.prototype, 'create').resolves(product as Products);
        tokenStub = sinon.stub(Token, 'validate').returns(tokenPayload);
      });
      afterEach(() => {
        repositoryStub.restore();
        tokenStub.restore();
      });
      it('return status 401', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/products')
          .set('authorization', '123.456.789')
          .send({
            name: 'Vapor Max',
            quantity: 10,
          });

        expect(chaiHttpResponse.status).to.be.eql(401);
        expect(chaiHttpResponse.body).to.be.eql({ message: 'You do not have permission to create products' });
      });
    });
  });
});
