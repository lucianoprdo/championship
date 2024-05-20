import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUsers from '../database/models/UsersModel';
import mocks from './mocks/users';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('POST /login', () => {
  let chaiHttpResponse: Response;

  it('Must return status 400 with valid username and incorrect password', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody;

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send({ email, password: 'senha_incorreta' });

    expect(status).to.equal(401);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('Must return a token with status 200', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody;

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send({ email, password });

    expect(status).to.equal(200);
    expect(body).to.have.property('token');
    expect(body.token).to.be.an('string');
  });
  it('Should return status 400 without email', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody;

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send({ email });

    expect(status).to.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('Must return 401 status with invalid user', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { email, password } = mocks.userLoginBody;

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send({ email, password });

    expect(status).to.equal(401);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('Should return status 400 without email', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody;

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send({ password });

    expect(status).to.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  afterEach(sinon.restore);
});

describe('GET /login/role', () => {
  let chaiHttpResponse: Response;

  it('Should return 401 status with correct error message when there is invalid token', async () => {
    // sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    sinon.stub(JWT, 'verify').returns('Token must be a valid token');

    const { email, password } = mocks.userLoginBody;

    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', 'Bearer invalidToken')
      .send({ email, password });

    expect(status).to.equal(401);
    expect(body.message).to.be.an('string');
    expect(body.message).to.equal('Token must be a valid token');
  });

  it('It must return status 200 with an object containing the users role when there is a valid token', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    sinon.stub(JWT, 'verify').returns('valideToken');

    const { email, password } = mocks.userLoginBody;

    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', 'Bearer validToken')
      .send({ email, password });

    expect(status).to.equal(200);
    expect(body).to.have.property('role');
    expect(body.role).to.be.an('string');
  });

  it('Should return 401 status with correct error message when there is no token', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);

    const { email, password } = mocks.userLoginBody;

    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .send({ email, password });

    expect(status).to.equal(401);
    expect(body.message).to.be.an('string');
    expect(body.message).to.equal('Token not found');
  });

  afterEach(sinon.restore);
});
