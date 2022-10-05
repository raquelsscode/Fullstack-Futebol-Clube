import { Router } from 'express';
import MatchController from '../Controllers/MatchController';

const route = Router();

const matchController = new MatchController();

route.get('/', matchController.getAll);

export default route;
