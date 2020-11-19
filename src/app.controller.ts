import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetFizzBuzzDto } from './fizzbuzz.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/fizzbuzz')
  getFizzBuzz(
    @Body() body: GetFizzBuzzDto,
  ): { error: string; response: string } {
    return { error: null, response: this.appService.getFizzBuzz(body.count) };
  }
}
