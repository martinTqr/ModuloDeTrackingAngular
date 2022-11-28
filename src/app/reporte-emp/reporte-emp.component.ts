import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { meses } from '../constantes/';
import { LocalService } from '../services/local.service';
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
    private rutaActiva: ActivatedRoute,
    private localService: LocalService
  ) {}

  ngOnInit(): void {
    const empresa = this.localService.getData('empresa');
    const { fechaInicio, fechaFin } = this.rutaActiva.snapshot.queryParams;
    Swal.fire({
      icon: 'info',
      title: 'Cargando...',
      showConfirmButton: false,
    });
    this.reporteService
      .buscarReporteEmpresa(empresa.id, fechaInicio, fechaFin)
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
  cambiarColorFila(evento) {
    if (evento.data?.nombre === 'Saldo') {
      evento.rowElement.style.backgroundColor = 'rgb(154,154,154,0.32)';
    }
  }
  cambiarColorCelda(evento) {
    const { columnIndex, cellElement, data, displayValue } = evento;
    if (displayValue && columnIndex !== 0 && data?.nombre === 'Saldo') {
      const color = displayValue >= 0 ? '#00ad00' : 'red';
      cellElement.style.backgroundColor = color;
      cellElement.style.color = 'white';
    }
  }
}
