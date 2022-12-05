import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reporte } from '../interfaces';
import { BaseService } from './base.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class ReporteService extends BaseService {
  constructor(private httpClient: HttpClient, ls: LocalService) {
    super(ls);
  }
  public buscarReporteEmpresa(
    fechaInicio?: string,
    fechaFin?: string
  ): Observable<any> {
    const { reporteEmpresaURL } = environment;
    const fechaInicioRuta = fechaInicio ? `&fechaInicio=${fechaInicio}` : '';
    const fechaFinRuta = fechaFin ? `&fechaFin=${fechaFin}` : '';
    const empresaRuta = this.empresaParametro;
    const ruta =
      reporteEmpresaURL + empresaRuta + fechaInicioRuta + fechaFinRuta;
    return this.httpClient.get<any>(ruta);
  }
  public buscarReporteUnidadNegocio(
    parametros: Parametros
  ): Observable<Reporte> {
    const { id, fechaInicio, fechaFin, transferencias } = parametros;
    const { unidadDeNegocioURL } = environment;
    const unidadNegocioRuta = id ? `&idUnidadNegocio=${id}` : '';
    const empresaRuta = this.empresaParametro;
    const fechaInicioRuta = fechaInicio ? `&fechaInicio=${fechaInicio}` : '';
    const fechaFinRuta = fechaFin ? `&fechaFin=${fechaFin}` : '';
    const transferenciasRuta = transferencias ? `&transferencias=true` : '';
    const ruta =
      unidadDeNegocioURL +
      empresaRuta +
      unidadNegocioRuta +
      fechaInicioRuta +
      fechaFinRuta +
      transferenciasRuta;
    console.log(ruta);

    return this.httpClient.get<Reporte>(ruta);
  }
}
interface Parametros {
  id?: any;
  fechaInicio?: string;
  fechaFin?: string;
  transferencias?: boolean;
}
