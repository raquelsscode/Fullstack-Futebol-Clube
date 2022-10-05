import { Request, Response } from 'express';
import MatchService from '../Services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;

    let matches;
    const ProgressTrue = inProgress === 'true';

    if (ProgressTrue === true) {
      matches = await this.matchService.getAllInProgress(ProgressTrue);
    } else if (!ProgressTrue) {
      matches = await this.matchService.getAllInProgress(ProgressTrue);
    } else matches = await this.matchService.getAll();

    return res.status(200).json(matches);
  };
}
