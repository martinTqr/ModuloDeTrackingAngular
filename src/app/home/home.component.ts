import { Component, OnInit } from '@angular/core';
import { Empresa } from '../models';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  empresas: Empresa[] = [];
  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    this.empresaService.lista().subscribe((empresas) => {
      this.empresas = empresas;
    });
  }
}
