import { Injectable } from '@nestjs/common';

@Injectable()
export class FizzBuzzService {
  getFizzBuzz(n: number): string {
    const elements = [];

    for (let i = 1; i <= n; i++) {
      let value = '';
      if (i % 3 === 0) {
        value += 'Fizz';
      }
      if (i % 5 === 0) {
        value += 'Buzz';
      }
      if (!value) {
        value += i;
      }
      elements.push(value);
    }

    return elements.join(' ');
  }
}
