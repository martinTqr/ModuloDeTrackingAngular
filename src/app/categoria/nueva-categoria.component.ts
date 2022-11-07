import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { transformarAString } from '../helper';
import { TipoCategoria } from '../models';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css'],
})
export class NuevaCategoriaComponent implements OnInit {
  categoriaFormulario = this.fb.group({
    nombre: ['', Validators.required],
    tipo: ['', Validators.required],
    idEmpresa: ['', Validators.required],
    idCategoriaPadre: [null],
    orden: ['', Validators.required],
    isGeneral: [false],
  });
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {}
  crear(): void {
    let { nombre, tipo, idEmpresa, idCategoriaPadre, orden, isGeneral } =
      this.categoriaFormulario.value;
    //transformar a string
    nombre = String(nombre);
    const tipoString = String(tipo);
    const ordenNumber = Number(orden);
    const idEmpresaString = Number(idEmpresa);
    const idCategoriaPadreString = Number(idCategoriaPadre);
    isGeneral = Boolean(isGeneral);
    //how to fix this error?
    //Type 'string' is not assignable to type 'TipoCategoria'.
    //how to fix this error?
    //Type 'string' is not assignable to type 'TipoCategoria'.
    const categoria = {
      nombre,
      tipo: tipoString,
      idEmpresa: idEmpresaString,
      idCategoriaPadre: idCategoriaPadreString,
      orden: ordenNumber,
      isGeneral,
    };

    this.categoriaService.crear(categoria).subscribe(
      ({ data }) => console.log(data),
      (err) => console.log(err)
    );
  }
}
