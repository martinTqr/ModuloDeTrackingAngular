import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { transformarAString } from '../helper';
import { EmpresaService } from '../services/empresa.service';
@Component({
  selector: 'app-nueva-empresa',
  templateUrl: './nueva-empresa.component.html',
  styleUrls: ['./nueva-empresa.component.css'],
})
export class NuevaEmpresaComponent implements OnInit {
  empresaFormulario = this.fb.group({
    nombre: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {}
  crear(): void {
    let { nombre } = this.empresaFormulario.value;
    nombre = transformarAString(nombre);

    this.empresaService
      .crear({
        nombre,
      })
      .subscribe(
        ({ data }) =>
          swal.fire({
            title: 'Caja creada',
            text: `La empresa ${data.nombre} ha sido creada con éxito`,
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
