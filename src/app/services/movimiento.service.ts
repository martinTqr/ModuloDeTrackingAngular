import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movimiento, NuevoMovimiento, TipoCategoria } from '../models/';
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
    idCajas,
    fechaInicio,
    fechaFin,
    tipo,
  }: Parametros): Observable<any> {
    const fechaInicioRuta = fechaInicio ? `&fechaInicio=${fechaInicio}` : '';
    const fechaFinRuta = fechaFin ? `&fechaFin=${fechaFin}` : '';
    const empresaRuta = this.empresaParametro;
    const cajasRuta = idCajas ? `&cajas=${idCajas}` : '';
    const tipoRuta = tipo ? `&tipo=${tipo}` : '';

    const ruta =
      this.movimientoURL +
      empresaRuta +
      cajasRuta +
      fechaInicioRuta +
      fechaFinRuta +
      tipoRuta;

    return this.httpClient.get<Movimiento[]>(ruta);
  }
  public trasnferenciasEntreCajas(cajas): Observable<any> {
    const ruta =
      this.movimientoURL +
      'transferencias-entre-cajas' +
      this.empresaParametro +
      `&cajas=${cajas}`;
    return this.httpClient.get<any>(ruta);
  }
  public detalle(id: number): Observable<Movimiento> {
    return this.httpClient.get<Movimiento>(this.movimientoURL + id);
  }
  public crear(movimiento: NuevoMovimiento): Observable<any> {
    return this.httpClient.post<any>(this.movimientoURL, movimiento);
  }
  public modificar(id, movimiento): Observable<any> {
    return this.httpClient.put<any>(this.movimientoURL + id, movimiento);
  }
  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.movimientoURL + id);
  }
}

interface Parametros {
  transferecia?: boolean;
  idCajas?: number[];
  fechaInicio?: Date;
  fechaFin?: Date;
  tipo?: TipoCategoria;
}
