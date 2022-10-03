import { Router } from 'express';
import LoginController from '../Controllers/LoginController';
import loginValidation from '../middlewares/loginValidation';

const route = Router();

const loginController = new LoginController();

route.post('/', loginValidation, loginController.login);
route.get('/validate', loginController.validateLogin);

export default route;
