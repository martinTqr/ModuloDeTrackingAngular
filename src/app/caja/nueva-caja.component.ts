import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CajaService } from '../services/caja.service';
import swal from 'sweetalert2';
import { transformarAString } from '../helper';
import { UnidadNegocio } from '../models';
import { UnidadNegocioService } from '../services/unidad-negocio.service';

@Component({
  selector: 'app-nueva-caja',
  templateUrl: './nueva-caja.component.html',
  styleUrls: ['./nueva-caja.component.css'],
})
export class NuevaCajaComponent implements OnInit {
  cajaFormulario = this.fb.group({
    nombre: ['', Validators.required],
    idUnidadNegocio: [9, Validators.required],
    negativa: [false, Validators.required],
  });
  unidadesNegocio: UnidadNegocio[] = [];

  constructor(
    private fb: FormBuilder,
    private cajaService: CajaService,
    private unidadNegocioService: UnidadNegocioService
  ) {}

  ngOnInit(): void {
    this.cargarUnidadesNegocio();
  }
  cargarUnidadesNegocio() {
    this.unidadNegocioService
      .lista()
      .subscribe((unidades) => (this.unidadesNegocio = unidades));
  }
  crear(): void {
    if (this.cajaFormulario.invalid) return;
    let { idUnidadNegocio, negativa, nombre } = this.cajaFormulario.value;
    idUnidadNegocio = Number(idUnidadNegocio);
    negativa = !!negativa;
    nombre = transformarAString(nombre);

    this.cajaService
      .crear({
        nombre,
        negativa,
        idUnidadNegocio,
      })
      .subscribe(
        ({ data }) =>
          swal.fire({
            title: 'Caja creada',
            text: `La caja ${data.nombre} ha sido creada con éxito`,
            icon: 'success',
          }),
        ({ error }) =>
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message.map((mensaje: string) => mensaje).join(' '),
          })
      );
  }
}
