import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUsers from '../database/models/SequelizeUsers';
import mocks from './mocks/users';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('Testing User Routes', () => {
  let chaiHttpResponse: Response;

  it('POST /login Must return a token with status 200', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/login')
      .send({ email, password });
    
    expect(status).to.equal(200);
    expect(body).to.have.property('token');
    expect(body.token).to.be.an('string');
  });

  it('POST /login Should return status 400 without email', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/login')
      .send({ password });
    
    expect(status).to.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('POST /login Must return status 400 without password', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/login')
      .send({ email });
    
    expect(status).to.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('POST /login Must return 401 status with invalid user', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/login')
      .send({ email, password });
    
    expect(status).to.equal(401);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('POST /login Must return status 400 with valid username and incorrect password', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).post('/login')
      .send({ email, password: 'senha_incorreta' });
    
    expect(status).to.equal(401);
    expect(body).to.have.property('message');
    expect(body.message).to.be.an('string');
  });

  it('GET /login/role A valid token return status 200 with an object containing the users role', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);
    sinon.stub(JWT, 'verify').returns('valideToken');

    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).get('/login/role')
      .set('authorization', 'Bearer validToken')
      .send({ email, password });
    
    expect(status).to.equal(200);
    expect(body).to.have.property('role');
    expect(body.role).to.be.an('string');
  });

  it('GET /login/role No token return 401 status with correct error message', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(mocks.userFromDB as any);

    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).get('/login/role')
      .send({ email, password });
    
    expect(status).to.equal(401);
    expect(body.message).to.be.an('string');
    expect(body.message).to.equal('Token not found');
  });

  it('GET /login/role with invalid token return status 401 with correct error message', async () => {
    sinon.stub(JWT, 'verify').returns("Token must be a valid token");

    const { email, password } = mocks.userLoginBody
    
    const { status, body } = await chai.request(app).get('/login/role')
      .set('authorization', 'Bearer invalidToken')
      .send({ email, password });
    
    expect(status).to.equal(401);
    expect(body.message).to.be.an('string');
    expect(body.message).to.equal('Token must be a valid token');
  });

  afterEach(sinon.restore);
});
