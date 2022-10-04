import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/UserModel';

import { validUserCrypto, BodyReqUser, InvalidUser }  from '../Mocks/MockUsers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota /login', () => {
  describe('Requisição é feita com sucesso', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(validUserCrypto as User);
    });


    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Retorna um token jwt', async () => {
      const res = await chai.request(app)
        .post('/login')
        .send(BodyReqUser)

        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('token');
      }
    );
  });

  describe('Se os dados são invalidos', () => {
    before(async () => {
      sinon.stub(User, 'findOne'). resolves(InvalidUser as User);
    });


    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Se a senha e email forem incorretos deve retornar a mensagem "Incorrect email or password" ', async () => {
      const res = await chai.request(app)
        .post('/login')
        .send(InvalidUser)

        expect(res.status).to.be.equal(401);
        expect(res.body).to.be.deep.equal({message: 'Incorrect email or password'});
      }
    );
  });
});