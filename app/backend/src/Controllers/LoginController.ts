import { Request, Response } from 'express';
import LoginService from '../Services/LoginService';
import CustomError from '../errors/CustomError';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const userLogin = await this.loginService.login(email, password);
    return res.status(200).json({ token: userLogin });
  };

  public validateLogin = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    if (!authorization) throw new CustomError(401, 'Invalid Token!');
    const token = authorization.replace('Bearer ', '');
    const userRole = await this.loginService.validateLogin(token);
    return res.status(200).json({ role: userRole });
  };
}
