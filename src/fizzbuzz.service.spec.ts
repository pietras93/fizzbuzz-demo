import { Test, TestingModule } from '@nestjs/testing';
import { FizzBuzzService } from './fizzbuzz.service';

describe('FizzBuzzService', () => {
  let fizzbuzzService: FizzBuzzService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [FizzBuzzService],
    }).compile();

    fizzbuzzService = app.get<FizzBuzzService>(FizzBuzzService);
  });

  describe('service', () => {
    it('should return proper fizzbuzz', () => {
      expect(fizzbuzzService.getFizzBuzz(15)).toBe(
        '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz',
      );
    });
  });
});
