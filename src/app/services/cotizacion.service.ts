import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cotizacion } from '../models/';
import { BaseService } from './base.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class CotizacionService extends BaseService {
  cotizacionURL = environment.cotizacionURL;
  constructor(private httpClient: HttpClient, ls: LocalService) {
    super(ls);
  }

  public lista(): Observable<Cotizacion[]> {
    const ruta = this.cotizacionURL + this.empresaParametro;
    return this.httpClient.get<Cotizacion[]>(ruta);
  }
  public ultimo(): Observable<Cotizacion> {
    const ruta = this.cotizacionURL + 'ultimo/' + this.empresaParametro;
    return this.httpClient.get<Cotizacion>(ruta);
  }
  public detalle(id: number): Observable<Cotizacion> {
    return this.httpClient.get<Cotizacion>(this.cotizacionURL + id);
  }
  public modificar(id: number, cotizacion: Cotizacion): Observable<any> {
    return this.httpClient.put<any>(this.cotizacionURL + id, cotizacion);
  }
  public crear(cotizacion: Cotizacion): Observable<any> {
    return this.httpClient.post<any>(this.cotizacionURL, cotizacion);
  }
  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.cotizacionURL + id);
  }
}
