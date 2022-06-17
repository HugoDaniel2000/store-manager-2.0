import sinon from 'sinon';
import chai from 'chai';

import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { Products, Sales } from '@prisma/client';
import { app } from '../../../index';
import SalesRepository from '../../../repositories/implementations/salesRepository';
import { sales } from './mocks/SalesMocks';
import Token from '../../../helpers/jwt.auth';
import { tokenPayloadAdmin } from '../../users/tests/mocks/usersMock';
import ProductsRepository from '../../../repositories/implementations/productsRepository';
import { product } from '../../products/tests/mocks/productsMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Sales', async () => {
  let chaiHttpResponse: Response;
  let repositoryStub: sinon.SinonStub;
  let repositoryStub2: sinon.SinonStub;
  let tokenStub: sinon.SinonStub;

  describe('Create sales', async () => {
    describe('Create sales success', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(SalesRepository.prototype, 'create').resolves(sales[0] as unknown as Sales);
        repositoryStub2 = sinon.stub(ProductsRepository.prototype, 'findById').resolves(product as unknown as Products);
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
          .post('/sales')
          .set('authorization', '123.456.789')
          .send({
            sales: [{
              product_id: 1,
              quantity: 2,
            },
            {
              product_id: 4,
              quantity: 5,
            },
            ],
          });

        expect(chaiHttpResponse.status).to.be.eql(201);
        expect(chaiHttpResponse.body).to.be.eql(sales[0]);
      });
    });
    describe('Create sales falid', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(SalesRepository.prototype, 'create').resolves(sales[0] as unknown as Sales);
        repositoryStub2 = sinon.stub(ProductsRepository.prototype, 'findById').resolves(null);
        tokenStub = sinon.stub(Token, 'validate').returns(tokenPayloadAdmin);
      });
      afterEach(() => {
        // repositoryStub.restore();
        repositoryStub2.restore();
        tokenStub.restore();
      });
      it('return status 404', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/sales')
          .set('authorization', '123.456.789')
          .send({
            sales: [{
              product_id: 1,
              quantity: 2,
            },
            {
              product_id: 4,
              quantity: 5,
            },
            ],
          });

        expect(chaiHttpResponse.status).to.be.eql(404);
        expect(chaiHttpResponse.body).to.be.eql({ message: 'Product not found' });
      });
    });
  });
});
