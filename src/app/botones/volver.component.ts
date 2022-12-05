import { Component, OnInit } from '@angular/core';
import { volverPaginaAnterior } from '../helper/genreales';

@Component({
  selector: 'boton-volver',
  templateUrl: './volver.component.html',
  styleUrls: ['./volver.component.css'],
})
export class VolverComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  volver() {
    volverPaginaAnterior();
  }
}
