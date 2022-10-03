import { INTEGER, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchModel extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: number;
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
    type: INTEGER,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

TeamModel.hasMany(MatchModel, { foreignKey: 'home_team', as: 'homeTeam' });
TeamModel.hasMany(MatchModel, { foreignKey: 'away_team', as: 'awayTeam' });

MatchModel.belongsToMany(
  TeamModel,
  { foreignKey: 'home_team', as: 'homeTeam', through: 'home_team' },
);
MatchModel.belongsToMany(
  TeamModel,
  { foreignKey: 'away_team', as: 'awayTeam', through: 'away_team' },
);

export default MatchModel;
