import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Caja } from '../models/';
import { BaseService } from './base.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class CajaService extends BaseService {
  cajaURL = environment.cajaURL;
  constructor(private httpClient: HttpClient, ls: LocalService) {
    super(ls);
  }
  public lista(): Observable<Caja[]> {
    const ruta = this.cajaURL + this.empresaParametro;
    return this.httpClient.get<Caja[]>(ruta);
  }
  public listaConSaldo(transferencias?: boolean): Observable<Caja[]> {
    const rutaTransferencia = transferencias ? '&transferencias=true' : '';
    const ruta =
      this.cajaURL + 'saldo' + this.empresaParametro + rutaTransferencia;
    return this.httpClient.get<Caja[]>(ruta);
  }
  public detalle(id: number): Observable<Caja> {
    return this.httpClient.get<Caja>(this.cajaURL + id);
  }
  public crear(caja: Caja): Observable<any> {
    return this.httpClient.post<any>(this.cajaURL, caja);
  }
  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.cajaURL + id);
  }
}
