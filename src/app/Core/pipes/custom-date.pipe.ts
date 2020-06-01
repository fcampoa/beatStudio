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
    const value = new Date(d);
    // m().locale();
    // return m(d).format('LL');
    return (value.getDate() + 1) + ' de ' + this.meses[value.getMonth()] + ' del ' + value.getFullYear();
  }
}
