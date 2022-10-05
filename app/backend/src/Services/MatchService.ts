import { IMatch } from '../interfaces/IMatch';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  public model = MatchModel;

  public getAll = async (): Promise<IMatch[]> => {
    const matches = await this.model.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return matches as unknown as IMatch[];
  };

  public getAllInProgress = async (inProgress: boolean): Promise<IMatch[]> => {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return matches as unknown as IMatch[];
  };
}
