import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria, Empresa, TipoCategoria } from '../models';
import { CategoriaService } from '../services/categoria.service';
import Swal from 'sweetalert2';
import { BaseService } from '../services/base.service';
@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css'],
})
export class NuevaCategoriaComponent implements OnInit {
  categoriaFormulario = this.fb.group({
    nombre: ['', Validators.required],
    tipo: ['in', Validators.required],
    orden: ['1', [Validators.required, Validators.min(1)]],
    isGeneral: ['true', [Validators.required, Validators.required]],
    idCategoriaPadre: [''],
  });
  listaCategorias: Categoria[][] = [[], []];
  tipo = 0;
  categoriaSeleccionadaNombre = '-';
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }
  cargarCategorias() {
    this.categoriaService.listaArbol().subscribe((lista) => {
      const listaSeparada = lista.reduce(
        (acum: Categoria[][], categ) => {
          if (categ.tipo === this.categoriaFormulario.get('tipo')?.value) {
            if (categ.isGeneral) {
              acum[0].push(categ);
              return acum;
            } else {
              acum[1].push(categ);
              return acum;
            }
          } else return acum;
        },
        [[], []]
      );
      listaSeparada.forEach((lista) =>
        lista.sort((a, b) => Number(a.isGeneral) - Number(b.isGeneral))
      );
      this.listaCategorias = listaSeparada;
    });
  }
  cambioEnTipo() {
    this.categoriaFormulario.patchValue({
      idCategoriaPadre: '',
    });
    this.categoriaSeleccionadaNombre = '-';
    this.cargarCategorias();
  }
  crear(): void {
    if (!this.categoriaFormulario.valid) return;
    let { nombre, tipo, idCategoriaPadre, isGeneral, orden } =
      this.categoriaFormulario.value;
    nombre = String(nombre);
    const tipoString = String(tipo);
    const ordenNumber = Number(orden);
    const idEmpresa = this.baseService.getIdEmpresa;

    const idCategoriaPadreNumber = idCategoriaPadre
      ? Number(idCategoriaPadre)
      : null;

    const isGeneralBoolean = trasnformarABoolean(isGeneral);

    const categoria: Categoria = {
      nombre,
      tipo: tipoString,
      idEmpresa,
      idCategoriaPadre: idCategoriaPadreNumber,
      orden: ordenNumber,
      isGeneral: isGeneralBoolean,
    };
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
    if (evento.event.target.tagName.toLowerCase() !== 'span' && evento?.data) {
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
