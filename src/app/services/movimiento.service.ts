import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movimiento, NuevoMovimiento } from '../models/';

@Injectable({
  providedIn: 'root',
})
export class MovimientoService {
  movimientoURL = environment.movimientoURL;
  constructor(private httpClient: HttpClient) {}

  public lista(fechaInicio?: Date, fechaFin?: Date): Observable<any> {
    const fechaInicioRuta = fechaInicio ? `&fechaInicio=${fechaInicio}` : '';
    const fechaFinRuta = fechaFin ? `&fechaFin=${fechaFin}` : '';
    const ruta = `${this.movimientoURL}?${fechaInicioRuta}${fechaFinRuta}`;
    return this.httpClient.get<Movimiento[]>(ruta);
  }
  public detalle(id: number): Observable<Movimiento> {
    return this.httpClient.get<Movimiento>(this.movimientoURL + id);
  }
  public crear(movimiento: NuevoMovimiento): Observable<any> {
    return this.httpClient.post<any>(this.movimientoURL, movimiento);
  }
  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.movimientoURL + id);
  }
}
