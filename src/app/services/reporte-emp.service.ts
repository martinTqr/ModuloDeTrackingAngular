import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReporteEmpresaReducido } from '../reporte-emp/reporte-emp.interface';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  reporteEmpresaURL = environment.reporteEmpresaURL;
  constructor(private httpClient: HttpClient) {}

  public buscarReporteEmpresa(): Observable<any> {
    return this.httpClient.get<any>(this.reporteEmpresaURL + '?idEmpresa=11');
  }
}
