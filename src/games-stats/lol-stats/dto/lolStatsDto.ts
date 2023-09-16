import { ApiProperty } from '@nestjs/swagger';

export enum LolRegion {
  BR1 = 'br1',
  EUN1 = 'eun1',
  EUW1 = 'euw1',
  JP1 = 'jp1',
  KR = 'kr',
  LA1 = 'la1',
  LA2 = 'la2',
  NA1 = 'na1',
  OC1 = 'oc1',
  TR1 = 'tr1',
  RU = 'ru',
  PH2 = 'ph2',
  SG2 = 'sg2',
  TH2 = 'th2',
  TW2 = 'tw2',
  VN2 = 'vn2',
}

export const regionGroups = {
  br1: 'americas',
  eun1: 'europe',
  euw1: 'europe',
  jp1: 'asia',
  kr: 'asia',
  la1: 'americas',
  la2: 'americas',
  na1: 'americas',
  oc1: 'sea',
  tr1: 'europe',
  ru: 'europe',
  ph2: 'asia',
  sg2: 'asia',
  th2: 'asia',
  tw2: 'asia',
  vn2: 'asia',
};

export class LolStatsDto {
  @ApiProperty({
    example: LolRegion.EUW1,
    description: 'region of the summoner',
  })
  region: LolRegion;

  @ApiProperty({ example: 'username', description: 'summoner name' })
  summonerName: string;

  matchId?: string;
}
