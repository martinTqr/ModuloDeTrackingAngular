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
      (data) => {
        console.log(data);
        this.reporte = data;
      },
      ({ error }) => {
        console.log(error);
      }
    );
    /*     const reporte = this.reporteEmpresaService.buscarReporteUnidadDeNegocio();
    const cajas = reporte.cajas.map((caja: Caja) => ({
      ...caja,
      acumulado: {
        total: caja.total,
      },
    }));
    this.reporte = {
      ...reporte,
      subcategorias: [...reporte.subcategorias, ...cajas],
    }; */
  }
}
