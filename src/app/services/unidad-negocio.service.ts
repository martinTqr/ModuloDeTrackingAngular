import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnidadNegocio } from '../models/';
import { BaseService } from './base.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class UnidadNegocioService extends BaseService {
  unidadNegocioURL = environment.unidadNegocioURL;
  constructor(private httpClient: HttpClient, ls: LocalService) {
    super(ls);
  }

  public lista(): Observable<UnidadNegocio[]> {
    return this.httpClient.get<UnidadNegocio[]>(
      this.unidadNegocioURL + this.empresaParametro
    );
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
