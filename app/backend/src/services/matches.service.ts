import TeamModel from '../database/models/team.model';
import MatchModel from '../database/models/match.model';

export default class MatchesService {
  static list(query: boolean) {
    if (query) {
      return MatchModel.findAll({ where: { inProgress: query },
        include: [
          { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
          { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
        ] });
    }
    return MatchModel.findAll({ include: [
      { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
      { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
    ] });
  }
}
