import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movimiento } from '../models/';

@Injectable({
  providedIn: 'root',
})
export class MovimientoService {
  movimientoURL = environment.movimientoURL;
  constructor(private httpClient: HttpClient) {}

  public lista(): Observable<any> {
    return this.httpClient.get<Movimiento[]>(this.movimientoURL);
  }
  public detalle(id: number): Observable<Movimiento> {
    return this.httpClient.get<Movimiento>(this.movimientoURL + id);
  }
  public crear(movimiento: Movimiento): Observable<any> {
    return this.httpClient.post<any>(this.movimientoURL, movimiento);
  }
}
