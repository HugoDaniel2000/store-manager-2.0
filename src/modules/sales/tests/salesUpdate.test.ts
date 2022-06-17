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
  let repositoryStub2: sinon.SinonStub;
  let tokenStub: sinon.SinonStub;

  describe('Update sales', async () => {
    describe('Update sales success', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(SalesRepository.prototype, 'update').resolves();
        repositoryStub2 = sinon.stub(SalesRepository.prototype, 'findById').resolves(sales[0] as unknown as Sales);
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
          .put('/sales/1')
          .set('authorization', '123.456.789')
          .send({
            product_id: 1,
            quantity: 2,

          });

        expect(chaiHttpResponse.status).to.be.eql(200);
        expect(chaiHttpResponse.body).to.be.eql({ message: 'Sale updated successfully' });
      });
    });
    describe('Update sales falid', async () => {
      beforeEach(async () => {
        repositoryStub = sinon.stub(SalesRepository.prototype, 'update').resolves();
        repositoryStub2 = sinon.stub(SalesRepository.prototype, 'findById').resolves(null);
        tokenStub = sinon.stub(Token, 'validate').returns(tokenPayloadAdmin);
      });
      afterEach(() => {
        repositoryStub.restore();
        repositoryStub2.restore();
        tokenStub.restore();
      });
      it('return status 404', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .put('/sales/1')
          .set('authorization', '123.456.789')
          .send({
            product_id: 1,
            quantity: 2,
          });

        expect(chaiHttpResponse.status).to.be.eql(404);
        expect(chaiHttpResponse.body).to.be.eql({ message: 'Sale not found' });
      });
    });
  });
});
