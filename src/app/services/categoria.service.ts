import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria, Empresa } from '../models/';
import { BaseService } from './base.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends BaseService {
  categoriaURL = environment.categoriaURL;
  constructor(private httpClient: HttpClient, ls: LocalService) {
    super(ls);
  }

  public lista(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(
      `${this.categoriaURL}lista` + this.empresaParametro
    );
  }
  public listaArbol(): Observable<Categoria[]> {
    const ruta = this.categoriaURL + this.empresaParametro;
    return this.httpClient.get<Categoria[]>(ruta);
  }
  public detalle(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(this.categoriaURL + id);
  }
  public crear(categoria: Categoria): Observable<any> {
    return this.httpClient.post<any>(this.categoriaURL, categoria);
  }
  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.categoriaURL + id);
  }
}
