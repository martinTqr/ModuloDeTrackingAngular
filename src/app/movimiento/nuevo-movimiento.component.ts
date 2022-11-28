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
    idCaja: ['', Validators.required],
    idUnidadNegocio: [''],
    idCategoria: ['', Validators.required],
    fecha: [new Date().toISOString().substring(0, 10), Validators.required],
    detalle: [''],
    monto: ['', [Validators.required, Validators.min(0)]],
  });
  isGeneral: string = 'true';

  categoriaSeleccionadaNombre: string = '-';
  categorias: Categoria[][] = [];
  cajas: Caja[] = [];
  unidadesDeNegocio: UnidadNegocio[] = [];

  categoriasIndice = {
    out_general: 0,
    in_general: 1,
    out_especificas: 2,
    in_especificas: 3,
  };

  constructor(
    private movimientoService: MovimientoService,
    private categoriasService: CategoriaService,
    private cajaService: CajaService,
    private unidadNegocioService: UnidadNegocioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarUnidadNegocio();
    this.cargarCajas();
  }

  async cargarUnidadNegocio() {
    this.unidadNegocioService.lista().subscribe((unidadNegocio) => {
      this.unidadesDeNegocio = unidadNegocio;
    });
  }
  cargarCategorias() {
    const categorias: Categoria[][] = [[], [], [], []];
    const { in_especificas, in_general, out_especificas, out_general } =
      this.categoriasIndice;
    this.categoriasService.listaArbol().subscribe((lista) => {
      lista.forEach((categoria) => {
        if (categoria.tipo === 'in' && categoria.isGeneral)
          categorias[in_general].push(categoria);

        if (categoria.tipo === 'in' && !categoria.isGeneral)
          categorias[in_especificas].push(categoria);

        if (categoria.tipo === 'out' && categoria.isGeneral)
          categorias[out_general].push(categoria);

        if (categoria.tipo === 'out' && !categoria.isGeneral)
          categorias[out_especificas].push(categoria);
      });
      this.categorias = categorias;
    });
  }

  cargarCajas() {
    return this.cajaService.lista().subscribe((cajas) => {
      this.cajas = cajas;
    });
  }
  async cambiarGeneral(isGeneral: boolean) {
    if (!isGeneral) {
      this.isGeneral = 'false';
      this.cargarUnidadNegocio();
      return;
    }
    this.movimientoFormulario.patchValue({
      idUnidadNegocio: '',
    });
    this.isGeneral = 'true';
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
      evento.data.isGeneral.toString() !== this.isGeneral &&
        this.cambiarGeneral(evento.data.isGeneral);

      const idCateg = evento.row.node.data.id;
      this.movimientoFormulario.patchValue({
        idCategoria: idCateg,
      });
      this.categoriaSeleccionadaNombre = evento.row.node.data.nombre;
    }
  }

  crear(): void {
    console.log(this.movimientoFormulario.value);

    if (this.movimientoFormulario.invalid) return;
    let { fecha, idCaja, idCategoria, idUnidadNegocio, detalle, monto } =
      this.movimientoFormulario.value;
    if (this.isGeneral === 'false' && !idUnidadNegocio) return;
    const idCategoriaNumber = Number(idCategoria);
    const montoNumber = Number(monto);
    const idCajaNumber = Number(idCaja);
    const idUnidadNegocioNumber = Number(idUnidadNegocio);
    const idUsuario = 4;
    const movimiento = new NuevoMovimiento({
      idCaja: idCajaNumber,
      idUnidadNegocio: idUnidadNegocioNumber,
      idCategoria: idCategoriaNumber,
      monto: montoNumber,
      idUsuario,
      fecha,
      detalle,
    });
    this.movimientoService.crear(movimiento).subscribe(
      () => {
        Swal.fire({
          title: 'Movimiento creado',
          icon: 'success',
        });
        this.movimientoFormulario.reset();
        this.movimientoFormulario.patchValue({
          detalle: '',
        });
        this.categoriaSeleccionadaNombre = '-';
      },
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
