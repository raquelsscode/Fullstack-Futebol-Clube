import * as express from 'express';
import 'express-async-errors';
import UserRouter from './Routes/UserRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import TeamRouter from './Routes/TeamRoutes';
import MatchRouter from './Routes/MatchRouter';
import LeaderboardRouter from './Routes/LeaderboardRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/login', UserRouter);
    this.app.use('/teams', TeamRouter);
    this.app.use('/matches', MatchRouter);
    this.app.use('/leaderboard', LeaderboardRouter.route);
    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
