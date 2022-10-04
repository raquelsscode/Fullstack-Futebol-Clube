import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Team from '../database/models/TeamModel';
import { Teams, TeamId }  from '../Mocks/MockTeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /teams', () => {
    describe('Retorna todos os times', () => {
      before(() => {
        sinon.stub(Team, 'findAll').resolves(Teams as Team[]);
      });
      after(() => {
        (Team.findAll as sinon.SinonStub).restore();
      });
      it('Rtorna com suceso todos os times', async () => {
        const res = await chai.request(app)
          .get('/teams')
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.deep.equal(Teams);
      });
    });
  });

describe('Testando rota /teams:{id}', () => {
  describe('Retorna todos o time encontrado com o Id', () => {
    before(() => {
      sinon.stub(Team, 'findByPk').resolves(TeamId as Team);
    });

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    });

    it('Retorna o time referente ai id', async () => {
      const id = 12;
      const res = await chai.request(app)
        .get(`/teams/${id}`)

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.deep.equal(TeamId);
    });
  });


  describe('Se o id não existir', () => {
    before(() => {
      sinon.stub(Team, 'findByPk').resolves(null as unknown as Team);
    });

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    });

    it('Retorna uma mensagem de erro', async () => {
      const id = 'IncorrectId';
      const res = await chai.request(app)
        .get(`/teams/${id}`)

        expect(res.status).to.be.equal(404);
    });
  });
});
