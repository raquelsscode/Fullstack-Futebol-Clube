import TeamModel from '../database/models/TeamModel';
import { IMatch } from '../interfaces/IMatch';
import MatchModel from '../database/models/MatchModel';
import CustomError from '../errors/CustomError';

export default class MatchService {
  public model = MatchModel;
  public getAll = async (): Promise<IMatch[]> => {
    const matches = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches as unknown as IMatch[];
  };

  public getAllInProgress = async (inProgress: boolean): Promise<IMatch[]> => {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches as unknown as IMatch[];
  };

  public start = async (
    newMatch: IMatch,
  ): Promise<IMatch> => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = newMatch;
    const match = await this.model.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    });
    return match as unknown as IMatch;
  };

  public finish = async (id: string): Promise<void> => {
    const match = await this.model.findByPk(id);
    if (!match) throw new CustomError(404, 'Match does not exist');

    await this.model.update({ inProgress: false }, { where: { id } });
  };

  public update = async (
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch> => {
    const match = await this.model.findByPk(id);

    if (!match) throw new CustomError(404, 'Match does not exist');

    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    const updated = await this.model.findByPk(id);

    return updated as unknown as IMatch;
  };
}
