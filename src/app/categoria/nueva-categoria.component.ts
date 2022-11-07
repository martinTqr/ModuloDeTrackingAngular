import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria, Empresa } from '../models';
import { CategoriaService } from '../services/categoria.service';
import swal from 'sweetalert';
import { EmpresaService } from '../services/empresa.service';
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
    orden: ['1', [Validators.required, Validators.min(1)]],
    isGeneral: ['', [Validators.required, Validators.required]],
    idCategoriaPadre: [undefined],
  });
  listaEmpresa: Empresa[] = [];
  listaCategorias: Categoria[] = [];
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    this.empresaService
      .lista()
      .subscribe((lista) => (this.listaEmpresa = lista));
    this.categoriaService.lista().subscribe((lista) => {
      this.listaCategorias = lista;
    });
  }

  crear(): void {
    if (!this.categoriaFormulario.valid) {
      console.log(this.categoriaFormulario.get('idCategoriaPadre')?.errors);

      console.log(this.categoriaFormulario.value);
      return;
    }
    let { nombre, tipo, idEmpresa, idCategoriaPadre, orden, isGeneral } =
      this.categoriaFormulario.value;
    nombre = String(nombre);
    const tipoString = String(tipo);
    const ordenNumber = Number(orden);
    const idEmpresaString = Number(idEmpresa);

    const isGeneralBoolean = Boolean(isGeneral);

    const categoria: Categoria = {
      nombre,
      tipo: tipoString,
      idEmpresa: idEmpresaString,
      idCategoriaPadre,
      orden: ordenNumber,
      isGeneral: isGeneralBoolean,
    };

    /*     this.categoriaService.crear(categoria).subscribe(
      (data) => {
        swal({ title: 'Categoria creada', text: data.nombre, icon: 'success' });
        this.categoriaFormulario.reset();
      },
      ({ error }) =>
        swal({ title: 'Error', text: error.message, icon: 'error' })
    ); */
  }
  obtenerCampo(campo: string) {
    return this.categoriaFormulario.get(campo);
  }
}
