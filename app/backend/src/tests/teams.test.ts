import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamsModel from '../database/models/team.model'
import { foundTeamMock, teamsMock } from './mocks/teams.mock';
import ITeam from '../interfaces/ITeam';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', async () => {
  let chaiHttpResponse: Response;

  after(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
  })

  it('succeeds', async () => {
    sinon.stub(TeamsModel, "findAll").resolves(teamsMock as TeamsModel[]);
    chaiHttpResponse = await chai.request(app).get('/teams');
  
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('array');
    expect(chaiHttpResponse.body).to.have.length(16);
  })

  it('succeeds finding a team by id', async () => {
    sinon.stub(TeamsModel, "findOne").resolves(foundTeamMock as TeamsModel);
    chaiHttpResponse = await chai.request(app).get('/teams/1');
  
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.a.property('id' && 'teamName');
  })
});