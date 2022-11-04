import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from '../models';
import { EmpresaService } from '../services/empresa.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-detalle-empresa',
  templateUrl: './detalle-empresa.component.html',
  styleUrls: ['./detalle-empresa.component.css'],
})
export class DetalleEmpresaComponent implements OnInit {
  empresa!: Empresa;
  constructor(
    private empresaService: EmpresaService,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { id } = this.rutaActiva.snapshot.params;
    this.empresaService.detalle(id).subscribe(
      (empresa) => (this.empresa = empresa),
      ({ error }) =>
        swal({
          icon: 'error',
          title: 'Error',
          text: error.message,
        })
    );
  }
}
