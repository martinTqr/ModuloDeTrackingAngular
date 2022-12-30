import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { concat } from 'rxjs';
import Swal from 'sweetalert2';
import { volverPaginaAnterior } from '../helper/genreales';
import {
  Caja,
  Categoria,
  Cotizacion,
  NuevoMovimiento,
  UnidadNegocio,
  Usuario,
} from '../models';
import { CajaService } from '../services/caja.service';
import { CategoriaService } from '../services/categoria.service';
import { CotizacionService } from '../services/cotizacion.service';
import { MovimientoService } from '../services/movimiento.service';
import { UnidadNegocioService } from '../services/unidad-negocio.service';
import { UsuarioService } from '../services/usuario.service';

const mensajes = {
  0: 'usuarios',
  1: 'categorias',
  2: 'cajas',
};
@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
  styleUrls: ['./nuevo-movimiento.component.css'],
})
export class NuevoMovimientoComponent implements OnInit {
  constructor(
    private movimientoService: MovimientoService,
    private categoriasService: CategoriaService,
    private cajaService: CajaService,
    private unidadNegocioService: UnidadNegocioService,
    private usuarioService: UsuarioService,
    private cotizacionService: CotizacionService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.validacionDeEntidades();
    this.cargarCotizaciones();
    this.cargarUnidadNegocio();
    console.log(this.movimientoFormulario.value);
  }

  movimientoFormulario = this.fb.group({
    idCaja: ['', Validators.required],
    idUnidadNegocio: [''],
    idCategoria: ['', Validators.required],
    idUsuario: ['', Validators.required],
    fecha: [new Date().toISOString().substring(0, 10), Validators.required],
    detalle: [''],
    monto: ['', [Validators.required, Validators.min(0)]],
    /* cajas: [[{}]], */
  });

  isGeneral: string = 'true';
  categoriaSeleccionadaNombre: string = '-';
  cotizaciones: Cotizacion[] = [];
  cotizacionDeLaFecha: Cotizacion;
  categorias: Categoria[][] = [];
  cajas: Caja[] = [];
  unidadesDeNegocio: UnidadNegocio[] = [];
  usuarios: Usuario[] = [];
  categoriasIndice = {
    out_general: 0,
    in_general: 1,
    out_especificas: 2,
    in_especificas: 3,
  };

  validacionDeEntidades() {
    const mensajeError: string[] = [];
    let indice = 0;
    concat(
      this.usuarioService.lista(),
      this.categoriasService.listaArbol(),
      this.cajaService.lista()
    )
      .forEach((value) => {
        if (value.length === 0) mensajeError.push(mensajes[indice]);
        else {
          if (mensajes[indice] === 'usuarios') this.cargarUsuarios(value);
          if (mensajes[indice] === 'categorias')
            this.cargarCategorias(value as Categoria[]);
          if (mensajes[indice] === 'cajas') this.cargarCajas(value as Caja[]);
        }
        indice++;
      })
      .finally(() => {
        if (mensajeError.length > 0)
          Swal.fire({
            text: `Debera crear ${mensajeError.join(
              ', '
            )} para crear movimientos`,

            icon: 'info',
          }).then(() => {
            volverPaginaAnterior();
          });
      });
  }

  cargarCotizaciones() {
    this.cotizacionService.lista().subscribe((cotizaciones) => {
      if (cotizaciones.length > 0) {
        this.cotizaciones = cotizaciones;
        const ultimaCotizacion = cotizaciones[0];
        this.cotizacionDeLaFecha = ultimaCotizacion;
      }
    });
    this.movimientoFormulario.get('fecha').valueChanges.subscribe((fecha) => {
      this.cotizacionDeLaFecha = this.cotizaciones.find(
        (cotizacion) => cotizacion.fecha <= fecha
      );
    });
  }

  cargarUsuarios(usuarios) {
    this.usuarios = usuarios;
    this.movimientoFormulario.patchValue({
      idUsuario: String(usuarios[0].id),
    });
  }
  cargarUnidadNegocio() {
    this.unidadNegocioService.lista().subscribe({
      next: (unidadesDeNegocio) => {
        this.unidadesDeNegocio = unidadesDeNegocio;
        if (unidadesDeNegocio.length === 1 && this.isGeneral === 'false') {
          this.movimientoFormulario.patchValue({
            idUnidadNegocio: String(unidadesDeNegocio[0].id),
          });
        }
      },
      error: ({ error }) => {
        Swal.fire({ text: error, icon: 'error' });
      },
    });
  }
  cambiarUnidadNegocio(unidades) {
    this.unidadesDeNegocio = unidades;
    if (unidades.length === 1 && this.isGeneral === 'false') {
      this.movimientoFormulario.patchValue({
        idUnidadNegocio: String(unidades[0].id),
      });
    }
  }
  cargarCategorias(cat: Categoria[]) {
    const categorias: Categoria[][] = [[], [], [], []];
    const { in_especificas, in_general, out_especificas, out_general } =
      this.categoriasIndice;
    cat.forEach((categoria) => {
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
  }

  cargarCajas(cajas) {
    this.cajas = cajas;
  }

  montoEnDolares() {
    const monto =
      Number(this.movimientoFormulario.get('monto').value) /
      this.cotizacionDeLaFecha.valor;
    //truncar monto en 2 cifras
    return monto.toFixed(2);
  }

  async cambiarGeneral(isGeneral: boolean) {
    if (!isGeneral) {
      this.isGeneral = 'false';
      this.cambiarUnidadNegocio(this.unidadesDeNegocio);
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
    /* 
    this.movimientoFormulario.get('cajas').value.push({ id: 1, monto: 0 });
    console.log(this.movimientoFormulario.value); */

    if (this.movimientoFormulario.invalid) return;
    let {
      fecha,
      idCaja,
      idUsuario,
      idCategoria,
      idUnidadNegocio,
      detalle,
      monto,
    } = this.movimientoFormulario.value;
    if (this.isGeneral === 'false' && !idUnidadNegocio) return;
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
      fecha: new Date(fecha).toISOString(),
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
          fecha: new Date().toISOString().substring(0, 10),
          idUnidadNegocio: '',
          idUsuario: String(this.usuarios[0].id),
        });
        this.cambiarUnidadNegocio(this.unidadesDeNegocio);
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
