import ITeam from '../interfaces/ITeam';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import TeamsServices from './teams.service';
import ILeaderboard from '../interfaces/ILeaderboard';

class LeaderboardServices {
  static calculateWinsDrawsAndLosses({ homeTeamGoals, awayTeamGoals }: MatchModel) {
    let wins = 0;
    let draws = 0;
    let losses = 0;

    if (homeTeamGoals > awayTeamGoals) wins += 1;
    else if (homeTeamGoals === awayTeamGoals) draws += 1;
    else losses += 1;

    return { wins, draws, losses };
  }

  static getWinsDrawsAndLosses(matches: MatchModel[]) {
    return matches.reduce((acc, curr) => {
      const { wins, draws, losses } = this.calculateWinsDrawsAndLosses(curr);
      acc.wins += wins;
      acc.draws += draws;
      acc.losses += losses;
      return acc;
    }, { wins: 0, draws: 0, losses: 0 });
  }

  static calculateGoals({ homeTeamGoals, awayTeamGoals }: MatchModel) {
    const goalsFavor = homeTeamGoals;
    const goalsOwn = awayTeamGoals;
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static getGoals(matches: MatchModel[]) {
    return matches.reduce((acc, curr) => {
      const { goalsFavor, goalsOwn } = this.calculateGoals(curr);
      acc.goalsFavor += goalsFavor;
      acc.goalsOwn += goalsOwn;
      return acc;
    }, { goalsFavor: 0, goalsOwn: 0 });
  }

  static async calculate(id: number) {
    const teamMatches = await MatchModel.findAll({ where: { homeTeam: id, inProgress: false },
      include: [{ model: TeamModel, as: 'teamHome', attributes: ['teamName'] }] });

    const parsedTeamMatches = JSON.parse(JSON.stringify(teamMatches));
    const { wins, draws, losses } = this.getWinsDrawsAndLosses(parsedTeamMatches);
    const { goalsFavor, goalsOwn } = this.getGoals(parsedTeamMatches);
    const efficiency = (((wins * 3) + draws) / (teamMatches.length * 3)) * 100;

    return {
      name: parsedTeamMatches[0].teamHome.teamName,
      totalPoints: (wins * 3) + draws,
      totalGames: teamMatches.length,
      totalVictories: wins,
      totalDraws: draws,
      totalLosses: losses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: `${efficiency.toFixed(2)}`,
    };
  }

  static async getHomeTeams() {
    const teams = await TeamsServices.list();
    const leaderboard = Promise.all(teams.map((team: ITeam) => this.calculate(team.id)));
    return leaderboard;
  }

  static sortLeaderboard(leaderboard: ILeaderboard[]) {
    return leaderboard.sort((team, otherTeam) => {
      if (otherTeam.totalPoints > team.totalPoints) return 1;
      if (otherTeam.totalPoints < team.totalPoints) return -1;

      if (otherTeam.goalsBalance > team.goalsBalance) return 1;
      if (otherTeam.goalsBalance < team.goalsBalance) return -1;

      if (otherTeam.goalsFavor > team.goalsFavor) return 1;
      if (otherTeam.goalsFavor < team.goalsFavor) return -1;

      if (otherTeam.goalsOwn > team.goalsOwn) return 1;
      if (otherTeam.goalsOwn < team.goalsOwn) return -1;
      return 0;
    });
  }
}

export default LeaderboardServices;

// Victory - 3 points
// Draw - 1 point
// Loss - 0 points

// totalPoints = victory + draw + loss
// goalsBalance = goalsFavor - goalsOwn
// efficiency = totalPoints / (totalGames * 3) * 100
