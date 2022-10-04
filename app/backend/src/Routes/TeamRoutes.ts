import { Router } from 'express';
import TeamController from '../Controllers/TeamControllers';

const route = Router();

const teamController = new TeamController();

route.get('/', teamController.getAll);
route.get('/:id', teamController.getById);

export default route;
