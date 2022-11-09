import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UnidadNegocioService } from '../services/unidad-negocio.service';

@Component({
  selector: 'app-nueva-unidad-negocio',
  templateUrl: './nueva-unidad-negocio.component.html',
  styleUrls: ['./nueva-unidad-negocio.component.css'],
})
export class NuevaUnidadNegocioComponent implements OnInit {
  unidadNegocioFormulario = this.fb.group({
    nombre: ['', Validators.required],
    idEmpresa: ['11', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private unidadNegocioService: UnidadNegocioService
  ) {}

  ngOnInit(): void {}

  crear() {
    let { nombre, idEmpresa } = this.unidadNegocioFormulario.value;
    nombre = String(nombre);
    const idEmpresaNumber = Number(idEmpresa);
    this.unidadNegocioService
      .crear({ nombre, idEmpresa: idEmpresaNumber })
      .subscribe(
        () =>
          Swal.fire({
            title: 'Unidad de negocio creada',
            icon: 'success',
          }),
        ({ error }) => {
          Swal.fire({
            title: 'Error al crear unidad de negocio',
            icon: 'error',
            text: error.message,
          });
        }
      );
  }
}
