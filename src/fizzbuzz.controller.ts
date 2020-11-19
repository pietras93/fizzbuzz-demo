import { Body, Controller, Post } from '@nestjs/common';
import { FizzBuzzService } from './fizzbuzz.service';
import { GetFizzBuzzDto } from './fizzbuzz.dto';

@Controller()
export class FizzBuzzController {
  constructor(private readonly fizzbuzzService: FizzBuzzService) {}

  @Post('/fizzbuzz')
  getFizzBuzz(
    @Body() body: GetFizzBuzzDto,
  ): { error: string; response: string } {
    return {
      error: null,
      response: this.fizzbuzzService.getFizzBuzz(body.count),
    };
  }
}
