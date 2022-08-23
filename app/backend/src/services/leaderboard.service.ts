import { Op } from 'sequelize';
import { Team, Match } from '../interfaces';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import TeamsService from './teams.service';
import LeaderboardHelper from './leaderboard.helper.service';

export default class LeaderboardService {
  static index(id: number, matches: Match[]) {
    if (id === matches[0].homeTeam) return 'teamHome.teamName';
    return 'teamAway.teamName';
  }

  static async calculate(id: number, filter: string) {
    const matches = await MatchModel.findAll({ raw: true,
      where: { [Op.or]: [{ homeTeam: id }, { awayTeam: id }], inProgress: false },
      include: [{ model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] }] });
    const { wins, draws, losses } = LeaderboardHelper.score(matches, filter, id);
    const { goalsFavor, goalsOwn } = LeaderboardHelper.goals(matches, filter, id);
    return {
      name: matches[0][this.index(id, matches) as keyof Match],
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
