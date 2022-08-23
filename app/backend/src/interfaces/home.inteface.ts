import MatchModel from '../database/models/match.model';

export default interface HomeTeam extends MatchModel {
  'teamHome.teamName': string
}
