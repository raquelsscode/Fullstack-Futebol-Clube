import { Request, Response } from 'express';
import TeamService from '../Services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this.teamService.getAll();

    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const team = await this.teamService.getById(id);

    return res.status(200).json(team);
  };
}
