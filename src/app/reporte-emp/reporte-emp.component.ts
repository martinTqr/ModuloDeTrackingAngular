import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FilasColores, meses } from '../helper/constantes';
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
  dolar: boolean = false;
  constructor(
    private reporteService: ReporteService,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarReporte();
  }
  cargarReporte() {
    const { fechaInicio, fechaFin } = this.rutaActiva.snapshot.queryParams;
    Swal.fire({
      icon: 'info',
      title: 'Cargando...',
      showConfirmButton: false,
    });

    this.reporteService
      .buscarReporteEmpresa({ fechaInicio, fechaFin, dolar: this.dolar })
      .subscribe(
        (reporte: ReporteEmpresaReducido[]) => {
          const categorias = reporte.map((categoria) => {
            return formatearObjeto(categoria);
          });
          this.reporte = categorias;
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
  cambiarDolar() {
    this.dolar = !this.dolar;
    this.cargarReporte();
  }
  cambiarColorCelda(evento) {
    const { cellElement, data } = evento;

    const color =
      FilasColores[data.nombre.toLowerCase()] || FilasColores.blanco;
    cellElement.style.backgroundColor = color;
    cellElement.style.color = FilasColores[data.nombre.toLowerCase()]
      ? FilasColores.blanco
      : 'black';
  }
}
const formatearObjeto = (objeto: any): ReporteEmpresaReducido => {
  return {
    nombre: objeto.nombre,
    acumulado: objeto.acumulado,
    meses: objeto.meses,
    subcategorias:
      objeto?.subcategorias &&
      objeto.subcategorias.map((subcategoria) => {
        return formatearObjeto(subcategoria);
      }),
  };
};
