import { Component, Input, OnInit } from '@angular/core';
import { ArbolService } from './arbol.service';
import { Reporte } from './constante';

@Component({
  selector: 'arbol',
  templateUrl: './arbol.component.html',
  styleUrls: ['./arbol.component.css'],
  providers: [ArbolService],
})
export class ArbolComponent implements OnInit {
  reporte: Reporte;
  @Input() mode!: string;
  constructor(servicio: ArbolService) {
    const reporte = servicio.buscarCategorias();
    this.reporte = reporte;
  }

  ngOnInit(): void {}
}
