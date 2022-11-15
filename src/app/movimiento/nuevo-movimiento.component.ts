import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Caja, Categoria, NuevoMovimiento, UnidadNegocio } from '../models';
import { CajaService } from '../services/caja.service';
import { CategoriaService } from '../services/categoria.service';
import { MovimientoService } from '../services/movimiento.service';
import { UnidadNegocioService } from '../services/unidad-negocio.service';

@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
  styleUrls: ['./nuevo-movimiento.component.css'],
})
export class NuevoMovimientoComponent implements OnInit {
  idUsuario: number = 1;
  idCaja!: number;
  idUnidadNegocio!: number;
  idCategoria!: number;
  monto: number = 0;
  detalle: string = '';
  fecha: string = '';

  categoriaSeleccionadaNombre: string = '-';
  categorias: Categoria[] = [];
  cajas: Caja[] = [];
  unidadesDeNegocio: UnidadNegocio[] = [];
  constructor(
    private movimientoService: MovimientoService,
    private categoriasService: CategoriaService,
    private cajaService: CajaService,
    private unidadNegocioService: UnidadNegocioService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarCajas();
    this.cargarUnidadNegocio();
  }
  cargarUnidadNegocio() {
    this.unidadNegocioService.lista().subscribe((unidadNegocio) => {
      this.unidadesDeNegocio = unidadNegocio;
    });
  }
  cargarCategorias() {
    this.categoriasService.lista().subscribe(
      (categorias) => (this.categorias = categorias),
      (error) => console.error(error)
    );
  }
  cargarCajas() {
    this.cajaService.lista().subscribe(
      (cajas) => (this.cajas = cajas),
      (error) => console.error(error)
    );
  }
  selccionarCategoria(evento: any) {
    if (evento.event.target.tagName.toLowerCase() !== 'span') {
      if (evento.row.node.hasChildren) {
        Swal.fire({
          text: 'Seleccione una categoria sin hijos',
          icon: 'info',
        });
        return;
      }
      const idCateg = evento.row.node.data.id;
      this.idCategoria = idCateg;
      this.categoriaSeleccionadaNombre = evento.row.node.data.nombre;
    }
  }

  crear(): void {
    const fecha = new Date(this.fecha).toISOString();
    const idCategoria = Number(this.idCategoria);
    const idCaja = Number(this.idCaja);
    const idUnidadNegocio = Number(this.idUnidadNegocio);
    const movimiento = new NuevoMovimiento({
      ...this,
      idCaja,
      idUnidadNegocio,
      fecha,
      idCategoria,
    });
    this.movimientoService.crear(movimiento).subscribe(
      ({ mensaje }) =>
        Swal.fire({
          title: 'Movimiento creado',
          text: mensaje,
          icon: 'success',
        }),
      ({ error }) => {
        console.log(error);

        Swal.fire({
          title: 'Error al crear movimiento',
          text: [error.message].map((mensaje: string) => mensaje).join(' '),
          icon: 'error',
        });
      }
    );
  }
}
