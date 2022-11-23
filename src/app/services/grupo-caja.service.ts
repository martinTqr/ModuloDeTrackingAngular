import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrupoCaja } from '../models/';

@Injectable({
  providedIn: 'root',
})
export class GrupoCajaService {
  grupoCajaURL = environment.grupoCajaURL;
  constructor(private httpClient: HttpClient) {}

  public lista(id: number): Observable<GrupoCaja[]> {
    const idEmpresaRuta = `?idEmpresa=${id}`;
    const ruta = this.grupoCajaURL + idEmpresaRuta;
    return this.httpClient.get<GrupoCaja[]>(ruta);
  }
  public detalle(id: number): Observable<GrupoCaja> {
    return this.httpClient.get<GrupoCaja>(this.grupoCajaURL + id);
  }
  public crear(grupoCaja: GrupoCaja): Observable<any> {
    return this.httpClient.post<any>(this.grupoCajaURL, grupoCaja);
  }
}
