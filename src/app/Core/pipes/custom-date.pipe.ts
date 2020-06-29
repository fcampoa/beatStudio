import { Pipe, PipeTransform } from '@angular/core';
import * as m from 'moment';


@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  private meses = ['Enero',
                  'Febrero',
                  'Marzo',
                  'Abril',
                  'Mayo',
                  'Junio',
                  'Julio',
                  'Agosto',
                  'Septiembre',
                  'Octubre',
                  'Noviembre',
                  'Diciembre'];
  transform(d: string): string {
    const value = m(d);
    // m().locale();
    // return m(d).format('LL');
    return value.date() + ' de ' + this.meses[value.month()] + ' del ' + value.year();
  }
}
