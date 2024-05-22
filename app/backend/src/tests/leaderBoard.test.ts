import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import mocks from './mocks/teams';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe.skip('Testing LeaderBoard Route', () => {
  let chaiHttpResponse: Response;

  it('GET /teams It should return a list of teams with status 200', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(mocks.allTeamsFromDB as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.be.an('array');;
  });

  afterEach(sinon.restore);
});
