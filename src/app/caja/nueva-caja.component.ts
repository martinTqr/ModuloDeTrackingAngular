import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CajaService } from '../services/caja.service';
import swal from 'sweetalert';
import { transformarAString } from '../helper';

@Component({
  selector: 'app-nueva-caja',
  templateUrl: './nueva-caja.component.html',
  styleUrls: ['./nueva-caja.component.css'],
})
export class NuevaCajaComponent implements OnInit {
  cajaFormulario = this.fb.group({
    nombre: ['', Validators.required],
    idUnidadNegocio: [0, Validators.required],
    negativa: [false, Validators.required],
  });

  constructor(private fb: FormBuilder, private cajaService: CajaService) {}

  ngOnInit(): void {}
  crear(): void {
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
          swal({
            title: 'Caja creada',
            text: `La caja ${data.nombre} ha sido creada con éxito`,
            icon: 'success',
          }),
        ({ error }) =>
          swal({
            icon: 'error',
            title: 'Error',
            text: error.message.map((mensaje: string) => mensaje).join(' '),
          })
      );
  }
}
