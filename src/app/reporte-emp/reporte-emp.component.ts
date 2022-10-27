import { Component, OnInit } from '@angular/core';
import { meses } from '../constantes';
import { Reporte } from '../interfaces';
import { ReporteEmpresaService } from './reporte-emp.service';

@Component({
  selector: 'reporte-emp',
  templateUrl: './reporte-emp.component.html',
  styleUrls: ['./reporte-emp.component.css'],
})
export class ReporteEmpComponent implements OnInit {
  reportes: Reporte[];
  semanas: Array<any> = new Array(5);
  nombreDeMeses: string[] = meses;
  constructor(servicio: ReporteEmpresaService) {
    const reportes = servicio.buscarReporteEmpresa();

    this.reportes = reportes.map((reporte: Reporte) => ({
      ...reporte,
      subcategorias: [...reporte.subcategorias, ...reporte.cajas],
    }));
  }

  ngOnInit(): void {}
}
