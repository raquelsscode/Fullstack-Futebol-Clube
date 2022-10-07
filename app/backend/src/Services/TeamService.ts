import ITeam from '../interfaces/ITeam';
import Team from '../database/models/TeamModel';
import CustomError from '../errors/CustomError';

export default class TeamService {
  public model = Team;

  public getAll = async (): Promise<ITeam[]> => {
    const teams = await this.model.findAll({ raw: true });

    return teams;
  };

  public getById = async (id: string): Promise<ITeam> => {
    const team = await this.model.findByPk(id, { raw: true });

    if (!team) throw new CustomError(404, 'There is no team with such id');

    return team;
  };
}
