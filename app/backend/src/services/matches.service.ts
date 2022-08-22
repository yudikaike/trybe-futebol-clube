import TeamModel from '../database/models/team.model';
import MatchesModel from '../database/models/match.model';

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
}

export default MatchesServices;
