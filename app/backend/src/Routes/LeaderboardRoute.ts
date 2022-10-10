import * as express from 'express';
import LeaderboardController from '../Controllers/LeaderboardController';

class LeaderboardRouter {
  constructor(
    private _controller: LeaderboardController = new LeaderboardController(),
    public route: express.Router = express.Router(),
  ) {
    this.route
      .get('/', (req, res, next) => this._controller.generalBoard(req, res, next));

    this.route
      .get('/home', (req, res, next) => this._controller.homeBoard(req, res, next));

    this.route
      .get('/away', (req, res, next) => this._controller.awayBoard(req, res, next));
  }
}

const route = new LeaderboardRouter();

export default route;
