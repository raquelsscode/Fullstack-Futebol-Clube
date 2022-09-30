import { Router } from 'express';
import LoginController from '../Controllers/LoginController';

const route = Router();

const loginController = new LoginController();

route.post('/', loginController.login);

export default route;
