import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import TeamsMocks from '../database/models/TeamsModel';
import mocks from './mocks/teams';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('GET /teams', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('It should return a list of teams with status 200', async () => {
    sinon.stub(TeamsMocks, 'findAll').resolves(mocks.allTeamsFromDB as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.be.an('array');
  });

  it('Should return only one team with status 200', async () => {
    sinon.stub(TeamsMocks, 'findByPk').resolves(mocks.teamFromDB as any);

    const { status, body } = await chai.request(app).get('/teams/3');

    expect(status).to.equal(200);
    expect(body).to.have.property('id', 3);
    expect(body).to.have.property('teamName', 'Botafogo');
  });

  afterEach(sinon.restore);
});
