import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Empresa } from '../models';
import { LocalService } from '../services/local.service';
import { UnidadNegocioService } from '../services/unidad-negocio.service';

@Component({
  selector: 'app-nueva-unidad-negocio',
  templateUrl: './nueva-unidad-negocio.component.html',
  styleUrls: ['./nueva-unidad-negocio.component.css'],
})
export class NuevaUnidadNegocioComponent implements OnInit {
  unidadNegocioFormulario = this.fb.group({
    nombre: ['', Validators.required],
  });
  empresas: Empresa[] = [];
  constructor(
    private fb: FormBuilder,
    private unidadNegocioService: UnidadNegocioService,
    private localService: LocalService
  ) {}

  ngOnInit() {}
  crear() {
    let { nombre } = this.unidadNegocioFormulario.value;
    nombre = String(nombre);
    const idEmpresa = this.localService.getData('empresa').id;
    this.unidadNegocioService.crear({ nombre, idEmpresa }).subscribe(
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
