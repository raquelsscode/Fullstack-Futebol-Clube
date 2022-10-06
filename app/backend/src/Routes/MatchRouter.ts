import { Router } from 'express';
import MatchController from '../Controllers/MatchController';
import matchValidation from '../middlewares/matchValidation';

const route = Router();
const matchController = new MatchController();

route.get('/', matchController.getAll);
route.post('/', matchValidation, matchController.start);
route.patch('/:id', matchController.update);
route.patch('/:id/finish', matchController.finish);

export default route;
