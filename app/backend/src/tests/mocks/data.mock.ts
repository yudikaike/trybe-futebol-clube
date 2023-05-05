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
    homeTeam: 15,
    teamHome: { teamName: 'São Paulo' },
    homeTeamGoals: 2,
    awayTeam: 9,
    teamAway: { teamName: 'Internacional' },
    awayTeamGoals: 0,
    inProgress: true,
  },
  {
    id: 42,
    homeTeam: 6,
    teamHome: { teamName: 'Ferroviária' },
    homeTeamGoals: 1,
    awayTeam: 1,
    teamAway: { teamName: 'Avaí/Kindermann' },
    awayTeamGoals: 0,
    inProgress: true,
  },
  {
    id: 43,
    homeTeam: 11,
    teamHome: { teamName: 'Napoli-SC' },
    homeTeamGoals: 0,
    awayTeam: 10,
    teamAway: { teamName: 'Minas Brasília' },
    awayTeamGoals: 0,
    inProgress: true,
  },
]

const finishedMatches = [
  {
    id: 1,
    homeTeam: 16,
    teamHome: { teamName: 'São Paulo' },
    homeTeamGoals: 1,
    awayTeam: 8,
    teamAway: { teamName: 'Grêmio' },
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 2,
    homeTeam: 9,
    teamHome: { teamName: 'Internacional' },
    homeTeamGoals: 1,
    awayTeam: 14,
    teamAway: { teamName: 'Santos' },
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 3,
    homeTeam: 4,
    teamHome: { teamName: 'Corinthians' },
    homeTeamGoals: 3,
    homeAway: 11,
    teamAway: { teamName: 'Napoli-SC' },
    awayTeamGoals: 0,
    inProgress: false,
  },
]

const inProgressMatches = [
  {
    id: 41,
    homeTeam: 15,
    teamHome: { teamName: 'São Paulo' },
    homeTeamGoals: 2,
    awayTeam: 9,
    teamAway: { teamName: 'Internacional' },
    awayTeamGoals: 0,
    inProgress: true,
  },
  {
    id: 42,
    homeTeam: 6,
    teamHome: { teamName: 'Ferroviária' },
    homeTeamGoals: 1,
    awayTeam: 1,
    teamAway: { teamName: 'Avaí/Kindermann' },
    awayTeamGoals: 0,
    inProgress: true,
  },
  {
    id: 43,
    homeTeam: 11,
    teamHome: { teamName: 'Napoli-SC' },
    homeTeamGoals: 0,
    awayTeam: 10,
    teamAway: { teamName: 'Minas Brasília' },
    awayTeamGoals: 0,
    inProgress: true,
  },
]

const match = {
  id: 41,
  homeTeam: 15,
  teamHome: { teamName: 'São Paulo' },
  homeTeamGoals: 2,
  awayTeam: 9,
  teamAway: { teamName: 'Internacional' },
  awayTeamGoals: 0,
  inProgress: true,
}

const invalidMatch = {
  withSameTeams: { 
    id: 41,
    homeTeam: 1,
    teamHome: { teamName: 'Avaí/Kindermann' },
    homeTeamGoals: 2,
    awayTeam: 1,
    teamAway: { teamName: 'Avaí/Kindermann' },
    awayTeamGoals: 0,
    inProgress: true,
  },

  unexistentTeam: { 
    id: 41,
    homeTeam: 99,
    teamHome: { teamName: '' },
    homeTeamGoals: 2,
    awayTeam: 98,
    teamAway: { teamName: '' },
    awayTeamGoals: 0,
    inProgress: true,
  }
}

const awayLeaderboard = [
  {
    name: 'Palmeiras',
    totalPoints: '6',
    totalGames: '2',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '7',
    goalsOwn: '0',
    goalsBalance: '7',
    efficiency: '100'
  },
  {
    name: 'Corinthians',
    totalPoints: '6',
    totalGames: '3',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '1',
    goalsFavor: '6',
    goalsOwn: '2',
    goalsBalance: '4',
    efficiency: '66.67'
  },
  {
    name: 'Internacional',
    totalPoints: '6',
    totalGames: '2',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '3',
    goalsOwn: '0',
    goalsBalance: '3',
    efficiency: '100'
  },
  {
    name: 'São José-SP',
    totalPoints: '6',
    totalGames: '2',
    totalVictories: '2',
    totalDraws: '0',
    totalLosses: '0',
    goalsFavor: '3',
    goalsOwn: '1',
    goalsBalance: '2',
    efficiency: '100'
  },
  {
    name: 'São Paulo',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '5',
    goalsOwn: '5',
    goalsBalance: '0',
    efficiency: '44.44'
  },
  {
    name: 'Ferroviária',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '4',
    goalsOwn: '5',
    goalsBalance: '-1',
    efficiency: '44.44'
  },
  {
    name: 'Real Brasília',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '3',
    goalsOwn: '4',
    goalsBalance: '-1',
    efficiency: '44.44'
  },
  {
    name: 'Grêmio',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '5',
    goalsOwn: '7',
    goalsBalance: '-2',
    efficiency: '44.44'
  },
  {
    name: 'Flamengo',
    totalPoints: '4',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '1',
    goalsOwn: '3',
    goalsBalance: '-2',
    efficiency: '44.44'
  },
  {
    name: 'Avaí/Kindermann',
    totalPoints: '3',
    totalGames: '2',
    totalVictories: '1',
    totalDraws: '0',
    totalLosses: '1',
    goalsFavor: '1',
    goalsOwn: '1',
    goalsBalance: '0',
    efficiency: '50'
  },
  {
    name: 'Cruzeiro',
    totalPoints: '3',
    totalGames: '3',
    totalVictories: '1',
    totalDraws: '0',
    totalLosses: '2',
    goalsFavor: '6',
    goalsOwn: '7',
    goalsBalance: '-1',
    efficiency: '33.33'
  },
  {
    name: 'Santos',
    totalPoints: '2',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '2',
    totalLosses: '0',
    goalsFavor: '3',
    goalsOwn: '3',
    goalsBalance: '0',
    efficiency: '33.33'
  },
  {
    name: 'Bahia',
    totalPoints: '2',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '2',
    totalLosses: '0',
    goalsFavor: '2',
    goalsOwn: '2',
    goalsBalance: '0',
    efficiency: '33.33'
  },
  {
    name: 'Minas Brasília',
    totalPoints: '1',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '1',
    totalLosses: '1',
    goalsFavor: '1',
    goalsOwn: '3',
    goalsBalance: '-2',
    efficiency: '16.67'
  },
  {
    name: 'Botafogo',
    totalPoints: '0',
    totalGames: '2',
    totalVictories: '0',
    totalDraws: '0',
    totalLosses: '2',
    goalsFavor: '1',
    goalsOwn: '4',
    goalsBalance: '-3',
    efficiency: '0'
  },
  {
    name: 'Napoli-SC',
    totalPoints: '0',
    totalGames: '3',
    totalVictories: '0',
    totalDraws: '0',
    totalLosses: '3',
    goalsFavor: '1',
    goalsOwn: '10',
    goalsBalance: '-9',
    efficiency: '0'
  }
]

export {
  user, 
  requestBody,
  requestBodyWithIncorrectPassword,
  teams,
  team,
  matches,
  finishedMatches,
  inProgressMatches,
  match, 
  invalidMatch,
};
