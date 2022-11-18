import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { transformarAString } from '../helper';
import { GrupoCajaService } from '../services/grupo-caja.service';
@Component({
  selector: 'app-nueva-grupoCaja',
  templateUrl: './nuevo-grupo-caja.component.html',
  styleUrls: ['./nuevo-grupo-caja.component.css'],
})
export class NuevoGrupoCajaComponent implements OnInit {
  grupoCajaFormulario = this.fb.group({
    nombre: ['', Validators.required],
    idEmpresa: ['1', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private grupoCajaService: GrupoCajaService
  ) {}

  ngOnInit(): void {}
  crear(): void {
    let { nombre, idEmpresa } = this.grupoCajaFormulario.value;
    nombre = transformarAString(nombre);
    const idEmpresaNumber = Number(idEmpresa);
    this.grupoCajaService
      .crear({
        nombre,
        idEmpresa: idEmpresaNumber,
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
