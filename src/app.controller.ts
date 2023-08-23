import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Hello World')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'hellos the world' })
  @ApiResponse({ status: 200, description: 'Hello World' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
