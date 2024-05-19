import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import teamsMocks from './mocks/teams';

chai.use(chaiHttp);

import { app } from '../app';

describe('GET /teams', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Must return status 200 and all teams in the database', async function () {
    // Arrange
    const responseBodyTeams = teamsMocks.allTeamsFromDB;

    // Act
    const httpResponse = await chai
      .request(app)
      .get('/teams')
      .send(responseBodyTeams);

    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(responseBodyTeams);
  });
});
