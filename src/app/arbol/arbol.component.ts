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
    const cajas = reporte.cajas.map((caja) => ({
      ...caja,
      acumulado: {
        total: caja.total,
      },
    }));
    this.reporte = {
      ...reporte,
      subcategorias: [...reporte.subcategorias, ...cajas],
    };
  }

  ngOnInit(): void {}

  onCellClick(e: any) {
    meses.forEach((mes) => {
      if (e.rowType === 'header' && e.column.caption === mes) {
        e.component.columnOption(
          `Semanas de ${mes}`,
          'visible',
          !e.component.columnOption(`Semanas de ${mes}`).visible
        ); // Hide 'Semanas'
      }
    });
  }
}
