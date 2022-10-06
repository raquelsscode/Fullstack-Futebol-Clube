import { Request, Response } from 'express';
import { IMatch } from '../interfaces/IMatch';
import MatchService from '../Services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}
  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;
    let matches;
    const Progress = inProgress === 'true';
    if (!inProgress) {
      matches = await this.matchService.getAll();
      return res.status(200).json(matches);
    }
    switch (Progress) {
      case true:
        matches = await this.matchService.getAllInProgress(Progress);
        break;
      case false:
        matches = await this.matchService.getAllInProgress(Progress);
        break;
      default:
        break;
    }
    return res.status(200).json(matches);
  };

  public start = async (req: Request, res: Response): Promise<Response> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    const startMatch = {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    };
    const match = await this.matchService.start(startMatch as IMatch);
    return res.status(201).json(match);
  };

  public finish = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.matchService.finish(id);
    return res.status(200).json({ message: 'Finish' });
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const matchUpdated = await this.matchService.update(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json(matchUpdated);
  };
}
