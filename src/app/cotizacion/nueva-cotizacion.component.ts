import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { parsearFecha } from '../helper';
import { CotizacionService } from '../services/cotizacion.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-nueva-cotizacion',
  templateUrl: './nueva-cotizacion.component.html',
  styleUrls: ['./nueva-cotizacion.component.css'],
})
export class NuevaCotizacionComponent implements OnInit {
  constructor(
    private cotizacionService: CotizacionService,
    private localService: LocalService,
    private fb: FormBuilder
  ) {}
  cotizacionFormulario = this.fb.group({
    valor: ['', Validators.required],
    fecha: [new Date().toISOString().substring(0, 10), Validators.required],
  });
  ngOnInit(): void {}
  crear() {
    if (this.cotizacionFormulario.invalid) return;
    const { id } = this.localService.getData('empresa');
    const { fecha, valor } = this.cotizacionFormulario.value;

    const cotizacion = {
      fecha: parsearFecha(String(fecha)),
      valor: Number(valor),
      idEmpresa: id,
    };
    this.cotizacionService.crear(cotizacion).subscribe(
      () => {
        Swal.fire({
          title: 'Cotización creada',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      },
      ({ error }) =>
        Swal.fire({
          title: 'Error al crear la cotización',
          text: error.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
    );
  }
}
