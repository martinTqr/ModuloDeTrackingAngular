import { Component, OnInit } from '@angular/core';
import { meses } from '../constantes/';
import { ReporteEmpresaReducido } from './reporte-emp.interface';
import { ReporteEmpresaService } from './reporte-emp.service';

@Component({
  selector: 'reporte-emp',
  templateUrl: './reporte-emp.component.html',
  styleUrls: ['./reporte-emp.component.css'],
})
export class ReporteEmpComponent implements OnInit {
  reporte: ReporteEmpresaReducido[];
  cantidadDeSemanas: Array<any> = new Array(5);
  semanas: any = [];

  nombreDeMeses: string[] = meses;
  constructor(servicio: ReporteEmpresaService) {
    const reporte = servicio.buscarReporteEmpresaReducido();
    this.reporte = reporte;
    this.semanas = reporte[0].meses[0].semanas;
  }
  ngOnInit(): void {}
}
