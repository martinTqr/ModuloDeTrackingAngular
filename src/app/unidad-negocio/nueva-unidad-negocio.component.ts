import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Empresa } from '../models';
import { EmpresaService } from '../services/empresa.service';
import { UnidadNegocioService } from '../services/unidad-negocio.service';

@Component({
  selector: 'app-nueva-unidad-negocio',
  templateUrl: './nueva-unidad-negocio.component.html',
  styleUrls: ['./nueva-unidad-negocio.component.css'],
})
export class NuevaUnidadNegocioComponent implements OnInit {
  unidadNegocioFormulario = this.fb.group({
    nombre: ['', Validators.required],
    idEmpresa: ['', Validators.required],
  });
  empresas: Empresa[] = [];
  constructor(
    private fb: FormBuilder,
    private unidadNegocioService: UnidadNegocioService,
    private empresaService: EmpresaService
  ) {}

  ngOnInit() {
    this.obtenerEmpresas();
  }

  obtenerEmpresas() {
    this.empresaService.lista().subscribe((empresas) => {
      this.empresas = empresas;
      this.unidadNegocioFormulario.patchValue({
        idEmpresa: String(this.empresas[0].id),
      });
    });
  }
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
