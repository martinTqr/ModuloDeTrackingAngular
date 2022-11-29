import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { transformarAString } from '../helper';
import { EmpresaService } from '../services/empresa.service';
import { UsuarioService } from '../services/usuario.service';
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
    private empresaService: EmpresaService,
    private usuarioService: UsuarioService
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
        ({ data }) => {
          this.usuarioService
            .crear({
              email: 'dueño@dueño.com',
              idEmpresa: data.id,
              nombreCompleto: 'dueño',
            })
            .subscribe(
              (res) => {
                console.log(res);
              },
              (error) => {
                console.log(error);
              }
            );
          swal.fire({
            title: 'Empresa creada',
            text: `La empresa ${data.nombre} ha sido creada con éxito`,
            icon: 'success',
          });
        },
        ({ error }) =>
          swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          })
      );
  }
}
