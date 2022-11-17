import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { meses } from '../constantes/';
import { ReporteService } from '../services/reporte.service';
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

  constructor(
    private reporteService: ReporteService,
    private rutaActiva: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const { id } = this.rutaActiva.snapshot.params;
    const { fechaInicio, fechaFin } = this.rutaActiva.snapshot.queryParams;
    Swal.fire({
      icon: 'info',
      title: 'Cargando...',
      showConfirmButton: false,
    });
    this.reporteService
      .buscarReporteEmpresa(id, fechaInicio, fechaFin)
      .subscribe(
        (data: ReporteEmpresaReducido[]) => {
          this.reporte = data;
          Swal.close();
        },
        ({ error }) =>
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error...',
            text: error.message,
          })
      );
  }
}
