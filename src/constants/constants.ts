import { config } from 'dotenv';
config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const saltRounds = 10;

export const steamApiKey = process.env.STEAM_API_KEY;

export const lolApiKey = process.env.LOL_API_KEY;

export const fortniteApiKey = process.env.FORTNITE_API_KEY;
