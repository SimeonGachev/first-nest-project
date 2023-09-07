import {
  Injectable,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import puppeteer from 'puppeteer';
import { signInDto } from 'src/auth/dto/signInDto';
import { steamApiKey } from 'src/constants/constants';
import { CsgoStatsDto } from './dto/csgoStatsDto';

@Injectable()
export class CsgoStatsService {
  async getPlayerStats(steamId: string): Promise<CsgoStatsDto> {
    if (!steamId) throw new UnauthorizedException('User has no steamId');

    const apiUrl = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${steamApiKey}&steamid=${steamId}`;

    try {
      const response = await axios.get(apiUrl);

      const playerAllStats = response.data.playerstats.stats;

      return {
        stats: playerAllStats.filter(
          ({ name }) =>
            name === 'total_kills' ||
            name === 'total_deaths' ||
            name === 'total_time_played' ||
            name === 'total_wins',
        ),
      };
    } catch (error) {
      throw new HttpException(
        `Failed to fetch CS:GO statistics`,
        error.response.status,
      );
    }
  }

  async getPlayerSteamId(credentials: signInDto) {
    const { username, password } = credentials;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://store.steampowered.com/login/');

    await page.type('input[type="text"]', username);
    await page.type('input[type="password"]', password);
    await page.click('#login_btn_signin');

    await page.waitForNavigation();

    await page.goto('https://steamcommunity.com/my/');

    const steamID64 = await page.evaluate(() => {
      const steamID64Element = document.querySelector(
        '.friend_block_content a',
      );
      return steamID64Element ? steamID64Element.textContent : null;
    });

    await browser.close();

    if (steamID64) {
      return steamID64;
    } else {
      throw new NotFoundException('SteamID64 not found');
    }
  }
}
