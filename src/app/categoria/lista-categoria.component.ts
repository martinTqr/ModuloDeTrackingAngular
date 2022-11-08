import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css'],
})
export class ListaCategoriaComponent implements OnInit {
  categorias!: Categoria[];
  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.lista().subscribe(
      (categorias) => (this.categorias = categorias),
      (err) => console.error(err)
    );
  }
}
