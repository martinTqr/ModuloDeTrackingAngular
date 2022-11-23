import { Component, OnInit } from '@angular/core';
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
}
