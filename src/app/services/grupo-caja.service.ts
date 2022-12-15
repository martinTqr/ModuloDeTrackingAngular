import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrupoCaja } from '../models/';
import { BaseService } from './base.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class GrupoCajaService extends BaseService {
  grupoCajaURL = environment.grupoCajaURL;
  constructor(private httpClient: HttpClient, ls: LocalService) {
    super(ls);
  }

  public lista(): Observable<GrupoCaja[]> {
    const ruta = this.grupoCajaURL + this.empresaParametro;
    return this.httpClient.get<GrupoCaja[]>(ruta);
  }
  public detalle(id: number): Observable<GrupoCaja> {
    return this.httpClient.get<GrupoCaja>(this.grupoCajaURL + id);
  }
  public modificar(id: number, grupoCaja: GrupoCaja): Observable<any> {
    return this.httpClient.put<any>(this.grupoCajaURL + id, grupoCaja);
  }
  public crear(grupoCaja: GrupoCaja): Observable<any> {
    return this.httpClient.post<any>(this.grupoCajaURL, grupoCaja);
  }
  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.grupoCajaURL + id);
  }
}
