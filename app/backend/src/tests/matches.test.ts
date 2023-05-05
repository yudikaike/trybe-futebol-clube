import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchModel from '../database/models/match.model'
import { TeamsService, UserService } from '../services';
import { matches, finishedMatches, inProgressMatches, user, match, invalidMatch, team } from './mocks/data.mock';
import { Match, User } from '../interfaces';

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

describe('POST /matches', () => {
  let response: Response;

  const { password, ...restOfUser } = user;
  const token = jwt.sign({ ...restOfUser }, process.env.JWT_SECRET || 'jwt_secret');

  before(async () => {
    sinon.stub(MatchModel, "create").resolves(match as Match)
    sinon.stub(UserService, "find").resolves(user as User);
    sinon.stub(TeamsService, "find")
      .onFirstCall().resolves(team)
      .onSecondCall().resolves(team)
      .onThirdCall().resolves(null)
  });

  after(() => {
    (MatchModel.create as sinon.SinonStub).restore();
    (UserService.find as sinon.SinonStub).restore();
    (TeamsService.find as sinon.SinonStub).restore();
  })

  it('succeeds', async () => {
    const { id, inProgress, ...requestBody } = match
    response = await chai.request(app).post('/matches')
      .set({'Authorization': token })
      .send(requestBody);
    expect(response).to.have.status(201);
    expect(response.body).to.be.a('object');
    expect(response.body).to.be.deep.equal(match);
  })

  it('fails with the same two teams', async () => {
    const { id, inProgress, ...requestBody } = invalidMatch.withSameTeams;
    response = await chai.request(app).post('/matches')
      .set({'Authorization': token })
      .send(requestBody);
    const { body: { message } } = response;
    expect(response).to.have.status(401);
    expect(response.body).to.be.a('object');
    expect(message).to.be.deep.equal('It is not possible to create a match with two equal teams');
  })

  it("fails with a team that doesn't exist", async () => {
    const { id, inProgress, ...requestBody } = invalidMatch.unexistentTeam;
    response = await chai.request(app).post('/matches')
      .set({'Authorization': token })
      .send(requestBody);
    const { body: { message } } = response;
    expect(response).to.have.status(404);
    expect(response.body).to.be.a('object');
    expect(message).to.be.deep.equal('There is no team with such id!');
  })
});

describe('PATCH /matches', () => {
  let response: Response;

  before(async () => {
    sinon.stub(MatchModel, "update").resolves();
  })

  after(() => (MatchModel.update as sinon.SinonStub).restore())

  it('succeeds', async () => {
    response = await chai.request(app).patch('/matches/1/finish');
    const { body: { message } } = response;
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('object');
    expect(message).to.be.deep.equal('Finished');
  })
});

describe('PATCH /matches', () => {
  let response: Response;

  before(async () => {
    sinon.stub(MatchModel, "update").resolves();
  })

  after(() => (MatchModel.update as sinon.SinonStub).restore())

  it('succeeds', async () => {
    const { homeTeamGoals, awayTeamGoals, ...rest } = match;
    response = await chai.request(app).patch('/matches/1').send({ homeTeamGoals, awayTeamGoals });
    const { body: { message } } = response;
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('object');
    expect(message).to.be.deep.equal('Score updated!');
  })
});