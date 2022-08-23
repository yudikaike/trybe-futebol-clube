import { Match, Leaderboard } from '../interfaces';

export default class LeaderboardHelper {
  static score(matches: Match[], filter: string, id?: number) {
    return matches.reduce((acc, { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if ((id === homeTeam || filter === 'home') && homeTeamGoals > awayTeamGoals) acc.wins += 1;
      else if ((id === awayTeam || filter === 'away') && homeTeamGoals < awayTeamGoals) {
        acc.wins += 1;
      } else if (homeTeamGoals === awayTeamGoals) acc.draws += 1;
      else acc.losses += 1;
      return acc;
    }, { wins: 0, draws: 0, losses: 0 });
  }

  static goals(matches: Match[], filter: string, id?: number) {
    return matches.reduce((acc, { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if (id === homeTeam || filter === 'home') {
        acc.goalsFavor += +homeTeamGoals;
        acc.goalsOwn += +awayTeamGoals;
      } else if (id === awayTeam || filter === 'away') {
        acc.goalsFavor += +awayTeamGoals;
        acc.goalsOwn += +homeTeamGoals;
      }
      return acc;
    }, { goalsFavor: 0, goalsOwn: 0 });
  }

  static sort(leaderboard: Leaderboard[]) {
    return leaderboard.sort((teamA, teamB) => {
      if (teamB.totalPoints > teamA.totalPoints) return 1;
      if (teamB.totalPoints < teamA.totalPoints) return -1;
      if (teamB.goalsBalance > teamA.goalsBalance) return 1;
      if (teamB.goalsBalance < teamA.goalsBalance) return -1;
      if (teamB.goalsFavor > teamA.goalsFavor) return 1;
      if (teamB.goalsFavor < teamA.goalsFavor) return -1;
      if (teamB.goalsOwn > teamA.goalsOwn) return 1;
      if (teamB.goalsOwn < teamA.goalsOwn) return -1;
      return 0;
    });
  }
}
