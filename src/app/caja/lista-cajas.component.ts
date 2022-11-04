import { Component, OnInit } from '@angular/core';
import { Caja } from '../models';
import { CajaService } from '../services/caja.service';

@Component({
  selector: 'app-lista-cajas',
  templateUrl: './lista-cajas.component.html',
  styleUrls: ['./lista-cajas.component.css'],
})
export class ListaCajasComponent implements OnInit {
  cajas: Caja[] = [];
  constructor(private cajaService: CajaService) {}

  ngOnInit(): void {
    this.cajaService.lista().subscribe(
      (cajas) => (this.cajas = cajas),
      (error) => console.error(error)
    );
  }
}
