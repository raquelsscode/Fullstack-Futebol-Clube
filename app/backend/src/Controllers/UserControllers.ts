// import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import 'jsonwebtoken';
// import 'dotenv/config';
// import UserService from '../Services/UserService';

// const secret = process.env.JWT_SECRET;

// export default class UserController {
//   constructor(private userService = new UserService()) { }

//   public create = async (req: Request, res: Response) => {
//     const user = req.body;
//     const { id } = req.body;

//     await this.userService.create(user);
//     const token = jwt.sign({ id }, secret, {
//       expiresIn: '7d',
//       algorithm: 'HS256',
//     });

//     res.status(StatusCodes.CREATED).json({ token });
//   };
// }
