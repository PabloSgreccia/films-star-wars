import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('/health')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Check if server is up' })
  async obtenerEstado() {
    return 'Server is up!';
  }
}
