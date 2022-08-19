import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
import * as bcryptjs from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/user.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({
        id: 1,
        username: "testUsername",
        role: "testRole",
        email: "test@email.com",
        password: bcryptjs.hashSync('testPassword'),
      } as UserModel);
    });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('succeeds', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: "test@email.com",
        password: "testPassword"
      });

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.a.property('token');
  });

  it('fails with email missing', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        password: "testPassword"
      });

    const { body: { message } } = chaiHttpResponse

    expect(chaiHttpResponse).to.have.status(400);
    expect(message).to.be.deep.equal('All fields must be filled');
  });

  it('fails with password missing', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: "test@email.com"
      });

    const { body: { message } } = chaiHttpResponse

    expect(chaiHttpResponse).to.have.status(400);
    expect(message).to.be.deep.equal('All fields must be filled');
  });
});
