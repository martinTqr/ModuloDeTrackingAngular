import { Component, Input, OnInit } from '@angular/core';
import { ArbolService } from './arbol.service';
import { meses, Reporte } from './constante';

@Component({
  selector: 'arbol',
  templateUrl: './arbol.component.html',
  styleUrls: ['./arbol.component.css'],
  providers: [ArbolService],
})
export class ArbolComponent implements OnInit {
  reporte: Reporte;
  semanasEnero: boolean = true;
  categoriasIngreso: number | undefined;
  semanas: Array<any> = new Array(5);
  meses: string[] = meses;
  @Input() mode!: string;

  constructor(servicio: ArbolService) {
    const reporte = servicio.buscarCategorias();
    const ingresos = [reporte.subcategorias[0], reporte.subcategorias[0]];
    this.reporte = {
      ...reporte,
      subcategorias: [...reporte.subcategorias, ...reporte.cajas],
    };
  }

  ngOnInit(): void {}

  onCellClick(e: any) {
    if (e.rowType === 'header' && e.column.caption === 'Febrero') {
      e.component.columnOption(
        'Semanas',
        'visible',
        !e.component.columnOption('Semanas').visible
      ); // Hide 'Semanas'
    }
  }
}
