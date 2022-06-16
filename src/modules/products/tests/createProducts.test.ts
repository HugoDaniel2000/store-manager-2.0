import sinon from 'sinon';
import chai from 'chai';

import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { Products } from '@prisma/client';
import { app } from '../../../index';
import ProductsRepository from '../../../repositories/implementations/productsRepository';
import { createProducts, product, products } from './mocks/productsMocks';
import Token from '../../../helpers/jwt.auth';
import { tokenPayload, tokenPayloadAdmin } from '../../users/tests/mocks/usersMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Products', async () => {
  let chaiHttpResponse: Response;
  let repositoryStub: sinon.SinonStub;
  let repositoryStub2: sinon.SinonStub;
  let tokenStub: sinon.SinonStub;

  describe('Create products', async () => {
    describe('create products success', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(ProductsRepository.prototype, 'create').resolves(products[0] as Products);
        repositoryStub2 = sinon.stub(ProductsRepository.prototype, 'findByName').resolves(null);
        tokenStub = sinon.stub(Token, 'validate').returns(tokenPayloadAdmin);
      });
      afterEach(() => {
        repositoryStub.restore();
        repositoryStub2.restore();
        tokenStub.restore();
      });
      it('return status 200', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/products')
          .set('authorization', '123.456.789')
          .send({
            products: [createProducts[0]],
          });
        expect(chaiHttpResponse.status).to.be.eql(201);
        expect(chaiHttpResponse.body).to.be.eql([products[0]]);
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
      it('User not allowed', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/products')
          .set('authorization', '123.456.789')
          .send({
            products: [{
              name: 'Vapor Max',
              quantity: 10,
            }],
          });

        expect(chaiHttpResponse.status).to.be.eql(401);
        expect(chaiHttpResponse.body).to.be.eql({ message: 'You do not have permission to create products' });
      });
    });

    describe('Create products falid', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(ProductsRepository.prototype, 'create').resolves(product as Products);
        repositoryStub2 = sinon.stub(ProductsRepository.prototype, 'findByName').resolves(product);
        tokenStub = sinon.stub(Token, 'validate').returns(tokenPayloadAdmin);
      });
      afterEach(() => {
        repositoryStub.restore();
        repositoryStub2.restore();
        tokenStub.restore();
      });
      it('Product already exists', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/products')
          .set('authorization', '123.456.789')
          .send({
            products: [{
              name: 'Vapor Max',
              quantity: 10,
            }],
          });

        expect(chaiHttpResponse.status).to.be.eql(409);
        expect(chaiHttpResponse.body).to.be.eql({ message: 'Product already exists' });
      });
    });
  });
});
