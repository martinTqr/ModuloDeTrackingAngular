import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresa } from '../models/';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  empresaURL = environment.empresaURL;
  constructor(private httpClient: HttpClient) {}

  public lista(): Observable<any> {
    return this.httpClient.get<Empresa[]>(this.empresaURL);
  }
  public detalle(id: number): Observable<Empresa> {
    return this.httpClient.get<Empresa>(this.empresaURL + id);
  }
  public crear(empresa: Empresa): Observable<any> {
    return this.httpClient.post<any>(this.empresaURL, empresa);
  }
}
