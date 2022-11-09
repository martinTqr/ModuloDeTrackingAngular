import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Caja, Categoria, NuevoMovimiento } from '../models';
import { CajaService } from '../services/caja.service';
import { CategoriaService } from '../services/categoria.service';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
  styleUrls: ['./nuevo-movimiento.component.css'],
})
export class NuevoMovimientoComponent implements OnInit {
  idUsuario: number = 4;
  idCaja: any = 8;
  idUnidadNegocio: number = 9;
  idCategoria: number = 28;
  monto: number = 0;
  detalle: string = '';
  fecha: string = '';
  categorias: Categoria[] = [];
  cajas: Caja[] = [];
  constructor(
    private movimientoService: MovimientoService,
    private categoriasService: CategoriaService,
    private cajaService: CajaService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarCajas();
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

  crear(): void {
    console.log(this.idCategoria);

    const fecha = new Date(this.fecha).toISOString();
    const idCategoria = +this.idCategoria;
    const movimiento = new NuevoMovimiento({ ...this, fecha, idCategoria });
    this.movimientoService.crear(movimiento).subscribe(
      ({ mensaje }) =>
        swal.fire({
          title: 'Movimiento creado',
          text: mensaje,
          icon: 'success',
        }),
      ({ error }) =>
        swal.fire({
          title: 'Error al crear movimiento',
          text: error.message.map((mensaje: string) => mensaje).join(' '),
          icon: 'error',
        })
    );
  }
}
