import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from './arbol.interaces';
import { ArbolService } from './arbol.service';

@Component({
  selector: 'arbol',
  templateUrl: './arbol.component.html',
  styleUrls: ['./arbol.component.css'],
  providers: [ArbolService],
})
export class ArbolComponent implements OnInit {
  reporte: Categoria[];
  @Input() mode!: string;
  constructor(servicio: ArbolService) {
    const reporte = servicio.buscarCategorias();
    this.reporte = reporte;
  }

  ngOnInit(): void {
    if (this.mode === 'in') this.reporte = [this.reporte[0]];
  }
}
