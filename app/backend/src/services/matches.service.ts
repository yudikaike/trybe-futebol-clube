import TeamModel from '../database/models/team.model';
import MatchesModel from '../database/models/match.model';
import INewTeam from '../interfaces/INewTeam';

class MatchesServices {
  static async list(query: boolean) {
    if (query) {
      const matches = await MatchesModel
        .findAll({ where: { inProgress: query },
          include: [
            { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
            { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
          ] });
      return matches;
    }
    const matches = await MatchesModel
      .findAll({ include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ] });
    return matches;
  }

  static async add({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: INewTeam) {
    const newMatch = await MatchesModel
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
    return newMatch;
  }
}

export default MatchesServices;
