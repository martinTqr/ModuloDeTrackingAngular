import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Caja } from '../models/';

@Injectable({
  providedIn: 'root',
})
export class CajaService {
  cajaURL = environment.cajaURL;
  constructor(private httpClient: HttpClient) {}

  public lista(): Observable<Caja[]> {
    return this.httpClient.get<Caja[]>(this.cajaURL);
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
