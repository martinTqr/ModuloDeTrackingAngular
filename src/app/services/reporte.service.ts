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

  public buscarReporteEmpresa(id: any): Observable<any> {
    const { reporteEmpresaURL } = environment;
    return this.httpClient.get<any>(`${reporteEmpresaURL}?idEmpresa=${id}`);
  }
  public buscarReporteUnidadNegocio(id: any): Observable<Reporte> {
    const { unidadDeNegocioURL } = environment;
    return this.httpClient.get<Reporte>(
      `${unidadDeNegocioURL}?idUnidadNegocio=${id}`
    );
  }
}
