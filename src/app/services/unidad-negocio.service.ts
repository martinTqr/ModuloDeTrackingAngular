import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movimiento, NuevoMovimiento, UnidadNegocio } from '../models/';

@Injectable({
  providedIn: 'root',
})
export class UnidadNegocioService {
  unidadNegocioURL = environment.unidadNegocioURL;
  constructor(private httpClient: HttpClient) {}

  public lista(): Observable<UnidadNegocio[]> {
    return this.httpClient.get<UnidadNegocio[]>(this.unidadNegocioURL);
  }
  public detalle(id: number): Observable<UnidadNegocio> {
    return this.httpClient.get<UnidadNegocio>(this.unidadNegocioURL + id);
  }
  public crear(unidadNegocio: UnidadNegocio): Observable<any> {
    return this.httpClient.post<any>(this.unidadNegocioURL, unidadNegocio);
  }
  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.unidadNegocioURL + id);
  }
}
