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
  let repositoryStub2: sinon.SinonStub;
  let tokenStub: sinon.SinonStub;

  describe('Update products', async () => {
    describe('Update products success', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(ProductsRepository.prototype, 'update').resolves(product as Products);
        repositoryStub2 = sinon.stub(ProductsRepository.prototype, 'findById').resolves(product);
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
          .put('/products/1')
          .set('authorization', '123.456.789')
          .send({
            name: 'Vapor Max',
          });
        expect(chaiHttpResponse.status).to.be.eql(200);
        expect(chaiHttpResponse.body).to.be.eql(product);
      });
    });

    describe('Update products faild', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(ProductsRepository.prototype, 'update').resolves(product as Products);
        repositoryStub2 = sinon.stub(ProductsRepository.prototype, 'findById').resolves(product);
        tokenStub = sinon.stub(Token, 'validate').returns(tokenPayload);
      });
      afterEach(() => {
        repositoryStub.restore();
        repositoryStub2.restore();
        tokenStub.restore();
      });
      it('User not allowed', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .put('/products/1')
          .set('authorization', '123.456.789')
          .send({
            name: 'Vapor Max',
          });
        expect(chaiHttpResponse.status).to.be.eql(401);
        expect(chaiHttpResponse.body).to.be.eql({ message: 'You do not have permission to update products' });
      });
    });

    describe('Update products faild', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(ProductsRepository.prototype, 'update').resolves(product as Products);
        repositoryStub2 = sinon.stub(ProductsRepository.prototype, 'findById').resolves(null);
        tokenStub = sinon.stub(Token, 'validate').returns(tokenPayloadAdmin);
      });
      afterEach(() => {
        repositoryStub.restore();
        repositoryStub2.restore();
        tokenStub.restore();
      });
      it('Product not found', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .put('/products/1')
          .set('authorization', '123.456.789')
          .send({
            name: 'Vapor Max',
          });
        expect(chaiHttpResponse.status).to.be.eql(404);
        expect(chaiHttpResponse.body).to.be.eql({ message: 'Product not found' });
      });
    });
  });
});
