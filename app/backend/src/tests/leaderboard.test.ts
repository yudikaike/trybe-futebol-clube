import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchModel from '../database/models/match.model';
import { Match } from '../interfaces';
import { matches, team, teams } from './mocks/data.mock';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /leaderboard/home', async () => {
  let response: Response;

  before(async () => {
    sinon.stub(MatchModel, "findAll").resolves(matches as Match[]);
  })

  after(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
  })

  it('succeeds', async () => {
    response = await chai.request(app).get('/leaderboard/home');
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('array');
    expect(response.body).to.have.length(16);
  })
});

describe('GET /leaderboard/away', async () => {
  let response: Response;

  before(async () => {
    sinon.stub(MatchModel, "findAll").resolves(matches as Match[]);
  })

  after(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
  })

  it('succeeds', async () => {
    response = await chai.request(app).get('/leaderboard/away');
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('array');
    expect(response.body).to.have.length(16);
  })
});

describe('GET /leaderboard', async () => {
  let response: Response;

  before(async () => {
    sinon.stub(MatchModel, "findAll").resolves(matches as Match[]);
  })

  after(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
  })

  it('succeeds', async () => {
    response = await chai.request(app).get('/leaderboard');
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('array');
    expect(response.body).to.have.length(16);
  })
});