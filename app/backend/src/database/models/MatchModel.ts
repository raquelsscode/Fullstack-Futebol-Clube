import { INTEGER, BOOLEAN, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchModel extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

MatchModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

TeamModel.hasMany(MatchModel, { foreignKey: 'homeTeam', as: 'homeTeam' });
TeamModel.hasMany(MatchModel, { foreignKey: 'awayTeam', as: 'awayTeam' });

MatchModel.belongsTo(
  TeamModel,
  { foreignKey: 'homeTeam', as: 'teamHome' },
);
MatchModel.belongsTo(
  TeamModel,
  { foreignKey: 'awayTeam', as: 'teamAway' },
);

export default MatchModel;
