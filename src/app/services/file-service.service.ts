import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { GlobalApiService } from '../Core';
import { Horario } from '../model/horario';
import * as m  from 'moment';
import * as XLSX from 'xlsx';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class FileService {
    constructor(private apiSvc: GlobalApiService) { }

    imprimirListaClase(horario: Horario) {
        this.apiSvc.routes.reservacion_detalle.listaClase(horario.id)<any>().subscribe(
            response => {
                const lista = response.data;
                this.exportAsPDF(this.crearTablaLista(lista, horario), 'lista de clase ' + horario.disciplina.nombre + '  hora: ' + m(horario.fecha).format('h:mm a'));
            }
        );
    }

    private crearTablaLista(lista: any, horario: Horario): any {
        return {
            table: {
                widths: ['*', '*', '*'],
                body: [
                    [
                        {
                            text: 'Nombre',
                            style: 'tableHeader'
                        },
                        {
                            text: 'Lugar',
                            style: 'tableHeader'
                        }, {
                            text: 'Firma',
                            style: 'tableHeader'
                        }
                    ],
                    ...lista.map(x => {
                        return [x.nombre, x.lugar, '____________________'];
                    })
                ]
            }
        };

    }

    exportAsPDF(data: any, title: string) {
        const documentDefinition = {  info: {
            title: title,
            author: 'BeatStudio',
          },
           content: data };
        pdfMake.createPdf(documentDefinition).download(title + '.pdf');
    }

    exportarClientes() {
        this.apiSvc.endPoints.cliente.exportarClientes()<any>().subscribe(response => {
           // this.crearExcel(response.data);
        })
    }

    name = 'clientes.xlsx';
    private crearExcel(arregloClientes: any): void {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(arregloClientes);
  
      const book: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
  
      XLSX.writeFile(book, this.name);
    }
}
