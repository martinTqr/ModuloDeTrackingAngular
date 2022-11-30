import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movimiento, NuevoMovimiento } from '../models/';
import { BaseService } from './base.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class MovimientoService extends BaseService {
  movimientoURL = environment.movimientoURL;
  constructor(private httpClient: HttpClient, ls: LocalService) {
    super(ls);
  }

  public lista({
    transferecia = false,
    fechaInicio,
    fechaFin,
  }: Parametros): Observable<any> {
    const fechaInicioRuta = fechaInicio ? `&fechaInicio=${fechaInicio}` : '';
    const fechaFinRuta = fechaFin ? `&fechaFin=${fechaFin}` : '';
    const empresaRuta = transferecia ? '' : this.empresaParametro;
    const ruta =
      this.movimientoURL + empresaRuta + fechaInicioRuta + fechaFinRuta;
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

interface Parametros {
  transferecia?: boolean;
  fechaInicio?: Date;
  fechaFin?: Date;
}
