interface IMatch {
  id?: number,
  homeTeam: number,
  homeTeamGoals?: number,
  awayTeam: number,
  awayTeamGoals?: number,
  inProgress?: boolean,
}

interface IBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

interface IMatchFull extends IMatch {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export { IBoard, IMatchFull };
