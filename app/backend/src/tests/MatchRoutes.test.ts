import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { InvalidMatch,
    InvalidMatchTeams,
    Matches,
    NewMatch,
    NewMatchGoals,
    OneTeam,
    Token,
    UpdateMatch,
    ValidMatch,
    ValidMatchNoGoals } from '../Mocks/MockMatches';
import TeamModel from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

  describe('Testando a rota GET /matches', () => {
    describe('Ao ser chamada sem parametros', () => {
      before(() => {
        sinon.stub(MatchModel, 'findAll').resolves(Matches as unknown as MatchModel[]);
      })

      after(() => {
        (MatchModel.findAll as sinon.SinonStub).restore();
      });

      it('Retorna uma lista de matches', async () => {
        const result = await chai.request(app).get('/matches');

        expect(result.body).to.be.an('array');
        expect(result.status).to.be.equal(200);
      })
    });

    describe('Se chamada com o parametro ?inProgress=true', () => {
      before(() => {
        sinon.stub(MatchModel, 'findAll').resolves([Matches[1]] as unknown as MatchModel[]);
      })

      after(() => {
        (MatchModel.findAll as sinon.SinonStub).restore();
      });

      it('Retorna uma lista de matches com "inProgress: true"', async () => {
        const result = await chai.request(app).get('/matches?inProgress=true');

        const everyProgressIsTrue = result.body.every((match: { inProgress: boolean; }) => match.inProgress === true);

        expect(result.body).to.be.an('array');
        expect(everyProgressIsTrue).to.be.equal(true);
        expect(result.status).to.be.equal(200);
      });
    });

    describe('Se chamada com o parametro ?inProgress=false', () => {
      before(() => {
        sinon.stub(MatchModel, 'findAll').resolves([Matches[0]] as unknown as MatchModel[]);
      })

      after(() => {
        (MatchModel.findAll as sinon.SinonStub).restore();
      });

      it('Retorna uma lista de matches com "inProgress: false"', async () => {
        const result = await chai.request(app).get('/matches?inProgress=false');

        const allProgressFalse = result.body.every(
          (match: { inProgress: boolean; }) => match
          .inProgress === false);

        expect(result.body).to.be.an('array');
        expect(allProgressFalse).to.be.equal(true);
        expect(result.status).to.be.equal(200);
      });
    });

    describe('Erro de conexão ou BD', () => {
      before(() => {
        sinon.stub(MatchModel, 'findAll').rejects();
      })

      after(() => {
        (MatchModel.findAll as sinon.SinonStub).restore();
      })

      it('Retorna status 500', async () => {
        const response = await chai.request(app).get('/matches');

        expect(response.status).to.be.equal(500);
      });
    });
  });

  describe('Testa a rota POST /matches', () => {
    describe('Se chamada com HomeTeam ou AwayTeam errados', () => {
      before(() => {
        sinon.stub(TeamModel, 'findByPk').resolves(null as unknown as MatchModel);
      })

      after(() => {
        (TeamModel.findByPk as sinon.SinonStub).restore();
      });

      it('Retorna a mensagem de erro "There is no team with such id!"', async () => {
        const response = await chai.request(app)
          .post('/matches')
          .set('authorization', Token)
          .send(InvalidMatchTeams);

        expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!' });
        expect(response.status).to.be.equal(404);
      })
    });

    describe('Se colocado dados errados', () => {
      before(() => {
        sinon.stub(TeamModel, 'findByPk').resolves(OneTeam as TeamModel);
        sinon.stub(MatchModel, 'create').resolves(NewMatch as MatchModel);
      })

      after(() => {
        (TeamModel.findByPk as sinon.SinonStub).restore();
        (MatchModel.create as sinon.SinonStub).restore();
      });

      it('Retorna os dados da partida criada', async () => {
        const response = await chai.request(app)
        .post('/matches')
        .set('authorization', Token)
        .send(ValidMatch);

        expect(response.body).to.be.deep.equal(NewMatch);
        expect(response.status).to.be.equal(201);
      })
    });

    describe('Se não colocado os gols', () => {
      before(() => {
        sinon.stub(TeamModel, 'findByPk').resolves(OneTeam as TeamModel);
        sinon.stub(MatchModel, 'create').resolves(NewMatchGoals as MatchModel);
      })

      after(() => {
        (TeamModel.findByPk as sinon.SinonStub).restore();
        (MatchModel.create as sinon.SinonStub).restore();
      });
    });

    describe('Se retornar uma HomeTime = AwayTime', () => {
      it('Retorna mensagem a mensagem "It is not possible to create a match with two equal teams"', async () => {
        const response = await chai.request(app)
          .post('/matches')
          .set('authorization', Token)
          .send(InvalidMatch);

        expect(response.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
        expect(response.status).to.be.equal(401);
      })
    });

    describe('Se o token for invlido', () => {
      before(() => {
        sinon.stub(TeamModel, 'findByPk').resolves(OneTeam as TeamModel);
        sinon.stub(MatchModel, 'create').resolves(NewMatch as MatchModel);
      })

      after(() => {
        (TeamModel.findByPk as sinon.SinonStub).restore();
        (MatchModel.create as sinon.SinonStub).restore();
      });

      it('Retorna a mesagem "Token must be a valid token"', async () => {
        const response = await chai.request(app)
        .post('/matches')
        .set('authorization', 'Token')
        .send(ValidMatch);

        expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token'});
        expect(response.status).to.be.equal(401);
      })
    });

    describe('Erro de conexão ou BD', () => {
      before(() => {
        sinon.stub(MatchModel, 'create').rejects();
      })

      after(() => {
        (MatchModel.create as sinon.SinonStub).restore();
      });

      it('Retorna status 500', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .set('authorization', Token)
          .send(ValidMatchNoGoals);

        expect(response.status).to.be.equal(500);
      });
    });
  });

  describe('Testando a rota PATCH /matches/:id/finish', () => {
    describe('Com id invalido', () => {
      before(() => {
        sinon.stub(MatchModel, 'findByPk').resolves(NewMatch as MatchModel);
        sinon.stub(MatchModel, 'update').resolves();
      })

      after(() => {
        (MatchModel.findByPk as sinon.SinonStub).restore();
        (MatchModel.update as sinon.SinonStub).restore();
      });

      it('Retorna a mensagem "Finished"', async () => {
        const response = await chai.request(app).patch('/matches/1/finish');

        expect(response.body).to.be.deep.equal({ message: 'Finished' });
        expect(response.status).to.be.equal(200);
      })
    });

    describe('Ao ser chamada com um id inválido', () => {
      before(() => {
        sinon.stub(MatchModel, 'findByPk').resolves(null as unknown as MatchModel);
      })

      after(() => {
        (MatchModel.findByPk as sinon.SinonStub).restore();
      });

      it('Retorna "Match not found" com status 404', async () => {
        const response = await chai.request(app).patch('/matches/999/finish');

        expect(response.body).to.be.deep.equal({ message: 'Match not found' });
        expect(response.status).to.be.equal(404);
      })
    });
  });

  describe('Testando a rota PATCH /matches/:id', () => {
    describe('Se os dados forem invalidos', () => {
      before(() => {
        sinon.stub(MatchModel, 'findByPk').resolves(NewMatch as MatchModel);
        sinon.stub(MatchModel, 'update').resolves();
      })

      after(() => {
        (MatchModel.findByPk as sinon.SinonStub).restore();
        (MatchModel.update as sinon.SinonStub).restore();
      });

      it('Retorna "Updated" quando atualizado', async () => {
        const response = await chai.request(app).patch('/matches/1')
          .send(UpdateMatch);

        expect(response.body).to.be.deep.equal({ message: 'Updated' });
        expect(response.status).to.be.equal(200);
      })
    });

    describe('Se o id não existir', () => {
      before(() => {
        sinon.stub(MatchModel, 'findByPk').resolves(null as unknown as MatchModel);
      })

      after(() => {
        (MatchModel.findByPk as sinon.SinonStub).restore();
      });

      it('Retrona a mensagem "Match not found"', async () => {
        const response = await chai.request(app).patch('/matches/586')
          .send(UpdateMatch);

        expect(response.body).to.be.deep.equal({ message: 'Match not found' });
        expect(response.status).to.be.equal(404);
      })
    });
  });