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
    id: any,
    fechaInicio?: string,
    fechaFin?: string
  ): Observable<Reporte> {
    const { unidadDeNegocioURL } = environment;
    if (fechaInicio && fechaFin) {
      return this.httpClient.get<Reporte>(
        `${unidadDeNegocioURL}?idUnidadNegocio=${id}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
      );
    }
    return this.httpClient.get<Reporte>(
      `${unidadDeNegocioURL}?idUnidadNegocio=${id}`
    );
  }
}
