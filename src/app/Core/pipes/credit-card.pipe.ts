import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
  name: 'creditCard'
})
export class CreditCardPipe implements PipeTransform {
  transform(value: string) {
    const res = '\u2022 \u2022 \u2022 \u2022';
   // value = value.replace('-', '');
    return res + value.substring(value.length - 4, value.length);
  }
}
