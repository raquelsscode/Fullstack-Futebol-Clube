import { createJWT } from '../middlewares/createtoken';
import { validUserCrypto } from './MockUsers';

const Matches = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Internacional',
    },
  },
];

const ValidMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

const NewMatch = { ...ValidMatch, id: 1, inProgress: true };

const ValidMatchNoGoals = {
  homeTeam: 16,
  awayTeam: 8,
};

const NewMatchGoals = {
  ...ValidMatchNoGoals,
  id: 1,
  inProgress: true,
  homeTeamGoals: 0,
  awayTeamGoals: 0 };

const InvalidMatch = {
  homeTeam: 10,
  awayTeam: 10,
  homeTeamGoals: 1,
  awayTeamGoals: 0,
};

const InvalidMatchTeams = {
  homeTeam: 1458,
  awayTeam: 1459,
  homeTeamGoals: 3,
  awayTeamGoals: 1,
};

const UpdateMatch = {
  homeTeamGoals: 5,
  awayTemmGoals: 0,
};

const OneTeam = {
  id: 16,
  teamName: 'São Paulo',
};

const Token = createJWT(validUserCrypto);

export { Matches,
  UpdateMatch,
  InvalidMatchTeams,
  InvalidMatch,
  ValidMatch,
  NewMatchGoals,
  ValidMatchNoGoals,
  NewMatch,
  OneTeam,
  Token };
