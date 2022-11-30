import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Caja, NuevoMovimiento, Usuario } from '../models';
import { CajaService } from '../services/caja.service';
import { MovimientoService } from '../services/movimiento.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-transferencia-caja',
  templateUrl: './transferencia-caja.component.html',
  styleUrls: ['./transferencia-caja.component.css'],
})
export class TransferenciaCajaComponent implements OnInit {
  formularioTransferencia = this.fb.group({
    idCajaOrigen: ['', Validators.required],
    idCajaDestino: ['', Validators.required],
    monto: ['', Validators.required],
  });

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
    console.log(this.formularioTransferencia.value);

    if (this.formularioTransferencia.invalid) return;
    const transferencia = this.formularioTransferencia.value;
    const idCategoriaTransferenciaCajaIng = 0;
    const idCategoriaTransferenciaCajaEgr = -1;
    const detalle = 'Transferencia de caja ';
    //Crear movimiento de caja origen
    const movimientoIng: NuevoMovimiento = {
      idUsuario: this.usuario.id,
      idCaja: Number(transferencia.idCajaOrigen),
      idCategoria: idCategoriaTransferenciaCajaIng,
      monto: Number(transferencia.monto),
      detalle: detalle + 'ingreso',
      fecha: new Date(),
      fechaCreacion: new Date(),
    };
    console.log(movimientoIng);

    this.movimientoService.crear(movimientoIng).subscribe((data) => {
      console.log(data);
    });
    //Crear movimiento de caja destino
    const movimientoEgr: NuevoMovimiento = {
      idUsuario: this.usuario.id,
      idCaja: Number(transferencia.idCajaDestino),
      idCategoria: idCategoriaTransferenciaCajaEgr,
      monto: Number(transferencia.monto),
      detalle: detalle + 'egreso',
      fecha: new Date(),
      fechaCreacion: new Date(),
    };
    this.movimientoService.crear(movimientoEgr).subscribe((data) => {
      console.log(data);
    });
  }
}
