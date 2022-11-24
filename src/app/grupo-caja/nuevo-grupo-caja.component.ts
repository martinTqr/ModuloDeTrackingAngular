import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { transformarAString } from '../helper';
import { Empresa } from '../models';
import { GrupoCajaService } from '../services/grupo-caja.service';
import { LocalService } from '../services/local.service';
@Component({
  selector: 'app-nueva-grupoCaja',
  templateUrl: './nuevo-grupo-caja.component.html',
  styleUrls: ['./nuevo-grupo-caja.component.css'],
})
export class NuevoGrupoCajaComponent implements OnInit {
  empresa: Empresa;
  grupoCajaFormulario = this.fb.group({
    nombre: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private grupoCajaService: GrupoCajaService,
    private localService: LocalService
  ) {}

  ngOnInit(): void {
    this.empresa = this.localService.getData('empresa');
  }
  crear(): void {
    if (this.grupoCajaFormulario.invalid) return;
    let { nombre } = this.grupoCajaFormulario.value;
    nombre = transformarAString(nombre);

    this.grupoCajaService
      .crear({
        nombre,
        idEmpresa: this.empresa.id,
      })
      .subscribe(
        ({ data }) =>
          swal.fire({
            title: 'Grupo de cajas creado',
            text: `El grupo de cajas ${data.nombre} ha sido creado con éxito`,
            icon: 'success',
          }),
        ({ error }) =>
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          })
      );
  }
}
