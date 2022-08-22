import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchModel from '../database/models/match.model'
import { matches, finishedMatches, inProgressMatches } from './mocks/data.mock';
import { Match } from '../interfaces';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
  let response: Response;

  before(async () => {
    sinon.stub(MatchModel, "findAll")
      .onCall(0).resolves(matches as Match[])
      .onCall(1).resolves(finishedMatches as Match[])
      .onCall(2).resolves(inProgressMatches as Match[]);
  })

  after(() => (MatchModel.findAll as sinon.SinonStub).restore())

  it('succeeds', async () => {
    response = await chai.request(app).get('/matches');
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('array');
    expect(response.body).to.have.length(3);
  })

  it('succeeds with only finished matches', async () => {
    response = await chai.request(app).get('/matches?inProgress=true');
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('array');
    expect(response.body[0].inProgress).to.have.be.false;
  })

  it('succeeds with only in progress matches', async () => {
    response = await chai.request(app).get('/matches?inProgress=false');
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('array');
    expect(response.body[0].inProgress).to.have.be.true;
  })
});