import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reporte } from '../interfaces';
import { GrupoCaja } from '../models';
import { BaseService } from './base.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class ReporteService extends BaseService {
  constructor(private httpClient: HttpClient, ls: LocalService) {
    super(ls);
  }
  public buscarReporteEmpresa(parametros: Parametros): Observable<any> {
    const { dolar, fechaFin, fechaInicio } = parametros;
    const { reporteEmpresaURL } = environment;
    const fechaInicioRuta = fechaInicio ? `&fechaInicio=${fechaInicio}` : '';
    const fechaFinRuta = fechaFin ? `&fechaFin=${fechaFin}` : '';
    const empresaRuta = this.empresaParametro;
    const dolarRuta = dolar ? `&dolar=true` : '';

    const ruta =
      reporteEmpresaURL +
      empresaRuta +
      fechaInicioRuta +
      fechaFinRuta +
      dolarRuta;

    return this.httpClient.get<any>(ruta);
  }
  public buscarReporteUnidadNegocio(
    parametros: Parametros
  ): Observable<Reporte> {
    const { id, fechaInicio, fechaFin, transferencias, dolar } = parametros;
    const { reporteUnidadURL } = environment;
    const unidadNegocioRuta = id ? `&idUnidadNegocio=${id}` : '';
    const empresaRuta = this.empresaParametro;
    const fechaInicioRuta = fechaInicio ? `&fechaInicio=${fechaInicio}` : '';
    const fechaFinRuta = fechaFin ? `&fechaFin=${fechaFin}` : '';
    const transferenciasRuta = transferencias ? `&transferencias=true` : '';
    const dolarRuta = dolar ? `&dolar=true` : '';

    const ruta =
      reporteUnidadURL +
      empresaRuta +
      unidadNegocioRuta +
      fechaInicioRuta +
      fechaFinRuta +
      transferenciasRuta +
      dolarRuta;

    return this.httpClient.get<Reporte>(ruta);
  }
  public buscarReporteGrupoCajas(): Observable<GrupoCaja[]> {
    const { reporteGrupoCajas } = environment;
    const empresaRuta = this.empresaParametro;
    return this.httpClient.get<GrupoCaja[]>(reporteGrupoCajas + empresaRuta);
  }
}
interface Parametros {
  id?: any;
  fechaInicio?: string;
  fechaFin?: string;
  transferencias?: boolean;
  dolar?: boolean;
}
