import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CajaService } from '../services/caja.service';
import swal from 'sweetalert2';
import { transformarAString } from '../helper';
import { Caja, GrupoCaja, UnidadNegocio } from '../models';
import { UnidadNegocioService } from '../services/unidad-negocio.service';
import { EmpresaService } from '../services/empresa.service';
import { GrupoCajaService } from '../services/grupo-caja.service';

@Component({
  selector: 'app-nueva-caja',
  templateUrl: './nueva-caja.component.html',
  styleUrls: ['./nueva-caja.component.css'],
})
export class NuevaCajaComponent implements OnInit {
  cajaFormulario = this.fb.group({
    idEmpresa: ['', [Validators.required]],
    nombre: ['', Validators.required],
    idGrupoCaja: ['', Validators.required],
    negativa: ['', Validators.required],
  });
  grupoCajas: GrupoCaja[] = [];
  constructor(
    private fb: FormBuilder,
    private cajaService: CajaService,
    private empresaService: EmpresaService,
    private grupoCajaService: GrupoCajaService
  ) {}

  ngOnInit(): void {
    this.cargarEmpresa();
    this.cargarGrupoDeCajas();
  }

  cargarGrupoDeCajas() {
    this.grupoCajaService
      .lista()
      .subscribe((grupoCajas) => (this.grupoCajas = grupoCajas));
  }
  cargarEmpresa() {
    this.empresaService.lista().subscribe((empresas) => {
      this.cajaFormulario.patchValue({ idEmpresa: String(empresas[0].id) });
    });
  }
  crear(): void {
    if (this.cajaFormulario.invalid) return;
    let { idEmpresa, idGrupoCaja, negativa, nombre } =
      this.cajaFormulario.value;
    const idEmpresaNumber = Number(idEmpresa);
    const negativaBoolean = trasnformarABoolean(negativa);
    const idGrupoCajaNumber = Number(idGrupoCaja);
    nombre = transformarAString(nombre);
    const caja: Caja = {
      idEmpresa: idEmpresaNumber,
      nombre,
      idGrupoCaja: idGrupoCajaNumber,
      negativa: negativaBoolean,
    };
    this.cajaService.crear(caja).subscribe(
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
