// import sinon from 'sinon';
// import chai from 'chai';

// import chaiHttp = require('chai-http');
// import { Response } from 'superagent';
// import { app } from '../index';
// import UsersRepository from '../repositories/implementations/usersRepository';
// import { tokenPayload, user, userCreated } from './mocks/usersMock';
// import { User } from '../types/users';
// import Token from '../helpers/jwt.auth';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('User', async () => {
//   let chaiHttpResponse: Response;
//   let repositoryStub: sinon.SinonStub;
//   let repositoryStub2: sinon.SinonStub;
//   let tokenStub: sinon.SinonStub;

//   describe('Create user', async () => {
//     describe('Create user success', async () => {
//       beforeEach(async () => {
//         repositoryStub = sinon.stub(UsersRepository.prototype, 'create').resolves(user as User);
//         repositoryStub2 = sinon.stub(UsersRepository.prototype, 'findByEmail').resolves(null);
//       });
//       afterEach(() => {
//         repositoryStub.restore();
//         repositoryStub2.restore();
//       });
//       it('return status 201', async () => {
//         chaiHttpResponse = await chai
//           .request(app).post('/user')
//           .send({
//             first_name: 'Hugo Daniel',
//             last_name: 'Caxias das Virgens',
//             email: 'hugodaniel@gmail.com',
//             password: '123456789',
//           });
//         expect(chaiHttpResponse.status).to.be.eql(201);
//         expect(chaiHttpResponse.body).to.be.eql(userCreated);
//       });
//     });

//     describe('Create user falid', async () => {
//       beforeEach(async () => {
//         repositoryStub = sinon.stub(UsersRepository.prototype, 'create').resolves(user as User);
//         repositoryStub2 = sinon.stub(UsersRepository.prototype, 'findByEmail').resolves(user);
//       });
//       afterEach(() => {
//         repositoryStub.restore();
//         repositoryStub2.restore();
//       });
//       it('Email is already being used', async () => {
//         chaiHttpResponse = await chai
//           .request(app).post('/user')
//           .send({
//             first_name: 'Hugo Daniel',
//             last_name: 'Caxias das Virgens',
//             email: 'hugodaniel@gmail.com',
//             password: '123456789',
//           });
//         expect(chaiHttpResponse.status).to.be.eql(409);
//         expect(chaiHttpResponse.body).to.be.eql({ message: 'Email is already being used' });
//       });
//       it('Password less than 6 characters', async () => {
//         chaiHttpResponse = await chai
//           .request(app).post('/user')
//           .send({
//             first_name: 'Hugo Daniel',
//             last_name: 'Caxias das Virgens',
//             email: 'hugodaniel@gmail.com',
//             password: '1234',
//           });
//         expect(chaiHttpResponse.status).to.be.eql(400);
//         expect(chaiHttpResponse.body).to.be
// .eql({ message: 'Password must be at least 6 characters long' });
//       });
//       it('Email invalid format', async () => {
//         chaiHttpResponse = await chai
//           .request(app).post('/user')
//           .send({
//             first_name: 'Hugo Daniel',
//             last_name: 'Caxias das Virgens',
//             email: 'hugodanielgmail.com',
//             password: '1234',
//           });
//         expect(chaiHttpResponse.status).to.be.eql(400);
//         expect(chaiHttpResponse.body).to.be.eql({ message: 'Email must have a valid format' });
//       });
//       it('Field last_name empty', async () => {
//         chaiHttpResponse = await chai
//           .request(app).post('/user')
//           .send({
//             first_name: 'Hugo Daniel',
//             email: 'hugodaniel@gmail.com',
//             password: '1234',
//           });
//         expect(chaiHttpResponse.status).to.be.eql(400);
//         expect(chaiHttpResponse.body).to.be.eql({ message: 'All fields must be filled' });
//       });
//       it('first_name field less than 3 characters', async () => {
//         chaiHttpResponse = await chai
//           .request(app).post('/user')
//           .send({
//             first_name: 'Hu',
//             last_name: 'Caxias das Virgens',
//             email: 'hugodaniel@gmail.com',
//             password: '123456789',
//           });
//         expect(chaiHttpResponse.status).to.be.eql(400);
//         expect(chaiHttpResponse.body).to
//  .be.eql({ message: 'First Name must be at least 3 characters long' });
//       });
//     });
//   });

//   describe('Update user', async () => {
//     describe('Update user success', async () => {
//       beforeEach(async () => {
//         repositoryStub = sinon.stub(UsersRepository.prototype, 'update').resolves(user as User);
//         tokenStub = sinon.stub(Token, 'validate').returns(tokenPayload);
//       });
//       afterEach(() => {
//         repositoryStub.restore();
//         tokenStub.restore();
//       });

//       it('Allowed user without admin role', async () => {
//         chaiHttpResponse = await chai
//           .request(app)
//           .put('/user/1')
//           .set('authorization', '123.456.789')
//           .send({
//             email: 'hugodaniel@gmail.com',
//           });
//         expect(chaiHttpResponse.status).to.be.eql(200);
//         expect(chaiHttpResponse.body).to.be.eql(userCreated);
//       });
//     });
//     describe('Update user falid', async () => {
//       beforeEach(async () => {
//         repositoryStub = sinon.stub(UsersRepository.prototype, 'update').resolves(user as User);
//         tokenStub = sinon.stub(Token, 'validate').returns(tokenPayload);
//       });
//       afterEach(() => {
//         repositoryStub.restore();
//         tokenStub.restore();
//       });

//       it('User not allowed', async () => {
//         chaiHttpResponse = await chai
//           .request(app)
//           .put('/user/2')
//           .set('authorization', '123.456.789')
//           .send({
//             email: 'hugodaniel@gmail.com',
//           });
//         expect(chaiHttpResponse.status).to.be.eql(401);
//         expect(chaiHttpResponse.body).to
// .be.eql({ message: 'You do not have permission to update this user' });
//       });

//       it('Email invalid format', async () => {
//         chaiHttpResponse = await chai
//           .request(app)
//           .put('/user/2')
//           .set('authorization', '123.456.789')
//           .send({
//             email: 'hugodanielgmail.com',
//           });
//         expect(chaiHttpResponse.status).to.be.eql(400);
//         expect(chaiHttpResponse.body).to.be.eql({ message: 'Email must have a valid format' });
//       });

//       it('Email invalid format', async () => {
//         chaiHttpResponse = await chai
//           .request(app)
//           .put('/user/2')
//           .send({
//             email: 'hugodaniel@gmail.com',
//           });
//         expect(chaiHttpResponse.status).to.be.eql(401);
//         expect(chaiHttpResponse.body).to.be.eql({ message: 'Token not found' });
//       });
//     });
//   });
// });
