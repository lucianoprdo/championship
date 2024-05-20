import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import mocks from './mocks/matches';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('GET /matches', () => {
  it('Must return a list of matches with status 200', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(mocks.allMatchesFromDB as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.be.an('array');
  });

  afterEach(sinon.restore);
});

describe('GET /matches?inProgress true or false', () => {
  it('Must return a list of runs in progress with status 200', async () => {
    sinon
      .stub(MatchesModel, 'findAll')
      .resolves(mocks.allMatchesInProgressFromDB as any);

    const { status, body } = await chai
      .request(app)
      .get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.be.an('array');
    expect(body).to.deep.equal(
      mocks.allMatchesInProgressFromDB.map((match) => match.dataValues),
    );
  });

  it('Must return a list of runs that are not in progress with status 200', async () => {
    sinon
      .stub(MatchesModel, 'findAll')
      .resolves(mocks.allMatchesNotInProgressFromDB as any);

    const { status, body } = await chai
      .request(app)
      .get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.be.an('array');
    expect(body).to.deep.equal(
      mocks.allMatchesNotInProgressFromDB.map((match) => match.dataValues),
    );
  });

  afterEach(sinon.restore);
});

describe('PATCH /matches/:id/finish', () => {
  it('Should update the result of a match and return status 200', async () => {
    sinon.stub(MatchesModel, 'update').resolves();
    sinon.stub(JWT, 'verify').returns('valideToken');

    const { status, body } = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('authorization', 'Bearer validToken');

    expect(status).to.equal(200);
  });

  it('Must update the score of a match and return status 200', async () => {
    sinon.stub(MatchesModel, 'update').resolves();
    sinon.stub(JWT, 'verify').returns('valideToken');

    const { status, body } = await chai
      .request(app)
      .patch('/matches/1')
      .set('authorization', 'Bearer validToken')
      .send({ homeTeamGoals: 2, awayTeamGoals: 2 });

    expect(status).to.equal(200);
  });

  afterEach(sinon.restore);
});
