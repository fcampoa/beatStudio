import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheduleDate'
})
export class ScheduleDatePipe implements PipeTransform {

private dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

private meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                ];

  transform(d: string): string {
    const aux = new Date(d);
    return aux.getDate() + this.dias[aux.getDay() - 1].toUpperCase() + this.meses[aux.getMonth()];
  }
}
