import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamModel from '../database/models/team.model'
import { team, teams } from './mocks/data.mock';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', async () => {
  let response: Response;

  before(async () => {
    sinon.stub(TeamModel, "findAll").resolves(teams as TeamModel[]);
    sinon.stub(TeamModel, "findOne").resolves(team as TeamModel);
  })

  after(() => {
    (TeamModel.findAll as sinon.SinonStub).restore();
    (TeamModel.findOne as sinon.SinonStub).restore();
  })

  it('succeeds', async () => {
    response = await chai.request(app).get('/teams');
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('array');
    expect(response.body).to.have.length(16);
  })

  it('succeeds finding a team by id', async () => {
    response = await chai.request(app).get('/teams/1');
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('object');
    expect(response.body).to.have.a.property('id' && 'teamName');
  })
});