import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reporte } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  constructor(private httpClient: HttpClient) {}

  public buscarReporteEmpresa(
    id: any,
    fechaInicio?: string,
    fechaFin?: string
  ): Observable<any> {
    const { reporteEmpresaURL } = environment;
    const fechaInicioRuta = fechaInicio ? `&fechaInicio=${fechaInicio}` : '';
    const fechaFinRuta = fechaFin ? `&fechaFin=${fechaFin}` : '';
    const ruta = `${reporteEmpresaURL}?idEmpresa=${id}${fechaInicioRuta}${fechaFinRuta}`;
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
