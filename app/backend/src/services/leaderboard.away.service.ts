import { Team, AwayTeam } from '../interfaces';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import TeamsService from './teams.service';
import LeaderboardHelper from './leaderboard.helper.service';

export default class AwayLeaderboardService {
  static async calculate(id: number, filter: string) {
    const matches = await MatchModel.findAll({ raw: true,
      where: { awayTeam: id, inProgress: false },
      include: [{ model: TeamModel, as: 'teamAway', attributes: ['teamName'] }] }) as AwayTeam[];
    const { wins, draws, losses } = LeaderboardHelper.score(matches, filter);
    const { goalsFavor, goalsOwn } = LeaderboardHelper.goals(matches, filter);
    return {
      name: matches[0]['teamAway.teamName'],
      totalPoints: (wins * 3) + draws,
      totalGames: matches.length,
      totalVictories: wins,
      totalDraws: draws,
      totalLosses: losses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: `${((((wins * 3) + draws) / (matches.length * 3)) * 100).toFixed(2)}`,
    };
  }

  static async list(filter: string) {
    const teams = await TeamsService.list();
    const leaderboard = await Promise.all(teams.map(({ id }: Team) => this.calculate(id, filter)));
    return LeaderboardHelper.sort(leaderboard);
  }
}
