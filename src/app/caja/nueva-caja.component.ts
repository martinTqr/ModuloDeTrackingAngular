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
    negativa: ['', Validators.required],
  });
  unidadesNegocio: UnidadNegocio[] = [];

  constructor(private fb: FormBuilder, private cajaService: CajaService) {}

  ngOnInit(): void {}
  crear(): void {
    if (this.cajaFormulario.invalid) return;
    let { negativa, nombre } = this.cajaFormulario.value;
    const negativaBoolean = trasnformarABoolean(negativa);
    nombre = transformarAString(nombre);

    this.cajaService
      .crear({
        nombre,
        negativa: negativaBoolean,
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
const trasnformarABoolean = (value: any): boolean => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return !!value;
};
