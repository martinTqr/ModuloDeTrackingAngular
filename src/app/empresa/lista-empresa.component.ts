import { Component, OnInit } from '@angular/core';
import { Empresa } from '../models';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-lista-empresa',
  templateUrl: './lista-empresa.component.html',
  styleUrls: ['./lista-empresa.component.css'],
})
export class ListaEmpresaComponent implements OnInit {
  empresas: Empresa[] = [];
  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.empresaService.lista().subscribe(
      (empresas) => (this.empresas = empresas),
      (error) => console.error(error)
    );
  }
}
