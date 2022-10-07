import { Request, Response, NextFunction } from 'express';
import * as Jwt from 'jsonwebtoken';
import IToken from '../interfaces/IToken';
import CustomError from '../errors/CustomError';
import TeamService from '../Services/TeamService';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const teamService = new TeamService();

const loginValidation = async (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const { authorization } = req.headers;

  if (homeTeam === awayTeam) {
    throw new
    CustomError(401, 'It is not possible to create a match with two equal teams');
  }

  await teamService.getById(homeTeam);

  await teamService.getById(awayTeam);

  try {
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      Jwt.verify(token, JWT_SECRET) as IToken;
    }
  } catch (error) {
    throw new CustomError(401, 'Token must be a valid token');
  }

  next();
};

export default loginValidation;
