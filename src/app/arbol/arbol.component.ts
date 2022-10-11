import { Component, OnInit } from '@angular/core';
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
  constructor(servicio: ArbolService) {
    this.reporte = servicio.buscarCategorias();
  }
  mostrarMontoDeCaja(data: Categoria) {
    return data.acumulado.cajas.map((caja: any) => `$${caja.total} \n `);
  }
  mostrarCajas(data: Categoria) {
    console.log(data);

    return data.acumulado.cajas.map((caja: any) => `${caja.nombre}: `);
  }

  ngOnInit(): void {}
}
