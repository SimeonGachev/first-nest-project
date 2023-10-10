export enum ValRegion {
  AP = 'ap',
  BR = 'br',
  ESPORTS = 'esports',
  EU = 'eu',
  KR = 'kr',
  LATAM = 'latam',
  NA = 'na',
}
export const valRegionGroups = {
  ap: 'asia',
  br: 'americas',
  esports: 'esports',
  eu: 'europe',
  kr: 'asia',
  latam: 'americas',
  na: 'americas',
};

export class ValorantStatsDto {
  gameName: string;
  tagLine: string;
  region: ValRegion;
  matchId?: string;
}
