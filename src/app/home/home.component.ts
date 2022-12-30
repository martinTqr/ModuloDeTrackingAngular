import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { obtenerCambios, parsearObjeto } from '../helper';
import { redireccionar } from '../helper/genreales';
import { Empresa } from '../models';
import { EmpresaService } from '../services/empresa.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  empresas: Empresa[] = [];
  empresaPorEditar: Empresa;
  constructor(
    private empresaService: EmpresaService,
    private localService: LocalService
  ) {}

  ngOnInit(): void {
    this.cargarEmpresas();
  }
  seleccionarEmpresa(empresa: Empresa) {
    this.localService.saveData('empresa', empresa);
  }
  cargarEmpresas() {
    this.empresaService.lista().subscribe((empresas) => {
      this.empresas = empresas;
    });
  }
  cancelarEdicion() {
    this.empresaPorEditar = null;
  }
  preparacionDeEdicion(evento) {
    this.empresaPorEditar = parsearObjeto(evento.data);
  }
  seleccionar(evento) {
    const empresa = evento.data;
    this.localService.saveData('empresa', empresa);
    !this.empresaPorEditar && redireccionar('admin');
  }

  onCellPrepared(e) {
    if (e.rowType == 'data' && e.column && e.column.dataField == 'nombre') {
      const elem = e.cellElement;
      elem.style.setProperty('cursor', 'pointer', 'important');
    }
  }

  guardado(evento) {
    const cambios = evento.changes;

    if (cambios.length > 0 && cambios[0].type === 'update') {
      const empresaModificada = {
        nombre: cambios[0].data.nombre,
      };
      this.empresaService
        .modificar(this.empresaPorEditar.id, empresaModificada)
        .subscribe({
          next: (data) => {
            Swal.fire({
              title: data.mensaje.toUpperCase() + '!',
              text: `Empresa ${data.data.nombre} actualizada con éxito`,
              icon: 'success',
              timer: 2000,
              timerProgressBar: true,
            });
          },
          error: (err) => Swal.fire('Error!', err.error.message, 'error'),
        });
      this.empresaPorEditar = null;
    }
  }
}
