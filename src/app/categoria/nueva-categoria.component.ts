import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria, Empresa, TipoCategoria } from '../models';
import { CategoriaService } from '../services/categoria.service';
import swal from 'sweetalert2';
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
  listaCategorias: Categoria[][] = [[], []];
  tipo = 0;
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
      //separe lista for tipo
      const listaSeparada = lista.reduce(
        (acum: Categoria[][], categ) => {
          if (categ.tipo === TipoCategoria.in) {
            acum[0].push(categ);
            return acum;
          } else {
            acum[1].push(categ);
            return acum;
          }
        },
        [[], []]
      );

      this.listaCategorias = listaSeparada;
    });
  }
  cambioEnTipo(e: any) {
    const tipo = e.target.value;
    this.tipo = tipo === TipoCategoria.in ? 0 : 1;
  }
  crear(): void {
    if (!this.categoriaFormulario.valid) {
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

    this.categoriaService.crear(categoria).subscribe(
      (data) => {
        swal.fire({
          title: 'Categoria creada',
          text: data.nombre,
          icon: 'success',
        });
        this.categoriaFormulario.reset();
      },
      ({ error }) =>
        swal.fire({ title: 'Error', text: error.message, icon: 'error' })
    );
  }
  obtenerCampo(campo: string) {
    return this.categoriaFormulario.get(campo);
  }
}
