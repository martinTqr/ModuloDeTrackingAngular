import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { redireccionar, volverPaginaAnterior } from '../helper/genreales';
import { Caja, NuevoMovimiento, Usuario } from '../models';
import { CajaService } from '../services/caja.service';
import { MovimientoService } from '../services/movimiento.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-transferencia-caja',
  templateUrl: './nueva-transferencia-caja.component.html',
  styleUrls: ['./nueva-transferencia-caja.component.css'],
})
export class NuevaTransferenciaCajaComponent implements OnInit {
  formularioTransferencia = this.fb.group({
    idCajaOrigen: ['', Validators.required],
    idCajaDestino: ['', Validators.required],
    fecha: [new Date().toISOString().substring(0, 10), Validators.required],
    monto: ['', Validators.required],
  });
  fechaHoy = new Date().toISOString().split('T')[0];
  cajas: Caja[] = [];
  usuario: Usuario;
  constructor(
    private cajaService: CajaService,
    private movimientoService: MovimientoService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargarCajas();
    this.cargarUsuario();
  }
  quitarCajaSeleccionada(tipoCaja: string) {
    const idCaja = this.formularioTransferencia.get(`idCaja${tipoCaja}`).value;
    const cajas = this.cajas.filter((caja) => caja.id !== Number(idCaja));
    return cajas;
  }

  cargarCajas() {
    this.cajaService.listaConSaldo().subscribe((cajas) => {
      this.cajas = cajas;
    });
  }
  cargarUsuario() {
    this.usuarioService.lista().subscribe((usuarios) => {
      this.usuario = usuarios[0];
    });
  }

  crear() {
    if (this.formularioTransferencia.invalid) return;

    Swal.fire({
      title: 'Confirmacion',
      text: 'Esta seguro de realizar la transferencia?',
      icon: 'info',
      showCancelButton: true,
    })
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          const transferencia = this.formularioTransferencia.value;
          const idCategoriaTransferenciaCajaIng = 0;
          const idCategoriaTransferenciaCajaEgr = -1;
          const detalle = 'Transferencia de caja ';

          const movimientoEgr: NuevoMovimiento = {
            idUsuario: this.usuario.id,
            idCaja: Number(transferencia.idCajaOrigen),
            idCategoria: idCategoriaTransferenciaCajaEgr,
            monto: Number(transferencia.monto),
            detalle: detalle + 'egreso',
            fecha: new Date(transferencia.fecha),
            fechaCreacion: new Date(),
          };
          this.movimientoService.crear(movimientoEgr).subscribe({
            next: ({ data }) => {
              if (data) {
                const movimientoIng: NuevoMovimiento = {
                  idUsuario: this.usuario.id,
                  idCaja: Number(transferencia.idCajaDestino),
                  idCategoria: idCategoriaTransferenciaCajaIng,
                  monto: Number(transferencia.monto),
                  detalle: detalle + 'ingreso',
                  fecha: new Date(transferencia.fecha),
                  fechaCreacion: new Date(),
                };
                this.movimientoService.crear(movimientoIng).subscribe({
                  next: () => {
                    Swal.fire({
                      title: 'Transferencia realizada',
                      icon: 'success',
                      timer: 2000,
                      timerProgressBar: true,
                    }).then(() => redireccionar('/caja/transferencia/lista'));
                  },
                  error: ({ error }) => {
                    Swal.fire('Error', error.message, 'error');
                  },
                });
              }
            },
            error: ({ error }) => {
              Swal.fire('Error', error.message, 'error');
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);

        Swal.fire('Error', 'Intente nuevamente', 'error');
      });
  }
}
