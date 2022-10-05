import TeamModel from '../database/models/team.model';
import MatchesModel from '../database/models/match.model';
import INewTeam from '../interfaces/INewTeam';
import ValidateServices from './validate.service';
import INewScore from '../interfaces/INewScore';

class MatchesServices {
  static async list() {
    const matches = await MatchesModel
      .findAll({ include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ] });
    return matches;
  }

  static async listFiltered(query: boolean) {
    const matches = await MatchesModel
      .findAll({ where: { inProgress: query },
        include: [
          { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
          { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
        ] });
    return matches;
  }

  static async add({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: INewTeam) {
    if (homeTeam === awayTeam) {
      throw ValidateServices
        .customError(
          'EqualTeamsError',
          'It is not possible to create a match with two equal teams',
        );
    }
    await this.find(+homeTeam);
    await this.find(+awayTeam);
    const newMatch = await MatchesModel
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
    return newMatch;
  }

  static async finish(id: number) {
    await MatchesModel.update({ inProgress: false }, { where: { id } });
  }

  static async find(id: number) {
    const team = await TeamModel.findOne({ where: { id } });
    if (!team) {
      throw ValidateServices.customError('TeamNotFoundError', 'There is no team with such id!');
    }
    return team;
  }

  static async update({ homeTeamGoals, awayTeamGoals }: INewScore, id: number) {
    await MatchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}

export default MatchesServices;
