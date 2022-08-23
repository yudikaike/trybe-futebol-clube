import { Op } from 'sequelize';
import ITeam from '../interfaces/ITeam';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import TeamsServices from './teams.service';
import ILeaderboard from '../interfaces/ILeaderboard';

class LeaderboardServices {
  static calculateWinsDrawsAndLossesHome({ homeTeamGoals, awayTeamGoals }: MatchModel) {
    let wins = 0;
    let draws = 0;
    let losses = 0;

    if (homeTeamGoals > awayTeamGoals) wins += 1;
    else if (homeTeamGoals === awayTeamGoals) draws += 1;
    else losses += 1;

    return { wins, draws, losses };
  }

  static calculateWinsDrawsAndLossesAway({ homeTeamGoals, awayTeamGoals }: MatchModel) {
    let wins = 0;
    let draws = 0;
    let losses = 0;

    if (homeTeamGoals < awayTeamGoals) wins += 1;
    else if (homeTeamGoals === awayTeamGoals) draws += 1;
    else losses += 1;

    return { wins, draws, losses };
  }

  static getWinsDrawsAndLossesHome(matches: MatchModel[]) {
    return matches.reduce((acc, curr) => {
      const { wins, draws, losses } = this.calculateWinsDrawsAndLossesHome(curr);
      acc.wins += wins;
      acc.draws += draws;
      acc.losses += losses;
      return acc;
    }, { wins: 0, draws: 0, losses: 0 });
  }

  static getWinsDrawsAndLossesAway(matches: MatchModel[]) {
    return matches.reduce((acc, curr) => {
      const { wins, draws, losses } = this.calculateWinsDrawsAndLossesAway(curr);
      acc.wins += wins;
      acc.draws += draws;
      acc.losses += losses;
      return acc;
    }, { wins: 0, draws: 0, losses: 0 });
  }

  static calculateGoalsHome({ homeTeamGoals, awayTeamGoals }: MatchModel) {
    const goalsFavor = homeTeamGoals;
    const goalsOwn = awayTeamGoals;
    return { goalsFavor, goalsOwn };
  }

  static calculateGoalsAway({ homeTeamGoals, awayTeamGoals }: MatchModel) {
    const goalsFavor = awayTeamGoals;
    const goalsOwn = homeTeamGoals;
    return { goalsFavor, goalsOwn };
  }

  static getGoalsHome(matches: MatchModel[]) {
    return matches.reduce((acc, curr) => {
      const { goalsFavor, goalsOwn } = this.calculateGoalsHome(curr);
      acc.goalsFavor += goalsFavor;
      acc.goalsOwn += goalsOwn;
      return acc;
    }, { goalsFavor: 0, goalsOwn: 0 });
  }

  static getGoalsAway(matches: MatchModel[]) {
    return matches.reduce((acc, curr) => {
      const { goalsFavor, goalsOwn } = this.calculateGoalsAway(curr);
      acc.goalsFavor += goalsFavor;
      acc.goalsOwn += goalsOwn;
      return acc;
    }, { goalsFavor: 0, goalsOwn: 0 });
  }

  static async calculateHome(id: number) {
    const teamMatches = await MatchModel.findAll({ where: { homeTeam: id, inProgress: false },
      include: [{ model: TeamModel, as: 'teamHome', attributes: ['teamName'] }] });
    const parsedTeamMatches = JSON.parse(JSON.stringify(teamMatches));
    const { wins, draws, losses } = this.getWinsDrawsAndLossesHome(parsedTeamMatches);
    const { goalsFavor, goalsOwn } = this.getGoalsHome(parsedTeamMatches);
    const efficiency = (((wins * 3) + draws) / (teamMatches.length * 3)) * 100;

    return {
      name: JSON.parse(JSON.stringify(teamMatches))[0].teamHome.teamName,
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

  static async calculateAway(id: number) {
    const teamMatches = await MatchModel.findAll({ where: { awayTeam: id, inProgress: false },
      include: [{ model: TeamModel, as: 'teamAway', attributes: ['teamName'] }] });
    const parsedTeamMatches = JSON.parse(JSON.stringify(teamMatches));
    const { wins, draws, losses } = this.getWinsDrawsAndLossesAway(parsedTeamMatches);
    const { goalsFavor, goalsOwn } = this.getGoalsAway(parsedTeamMatches);
    const efficiency = (((wins * 3) + draws) / (teamMatches.length * 3)) * 100;

    return {
      name: parsedTeamMatches[0].teamAway.teamName,
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

  static async getTeamMatches(id: number) {
    const teamMatches = await MatchModel
      .findAll({ where: { [Op.or]: [{ homeTeam: id }, { awayTeam: id }], inProgress: false },
        include: [{ model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
          { model: TeamModel, as: 'teamAway', attributes: ['teamName'] }] });
    return teamMatches;
  }

  static getWinsDrawsAndLosses(id: number, teamMatches: MatchModel[]) {
    const score = { wins: 0, draws: 0, losses: 0 };
    teamMatches.forEach((match) => {
      if (id === match.homeTeam) {
        const { wins, draws, losses } = this.calculateWinsDrawsAndLossesHome(match);
        score.wins += wins;
        score.draws += draws;
        score.losses += losses;
      } else {
        const { wins, draws, losses } = this.calculateWinsDrawsAndLossesAway(match);
        score.wins += wins;
        score.draws += draws;
        score.losses += losses;
      }
    });
    return score;
  }

  static getGoals(id: number, teamMatches: MatchModel[]) {
    const goals = { goalsFavor: 0, goalsOwn: 0 };
    teamMatches.forEach((match) => {
      if (id === match.homeTeam) {
        goals.goalsFavor += match.homeTeamGoals;
        goals.goalsOwn += match.awayTeamGoals;
      } else {
        goals.goalsFavor += match.awayTeamGoals;
        goals.goalsOwn += match.homeTeamGoals;
      }
    });
    return goals;
  }

  static getTeamName(id: number, teamMatches: MatchModel[]) {
    if (id === teamMatches[0].homeTeam) return teamMatches[0].teamHome.teamName;
    return teamMatches[0].teamAway.teamName;
  }

  static async calculateGeneral(id: number) {
    const teamMatches = await this.getTeamMatches(id);
    const parsedTeamMatches = JSON.parse(JSON.stringify(teamMatches));
    const { wins, draws, losses } = this
      .getWinsDrawsAndLosses(id, parsedTeamMatches);
    const { goalsFavor, goalsOwn } = this.getGoals(id, parsedTeamMatches);
    const efficiency = (((wins * 3) + draws) / (teamMatches.length * 3)) * 100;

    return {
      name: this.getTeamName(id, parsedTeamMatches),
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

  static async getTeams(category: string) {
    const teams = await TeamsServices.list();
    if (category === 'home') {
      const leaderboard = Promise.all(teams.map((team: ITeam) => this
        .calculateHome(team.id)));
      return leaderboard;
    }
    if (category === 'away') {
      const leaderboard = Promise.all(teams.map((team: ITeam) => this
        .calculateAway(team.id)));
      return leaderboard;
    }
    const leaderboard = Promise.all(teams.map((team: ITeam) => this
      .calculateGeneral(team.id)));
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
