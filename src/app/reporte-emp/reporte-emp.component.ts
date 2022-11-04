import { Component, OnInit } from '@angular/core';
import { meses } from '../constantes/';
import { ReporteService } from '../services/reporte-emp.service';
import { ReporteEmpresaReducido } from './reporte-emp.interface';

@Component({
  selector: 'reporte-emp',
  templateUrl: './reporte-emp.component.html',
  styleUrls: ['./reporte-emp.component.css'],
  providers: [ReporteService],
})
export class ReporteEmpComponent implements OnInit {
  reporte: ReporteEmpresaReducido[] = [];
  cantidadDeSemanas: Array<any> = new Array(5);
  semanas: any = [];
  nombreDeMeses: string[] = meses;
  constructor(private reporteService: ReporteService) {}
  ngOnInit(): void {
    this.reporteService.buscarReporteEmpresa().subscribe(
      (data: ReporteEmpresaReducido[]) => {
        this.reporte = data;
      },
      ({ error }) => {
        console.log(error);
      }
    );
  }
}
