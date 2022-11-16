import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CajaService } from '../services/caja.service';
import swal from 'sweetalert2';
import { transformarAString } from '../helper';
import { UnidadNegocio } from '../models';
import { UnidadNegocioService } from '../services/unidad-negocio.service';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-nueva-caja',
  templateUrl: './nueva-caja.component.html',
  styleUrls: ['./nueva-caja.component.css'],
})
export class NuevaCajaComponent implements OnInit {
  cajaFormulario = this.fb.group({
    idEmpresa: ['', [Validators.required]],
    nombre: ['', Validators.required],
    negativa: ['', Validators.required],
  });
  unidadesNegocio: UnidadNegocio[] = [];

  constructor(
    private fb: FormBuilder,
    private cajaService: CajaService,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    this.cargarEmpresa();
  }

  cargarEmpresa() {
    this.empresaService.lista().subscribe((empresas) => {
      this.cajaFormulario.patchValue({ idEmpresa: String(empresas[0].id) });
    });
  }
  crear(): void {
    if (this.cajaFormulario.invalid) return;
    let { idEmpresa, negativa, nombre } = this.cajaFormulario.value;
    const idEmpresaNumber = Number(idEmpresa);
    const negativaBoolean = trasnformarABoolean(negativa);
    nombre = transformarAString(nombre);

    this.cajaService
      .crear({
        idEmpresa: idEmpresaNumber,
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
        (error) => {
          console.log(error);

          swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message.map((mensaje: string) => mensaje).join(' '),
          });
        }
      );
  }
}
const trasnformarABoolean = (value: any): boolean => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return !!value;
};
