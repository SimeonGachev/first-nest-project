import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiExcludeController,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';

@ApiExcludeController()
@ApiTags('Hello World')
@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'helloes the world' })
  @ApiResponse({ status: 200, description: 'Hello World' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
