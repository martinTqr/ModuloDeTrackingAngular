import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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
  borrar(id: any): void {
    this.categoriaService.borrar(id).subscribe(
      () => {
        this.categorias = this.categorias.filter(
          (categoria) => categoria.id !== id
        );
        Swal.fire(
          'Categoria borrada',
          `Categoria ${id} eliminada con éxito`,
          'success'
        );
      },
      ({ error }) => {
        const mensajeError = error?.categorias
          ? error.mensaje +
            ': ' +
            error.categorias.map((c: any) => c.nombre).join(', ')
          : error.mensaje;
        Swal.fire('Error!', mensajeError, 'error');
      }
    );
  }
}
