import * as bcryptjs from 'bcryptjs';

const user = {
  id: 1,
  username: "testUsername",
  role: "testRole",
  email: "test@email.com",
  password: bcryptjs.hashSync('testPassword'),
};

const requestBody = {
  email: "test@email.com",
  password: "testPassword",
};

const requestBodyWithIncorrectPassword = {
  email: "test@email.com",
  password: "passwordTest",
};

const teams = [
  { id: 1, teamName: 'Avaí/Kindermann' },
  { id: 2, teamName: 'Bahia' },
  { id: 3, teamName: 'Botafogo' },
  { id: 4, teamName: 'Corinthians' },
  { id: 5, teamName: 'Cruzeiro' },
  { id: 6, teamName: 'Ferroviária' },
  { id: 7, teamName: 'Flamengo' },
  { id: 8, teamName: 'Grêmio' },
  { id: 9, teamName: 'Internacional' },
  { id: 10, teamName: 'Minas Brasília' },
  { id: 11, teamName: 'Napoli-SC' },
  { id: 12, teamName: 'Palmeiras' },
  { id: 13, teamName: 'Real Brasília' },
  { id: 14, teamName: 'Santos' },
  { id: 15, teamName: 'São José-SP' },
  { id: 16, teamName: 'São Paulo' },
]

const team = {
  id: 1,
  teamName: 'Avaí/Kindermann',
}

const matches = [
  {
    id: 41,
    homeTeam: { teamName: 'São Paulo' },
    homeTeamGoals: '2',
    awayTeam: { teamName: 'Internacional' },
    awayTeamGoals: '0',
    inProgress: true,
  },
  {
    id: 42,
    homeTeam: { teamName: 'Ferroviária' },
    homeTeamGoals: '1',
    awayTeam: { teamName: 'Avaí/Kindermann' },
    awayTeamGoals: '0',
    inProgress: true,
  },
  {
    id: 43,
    homeTeam: { teamName: 'Napoli-SC' },
    homeTeamGoals: '0',
    awayTeam: { teamName: 'Minas Brasília' },
    awayTeamGoals: '0',
    inProgress: true,
  },
]

const finishedMatches = [
  {
    id: 1,
    homeTeam: { teamName: 'São Paulo' },
    homeTeamGoals: '1',
    awayTeam: { teamName: 'Grêmio' },
    awayTeamGoals: '1',
    inProgress: false,
  },
  {
    id: 2,
    homeTeam: { teamName: 'Internacional' },
    homeTeamGoals: '1',
    awayTeam: { teamName: 'Santos' },
    awayTeamGoals: '1',
    inProgress: false,
  },
  {
    id: 3,
    homeTeam: { teamName: 'Corinthians' },
    homeTeamGoals: '3',
    awayTeam: { teamName: 'Napoli-SC' },
    awayTeamGoals: '0',
    inProgress: false,
  },
]

const inProgressMatches = [
  {
    id: 41,
    homeTeam: { teamName: 'São Paulo' },
    homeTeamGoals: '2',
    awayTeam: { teamName: 'Internacional' },
    awayTeamGoals: '0',
    inProgress: true,
  },
  {
    id: 42,
    homeTeam: { teamName: 'Ferroviária' },
    homeTeamGoals: '1',
    awayTeam: { teamName: 'Avaí/Kindermann' },
    awayTeamGoals: '0',
    inProgress: true,
  },
  {
    id: 43,
    homeTeam: { teamName: 'Napoli-SC' },
    homeTeamGoals: '0',
    awayTeam: { teamName: 'Minas Brasília' },
    awayTeamGoals: '0',
    inProgress: true,
  },
]

export { user, requestBody, requestBodyWithIncorrectPassword, teams, team, matches, finishedMatches, inProgressMatches };
