import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchesModel from '../database/models/match.model'
import { matchesMock, finishedMatchesMock, inProgressMatchesMock } from './mocks/matches.mock';
import IMatch from '../interfaces/IMatch';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })

  it('succeeds', async () => {
    sinon.stub(MatchesModel, "findAll").resolves(matchesMock as IMatch[]);
    chaiHttpResponse = await chai.request(app).get('/matches');
  
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('array');
    expect(chaiHttpResponse.body).to.have.length(3);
  })

  it('succeeds with only finished matches', async () => {
    sinon.stub(MatchesModel, "findAll").resolves(finishedMatchesMock as IMatch[]);
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
  
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('array');
    expect(chaiHttpResponse.body[0].inProgress).to.have.be.false;
  })

  it('succeeds with only in progress matches', async () => {
    sinon.stub(MatchesModel, "findAll").resolves(inProgressMatchesMock as IMatch[]);
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
  
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('array');
    expect(chaiHttpResponse.body[0].inProgress).to.have.be.true;
  })
});