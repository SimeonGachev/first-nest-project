import { Role } from 'src/enums/role.enum';
import { Tier } from 'src/enums/tier.enum';

export const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    stats: { wins: 0, bestScore: 0, history: [] },
    roles: [Role.Admin],
    tier: Tier.Tier2,
    referals: [],
    transactions: [],
  },
  {
    id: 2,
    username: 'bighot',
    password: 'mypassword',
    stats: { wins: 0, bestScore: 0, history: [] },
    roles: [Role.User],
    tier: Tier.Tier1,
    referals: [],
    transactions: [],
  },
];
