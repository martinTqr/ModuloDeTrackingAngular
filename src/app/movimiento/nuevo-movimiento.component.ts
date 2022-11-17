import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  movimientoFormulario = this.fb.group({
    idUsuario: ['4', Validators.required],
    idCaja: ['', Validators.required],
    idUnidadNegocio: [''],
    idCategoria: ['', Validators.required],
    fecha: ['', Validators.required],
    detalle: [''],
    monto: ['', Validators.required, Validators.min(0)],
  });
  isGeneral: string = 'true';

  categoriaSeleccionadaNombre: string = '-';
  categorias: Categoria[] = [];
  cajas: Caja[] = [];
  unidadesDeNegocio: UnidadNegocio[] = [];
  constructor(
    private movimientoService: MovimientoService,
    private categoriasService: CategoriaService,
    private cajaService: CajaService,
    private unidadNegocioService: UnidadNegocioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargarCategorias(true);
    this.cargarUnidadNegocio();
    this.cargarCajas();
  }

  async cargarUnidadNegocio() {
    this.unidadNegocioService.lista().subscribe((unidadNegocio) => {
      this.unidadesDeNegocio = unidadNegocio;
    });
  }
  cargarCategorias(isGeneral: boolean) {
    this.categoriasService
      .listaArbol()
      .subscribe(
        (categorias) =>
          (this.categorias = categorias.filter(
            (categoria) => categoria.isGeneral === isGeneral
          ))
      );
  }
  cargarCajas() {
    return this.cajaService.lista().subscribe((cajas) => {
      this.cajas = cajas;
    });
  }
  async cambiarGeneral(evento: any) {
    console.log(evento);

    this.cargarCategorias(this.isGeneral === 'true');
    if (this.isGeneral === 'true') {
      this.movimientoFormulario.patchValue({
        idUnidadNegocio: '',
        idCategoria: '',
      });
    } else {
      this.cargarUnidadNegocio();
    }
    this.categoriaSeleccionadaNombre = '-';
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
      this.movimientoFormulario.patchValue({
        idCategoria: idCateg,
      });
      this.categoriaSeleccionadaNombre = evento.row.node.data.nombre;
    }
  }

  crear(): void {
    if (this.movimientoFormulario.invalid) return;
    let {
      fecha,
      idCaja,
      idCategoria,
      idUnidadNegocio,
      idUsuario,
      detalle,
      monto,
    } = this.movimientoFormulario.value;

    const idCategoriaNumber = Number(idCategoria);
    const montoNumber = Number(monto);
    const idCajaNumber = Number(idCaja);
    const idUnidadNegocioNumber = Number(idUnidadNegocio);
    const idUsuarioNumber = Number(idUsuario);

    const movimiento = new NuevoMovimiento({
      idCaja: idCajaNumber,
      idUnidadNegocio: idUnidadNegocioNumber,
      idCategoria: idCategoriaNumber,
      monto: montoNumber,
      idUsuario: idUsuarioNumber,
      fecha,
      detalle,
    });
    this.movimientoService.crear(movimiento).subscribe(
      ({ mensaje }) =>
        Swal.fire({
          title: 'Movimiento creado',
          text: mensaje,
          icon: 'success',
        }),
      ({ error }) => {
        Swal.fire({
          title: 'Error al crear movimiento',
          text: [error.message].map((mensaje: string) => mensaje).join(' '),
          icon: 'error',
        });
      }
    );
  }
}
