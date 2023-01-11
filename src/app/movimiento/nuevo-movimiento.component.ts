import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
  catchError,
  concat,
  forkJoin,
  map,
  Observable,
  of,
  tap,
  throwError,
  zip,
} from 'rxjs';
import Swal from 'sweetalert2';
import { volverPaginaAnterior } from '../helper/genreales';
import {
  Caja,
  Categoria,
  Cotizacion,
  NuevoMovimiento,
  TipoCategoria,
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
    this.agregarCajaNueva();
  }

  movimientoFormulario = this.fb.group({
    cajaNueva: [''],
    idUnidadNegocio: [''],
    idCategoria: ['', Validators.required],
    idUsuario: ['', Validators.required],
    fecha: [new Date().toISOString().substring(0, 10), Validators.required],
    detalle: [''],
    cajas: this.fb.array([], [this.validarCajas]),
  });

  isAgregando = false;
  isGeneral: string = 'true';
  cotizaciones: Cotizacion[] = [];
  cotizacionDeLaFecha: Cotizacion;
  categoriaSeleccionada: Categoria;
  categorias: Categoria[][] = [];
  cajas: Caja[] = [];
  unidadesDeNegocio: UnidadNegocio[] = [];
  usuarios: Usuario[] = [];
  categoriasIndice = {
    out_general: 0,
    out_no_generales: 1,
    in_general: 2,
    in_no_generales: 3,
  };
  movimientosCorrectos = [];
  movimientosIncorrectos = [];

  validarCajas(control: AbstractControl) {
    const cajas = control.value;
    const noHayCajas = cajas.length === 0;
    const cajasSinTotal = cajas.every((caja) => caja.total === '');

    if (noHayCajas) return { error: 'Debe agregar al menos una caja' };

    if (cajasSinTotal)
      return { error: 'Debe agregar al menos una caja con total' };

    return null;
  }

  agregarCajaNueva() {
    this.movimientoFormulario
      .get('cajaNueva')
      .valueChanges.subscribe((idCaja) => {
        const cajaNueva = this.cajas.find(
          (caja) => Number(caja.id) === Number(idCaja)
        );
        this.agregarCajaAlFormulario(cajaNueva);

        this.isAgregando = false;
      });
  }
  validacionDeEntidades() {
    const mensajeError: string[] = [];
    let indice = 0;
    concat(
      this.usuarioService.lista(),
      this.categoriasService.listaArbol(),
      this.cajaService.listaConSaldo()
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
    const { in_no_generales, in_general, out_no_generales, out_general } =
      this.categoriasIndice;
    cat.forEach((categoria) => {
      if (categoria.tipo === 'in' && categoria.isGeneral)
        categorias[in_general].push(categoria);

      if (categoria.tipo === 'in' && !categoria.isGeneral)
        categorias[in_no_generales].push(categoria);

      if (categoria.tipo === 'out' && categoria.isGeneral)
        categorias[out_general].push(categoria);

      if (categoria.tipo === 'out' && !categoria.isGeneral)
        categorias[out_no_generales].push(categoria);
    });
    this.categorias = categorias;
  }

  cargarCajas(cajas) {
    this.cajas = cajas;

    const cajasModifica: any[] = cajas.map((caja) => ({
      id: caja.id,
      nombre: caja.nombre,
      grupo: caja.grupoCaja.nombre,
      saldo: caja.total,
      total: '',
      prioritaria: caja.prioritaria,
    }));

    const cajasPrioritarias = cajasModifica.filter((caja) => caja.prioritaria);
    const cajasControl = this.cajasFormulario;

    cajasPrioritarias.forEach((caja) => {
      console.log(caja);

      cajasControl.push(this.transformarCaja(caja));
    });
  }
  transformarCaja({ id, nombre, grupo, saldo }) {
    return this.fb.group({
      id: [id],
      nombre: [nombre],
      grupo: [grupo],
      saldo: [saldo],
      total: [''],
    });
  }
  get cajasFormulario(): any {
    return this.movimientoFormulario.get('cajas');
  }
  get categriaFormulario(): any {
    return this.movimientoFormulario.get('idCategoria');
  }
  agregarCaja() {
    this.isAgregando = !this.isAgregando;
  }

  agregarCajaAlFormulario(caja: Caja) {
    const {
      id,
      nombre,
      grupoCaja: { nombre: grupo },
      total,
    } = caja;
    this.cajasFormulario.push(
      this.fb.group({
        id: [id],
        nombre: [nombre],
        grupo: [grupo],
        total: [''],
        saldo: [total],
      })
    );
  }
  borrarCaja(cajaControl) {
    const cajasControl = this.cajasFormulario;
    const index = cajasControl.value.findIndex(
      (c) => c.id === cajaControl.value.id
    );

    cajasControl.removeAt(index);
  }
  cajasParaAgregar() {
    const cajasFormulario = this.cajasFormulario.value;
    let cajasParaAgregar = this.cajas.filter((caja) => {
      const cajaNoEstaEnFormulario =
        cajasFormulario.findIndex((c) => c.id === caja.id) === -1;
      return cajaNoEstaEnFormulario;
    });

    cajasParaAgregar = cajasParaAgregar.filter((caja) => {
      if (this.categoriaSeleccionada) {
        if (
          (this.categoriaSeleccionada.tipo === TipoCategoria.out &&
            caja.total != 0) ||
          this.categoriaSeleccionada.tipo === TipoCategoria.in
        )
          return true;
        else return false;
      } else return true;
    });

    return cajasParaAgregar;
  }
  totalEnDolares() {
    const total =
      Number(this.movimientoFormulario.get('total').value) /
      this.cotizacionDeLaFecha.valor;
    //truncar total en 2 cifras
    return total.toFixed(2);
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
      this.categoriaSeleccionada = evento.row.node.data;
    }
  }

  crear() {
    if (this.movimientoFormulario.invalid) return;
    let { fecha, cajas, idUsuario, idCategoria, idUnidadNegocio, detalle } =
      this.movimientoFormulario.value;

    if (this.isGeneral === 'false' && !idUnidadNegocio) return;
    const idCategoriaNumber = Number(idCategoria);
    const idUnidadNegocioNumber = Number(idUnidadNegocio);
    const idUsuarioNumber = Number(idUsuario);
    const cajasConTotal: any = cajas.filter((caja: any) => caja.total);
    let suscripciones = [];
    cajasConTotal.forEach((caja: any) => {
      const movimiento = new NuevoMovimiento({
        idCaja: caja.id,
        idUnidadNegocio: idUnidadNegocioNumber,
        idCategoria: idCategoriaNumber,
        monto: caja.total,
        idUsuario: idUsuarioNumber,
        fecha: new Date(fecha).toISOString(),
        detalle,
      });

      suscripciones.push(this.movimientoService.crear(movimiento));
    });
    concat(...suscripciones)
      .forEach(({ data: movimiento }) => {
        const mensaje = `Monto: ${movimiento.monto} - Caja: ${movimiento.caja.nombre} - Categoria: ${movimiento.categoria.nombre}`;
        this.movimientosCorrectos.push(mensaje);
      })
      .catch(({ error }) => {
        const mensaje = [error.message]
          .map((mensaje: string) => mensaje)
          .join(' ');
        this.movimientosIncorrectos.push(mensaje);
      })
      .finally(() => {
        if (this.movimientosCorrectos.length > 0) {
          this.cajaService.listaConSaldo().subscribe({
            next: (cajas) => {
              this.cajas = cajas;
              this.cajasFormulario.value.forEach((caja, index) => {
                const cajaEncontrada = cajas.find((c) => c.id === caja.id);
                if (cajaEncontrada) {
                  this.cajasFormulario.value[index].saldo =
                    cajaEncontrada.total;
                }
              });
            },
          });
          Swal.fire({
            title: 'Movimientos creados',
            html: this.movimientosCorrectos.join(' <br/> '),
            icon: 'success',
          }).then(() => {
            if (this.movimientosIncorrectos.length > 0) {
              Swal.fire({
                title: 'Movimientos no creados',
                html: this.movimientosIncorrectos.join(' <br/> '),
                icon: 'error',
              });
            }
          });
        } else if (this.movimientosIncorrectos.length > 0) {
          Swal.fire({
            title: 'Movimientos no creados',
            html: this.movimientosIncorrectos.join(' <br/> '),
            icon: 'error',
          });
        }
        this.movimientoFormulario.patchValue({
          detalle: '',
          idUnidadNegocio: '',
        });
        this.cambiarUnidadNegocio(this.unidadesDeNegocio);

        this.cajasFormulario.controls.forEach((caja) =>
          caja.get('total').reset()
        );
        this.movimientosCorrectos = [];
        this.movimientosIncorrectos = [];
        suscripciones = [];
        this.cajaService.listaConSaldo().subscribe({
          next: (cajas) => {
            this.cajas = cajas;
          },
        });
      });
  }
}
