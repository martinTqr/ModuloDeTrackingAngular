import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { obtenerCambios, parsearObjeto } from '../helper';
import { Categoria } from '../models';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css'],
})
export class ListaCategoriaComponent implements OnInit {
  categorias!: Categoria[];
  categoriaPorEditar: Categoria;
  tipo = [
    {
      id: 'in',
      nombre: 'Ingreso',
    },
    {
      id: 'out',
      nombre: 'Egreso',
    },
  ];
  general = [
    {
      id: true,
      nombre: 'General',
    },
    {
      id: false,
      nombre: 'No general',
    },
  ];
  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }
  cargarCategorias() {
    this.categoriaService.lista().subscribe(
      (categorias) => {
        this.categorias = categorias.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
      },
      (err) => console.error(err)
    );
  }
  validarEdicion(e) {
    if (this.categoriaPorEditar) {
      const tieneHijos = this.categorias.find(
        (categoria) => categoria.idCategoriaPadre == this.categoriaPorEditar.id
      );
      const tieneCategoriaPadre = this.categoriaPorEditar.idCategoriaPadre;
      const columnaIsGeneralOTipo =
        e.dataField == 'isGeneral' || e.dataField == 'tipo';
      const esFilaDeDatos = e.parentType == 'dataRow';

      const noPuedeEditar =
        esFilaDeDatos &&
        columnaIsGeneralOTipo &&
        (tieneCategoriaPadre || tieneHijos);

      if (noPuedeEditar) e.editorOptions.disabled = true;
    }
  }
  preparacionDeEdicion(evento) {
    console.log(this.categorias);

    this.categoriaPorEditar = this.categorias.find(
      (categoria) => categoria.id == evento.data.id
    );
  }
  guardado(evento) {
    if (evento?.changes[0].type === 'update') {
      const cambios = evento.changes;

      if (cambios.length > 0) {
        const categoria = cambios[0].data;
        const diferencia = obtenerCambios({
          original: this.categoriaPorEditar,
          modificado: categoria,
        });

        this.categoriaService
          .modificar({ id: categoria.id, categoria: diferencia })
          .subscribe(
            ({ data, mensaje }) => {
              Swal.fire({
                title: mensaje.toUpperCase() + '!',
                text: `Categoria ${data.nombre} actualizada con éxito`,
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
              });
            },
            (err) => console.error(err)
          );
      }
    }
  }

  cambiarTipo(evento) {
    const valor = evento.value === 'Ingreso' ? 'Ingreso' : 'Egreso';
    return valor;
  }
  borrar(evento: any): void {
    const { id } = evento.data;

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
        console.log(error);

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
