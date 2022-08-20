import TeamModel from '../database/models/team.model';
import { Team } from '../interfaces';

export default class TeamsService {
  static async list(): Promise<Team[]> {
    return TeamModel.findAll();
  }

  static async find(id: number): Promise<Team | null> {
    return TeamModel.findOne({ raw: true, where: { id } });
  }
}
