import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { GlobalApiService } from '../Core';
import { Horario } from '../model/horario';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class FileService {
    constructor(private apiSvc: GlobalApiService) { }

    imprimirListaClase(horario: Horario) {
        this.apiSvc.routes.reservacion_detalle.listaClase(horario.id)<any>().subscribe(
            response => {
                const lista = response.data;
                this.exportAsPDF(this.crearTablaLista(lista, horario));
            }
        );
    }

    private crearTablaLista(lista: any, horario: Horario): any {
        return {
            // content: 'lista de clase ' + horario.disciplina.nombre + '  hora:' + horario.fecha ,
            // {
            //     text: 'clase: ' + horario.disciplina.nombre + '  hora:' + horario.fecha + '  coach: ' + horario.coach.nombre,
            //     bold: true,
            //     fontSize: 20,
            //     alignment: 'center',
            //     margin: [0, 0, 0, 20]
            // },
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

    exportAsPDF(data: any) {
        const documentDefinition = { content: data };
        pdfMake.createPdf(documentDefinition).download();
    }

}
