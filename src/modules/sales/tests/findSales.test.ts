import sinon from 'sinon';
import chai from 'chai';

import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { Sales } from '@prisma/client';
import { app } from '../../../index';
import SalesRepository from '../../../repositories/implementations/salesRepository';
import { sales } from './mocks/SalesMocks';
import Token from '../../../helpers/jwt.auth';
import { tokenPayloadAdmin } from '../../users/tests/mocks/usersMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Sales', async () => {
  let chaiHttpResponse: Response;
  let repositoryStub: sinon.SinonStub;
  let tokenStub: sinon.SinonStub;

  describe('Find by id sales', async () => {
    describe('Find by id sales success', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(SalesRepository.prototype, 'findById').resolves(sales[0] as unknown as Sales);
        tokenStub = sinon.stub(Token, 'validate').returns(tokenPayloadAdmin);
      });
      afterEach(() => {
        repositoryStub.restore();
        tokenStub.restore();
      });
      it('return status 200', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/sales/1')
          .set('authorization', '123.456.789');

        expect(chaiHttpResponse.status).to.be.eql(200);
        expect(chaiHttpResponse.body).to.be.eql(sales[0]);
      });
    });

    describe('Find by id sale falid', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(SalesRepository.prototype, 'findById').resolves(null);
        tokenStub = sinon.stub(Token, 'validate').returns(tokenPayloadAdmin);
      });
      afterEach(() => {
        repositoryStub.restore();
        tokenStub.restore();
      });
      it('return status 404', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/sales/1')
          .set('authorization', '123.456.789');
        expect(chaiHttpResponse.status).to.be.eql(404);
        expect(chaiHttpResponse.body).to.be.eql({ message: 'Sale not found' });
      });
    });
  });

  describe('Find all sale', async () => {
    describe('Find all sale success', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(SalesRepository.prototype, 'findAll').resolves(sales as unknown as Sales[]);
        tokenStub = sinon.stub(Token, 'validate').returns(tokenPayloadAdmin);
      });
      afterEach(() => {
        repositoryStub.restore();
        tokenStub.restore();
      });
      it('return status 200', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/sales')
          .set('authorization', '123.456.789');

        expect(chaiHttpResponse.status).to.be.eql(200);
        expect(chaiHttpResponse.body).to.be.eql(sales);
      });
    });
  });
});
