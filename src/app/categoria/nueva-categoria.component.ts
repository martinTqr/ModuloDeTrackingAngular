import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria } from '../models';
import { CategoriaService } from '../services/categoria.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css'],
})
export class NuevaCategoriaComponent implements OnInit {
  categoriaFormulario = this.fb.group({
    nombre: ['formulario', Validators.required],
    tipo: ['in', Validators.required],
    idEmpresa: ['11', Validators.required],
    idCategoriaPadre: [undefined],
    orden: ['1', Validators.required],
    isGeneral: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {}
  crear(): void {
    if (!this.categoriaFormulario.valid) {
      console.log(this.categoriaFormulario.get('idCategoriaPadre')?.errors);

      return;
    }
    let { nombre, tipo, idEmpresa, idCategoriaPadre, orden, isGeneral } =
      this.categoriaFormulario.value;
    nombre = String(nombre);
    const tipoString = String(tipo);
    const ordenNumber = Number(orden);
    const idEmpresaString = Number(idEmpresa);

    console.log(!!isGeneral);
    const isGeneralBoolean = Boolean(isGeneral);

    const categoria: Categoria = {
      nombre,
      tipo: tipoString,
      idEmpresa: idEmpresaString,
      idCategoriaPadre,
      orden: ordenNumber,
      isGeneral: isGeneralBoolean,
    };

    this.categoriaService.crear(categoria).subscribe(
      (data) => {
        swal({ title: 'Categoria creada', text: data.nombre, icon: 'success' });
        this.categoriaFormulario.reset();
      },
      ({ error }) =>
        swal({ title: 'Error', text: error.message, icon: 'error' })
    );
  }
  obtenerCampo(campo: string) {
    return this.categoriaFormulario.get(campo);
  }
}
