import sinon from 'sinon';
import chai from 'chai';

import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { Products } from '@prisma/client';
import { app } from '../../../index';
import ProductsRepository from '../../../repositories/implementations/productsRepository';
import { product } from './mocks/productsMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Products', async () => {
  let chaiHttpResponse: Response;
  let repositoryStub: sinon.SinonStub;

  describe('Find by id products', async () => {
    describe('Find by id products success', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(ProductsRepository.prototype, 'findById').resolves(product as Products);
      });
      afterEach(() => {
        repositoryStub.restore();
      });
      it('return status 200', async () => {
        chaiHttpResponse = await chai
          .request(app).get('/products/1')
          .send();
        expect(chaiHttpResponse.status).to.be.eql(200);
        expect(chaiHttpResponse.body).to.be.eql(product);
      });
    });

    describe('Find by id products falid', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(ProductsRepository.prototype, 'findById').resolves(null);
      });
      afterEach(() => {
        repositoryStub.restore();
      });
      it('return status 404', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/products/1')
          .send();
        expect(chaiHttpResponse.status).to.be.eql(404);
        expect(chaiHttpResponse.body).to.be.eql({ message: 'Product not found' });
      });
    });
  });

  describe('Find all products', async () => {
    describe('Find all products success', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(ProductsRepository.prototype, 'findAll').resolves(product as unknown as Products[]);
      });
      afterEach(() => {
        repositoryStub.restore();
      });
      it('return status 200', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/products')
          .send();
        expect(chaiHttpResponse.status).to.be.eql(200);
        expect(chaiHttpResponse.body).to.be.eql(product);
      });
    });
  });
});
