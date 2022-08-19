import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/user.model'
import { user, requestBody } from './mocks/data.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  let response: Response;

  before(async () => sinon.stub(UserModel, "findOne").resolves(user as UserModel));

  after(() => (UserModel.findOne as sinon.SinonStub).restore());

  it('succeeds', async () => {
    response = await chai.request(app).post('/login').send(requestBody);
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('object');
    expect(response.body).to.have.a.property('token');
  });

  it('fails with email missing', async () => {
    const { email, ...requestBodyWithoutEmail } = requestBody;
    response = await chai.request(app).post('/login').send(requestBodyWithoutEmail);
    const { body: { message } } = response;
    expect(response).to.have.status(400);
    expect(message).to.be.deep.equal('All fields must be filled');
  });

  it('fails with password missing', async () => {
    const { password, ...requestBodyWithoutPassword } = requestBody;
    response = await chai.request(app).post('/login').send(requestBodyWithoutPassword);
    const { body: { message } } = response
    expect(response).to.have.status(400);
    expect(message).to.be.deep.equal('All fields must be filled');
  });
});
