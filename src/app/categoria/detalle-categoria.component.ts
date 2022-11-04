import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../models';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-detalle-categoria',
  templateUrl: './detalle-categoria.component.html',
  styleUrls: ['./detalle-categoria.component.css'],
})
export class DetalleCategoriaComponent implements OnInit {
  categoria!: Categoria;
  constructor(
    private categoriaService: CategoriaService,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { id } = this.rutaActiva.snapshot.params;
    this.categoriaService.detalle(id).subscribe(
      (categoria) => (this.categoria = categoria),
      (err) => console.log(err)
    );
  }
}
