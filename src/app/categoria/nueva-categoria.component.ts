import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria, Empresa, TipoCategoria } from '../models';
import { CategoriaService } from '../services/categoria.service';
import { EmpresaService } from '../services/empresa.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css'],
})
export class NuevaCategoriaComponent implements OnInit {
  categoriaFormulario = this.fb.group({
    nombre: ['', Validators.required],
    tipo: ['in', Validators.required],
    idEmpresa: ['1', Validators.required],
    orden: ['1', [Validators.required, Validators.min(1)]],
    isGeneral: ['', [Validators.required, Validators.required]],
    idCategoriaPadre: [''],
  });
  listaEmpresa: Empresa[] = [];
  listaCategorias: Categoria[][] = [[], []];
  tipo = 0;
  categoriaSeleccionadaNombre = '-';
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    this.empresaService
      .lista()
      .subscribe((lista) => (this.listaEmpresa = lista));
    this.categoriaService.listaArbol().subscribe((lista) => {
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
      listaSeparada.forEach((lista) =>
        lista.sort((a, b) => Number(a.isGeneral) - Number(b.isGeneral))
      );
      this.listaCategorias = listaSeparada;
    });
  }
  cambioEnTipo(e: any) {
    const tipo = e.target.value;
    this.tipo = tipo === TipoCategoria.in ? 0 : 1;
  }
  crear(): void {
    let { nombre, tipo, idCategoriaPadre, isGeneral, idEmpresa, orden } =
      this.categoriaFormulario.value;
    nombre = String(nombre);
    const tipoString = String(tipo);
    const ordenNumber = Number(orden);
    const idEmpresaNumber = Number(idEmpresa);

    const idCategoriaPadreNumber = idCategoriaPadre
      ? Number(idCategoriaPadre)
      : null;

    const isGeneralBoolean = trasnformarABoolean(isGeneral);

    const categoria: Categoria = {
      nombre,
      tipo: tipoString,
      idEmpresa: idEmpresaNumber,
      idCategoriaPadre: idCategoriaPadreNumber,
      orden: ordenNumber,
      isGeneral: isGeneralBoolean,
    };
    console.log(isGeneral, isGeneralBoolean);

    if (!nombre) {
      Swal.fire({
        title: 'Error',
        text: 'El nombre es requerido',
        icon: 'error',
      });
      return;
    }
    this.categoriaService.crear(categoria).subscribe(
      (data) => {
        Swal.fire({
          title: 'Categoria creada',
          text: data.nombre,
          icon: 'success',
          timer: 3000,
        }).then(() => window.location.reload());
      },
      ({ error }) =>
        Swal.fire({ title: 'Error', text: error.message, icon: 'error' })
    );
  }
  obtenerCampo(campo: string) {
    return this.categoriaFormulario.get(campo);
  }
  setCategoriaPadre(id: string) {
    this.categoriaFormulario.patchValue({
      idCategoriaPadre: id,
    });
  }
  borrarCategoriaPadre() {
    if (this.categoriaFormulario.value.idCategoriaPadre) {
      this.categoriaFormulario.patchValue({
        isGeneral: '',
      });
    }
    this.categoriaFormulario.patchValue({
      idCategoriaPadre: '',
    });
    this.categoriaSeleccionadaNombre = '-';
  }
  selccionarCategoria(evento: any) {
    if (evento.event.target.tagName.toLowerCase() !== 'span') {
      const idCateg = evento.row.node.data.id;
      this.categoriaFormulario.patchValue({
        idCategoriaPadre: idCateg,
      });
      this.categoriaSeleccionadaNombre = evento.row.node.data.nombre;
      this.categoriaFormulario.patchValue({
        isGeneral: evento.row.node.data.isGeneral,
      });
    }
  }
}
const trasnformarABoolean = (value: any): boolean => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return !!value;
};
