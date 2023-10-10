import { z } from 'zod';

export const configSchema = z.object({
  JWT_SECRET: z.string({ required_error: 'JWT secret must be provided' }),

  STEAM_API_KEY: z.string({ required_error: 'Steam API key must be provided' }),

  RIOT_API_KEY: z.string({ required_error: 'Riot API key must be provided' }),

  FORTNITE_API_KEY: z.string({
    required_error: 'Fortnite API key must be provided',
  }),

  BRAWLSTARS_API_KEY: z.string({
    required_error: 'Brawlstars API key must be provided',
  }),

  CLASHROYALE_API_KEY: z.string({
    required_error: 'Clashroyale API key must be provided',
  }),

  CLASHOFCLANS_API_KEY: z.string({
    required_error: 'Clash of clans API key must be provided',
  }),

  API_KEY: z.string({ required_error: 'API key must be provided' }),
});

export type ConfigDto = z.infer<typeof configSchema>;
