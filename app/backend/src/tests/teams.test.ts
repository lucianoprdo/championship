import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import mocks from './mocks/teams';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('Testing Teams Route', () => {
  let chaiHttpResponse: Response;

  it('GET /teams It should return a list of teams with status 200', async () => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(mocks.allTeamsFromDB as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.be.an('array');;
  });

  it('GET /teams/:id Should return a team with status 200', async () => {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(mocks.teamFromDB as any);

    const { status, body } = await chai.request(app).get('/teams/3');

    expect(status).to.equal(200);
    expect(body).to.have.property('id', 3);
    expect(body).to.have.property('teamName', "Botafogo");
  });

  afterEach(sinon.restore);
});
