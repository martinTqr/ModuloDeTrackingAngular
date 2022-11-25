import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria, Empresa } from '../models/';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  categoriaURL = environment.categoriaURL;
  empresa: Empresa;
  constructor(private httpClient: HttpClient, localService: LocalService) {
    this.empresa = localService.getData('empresa');
  }

  public lista(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.categoriaURL}lista`);
  }

  public listaArbol(): Observable<Categoria[]> {
    const ruta = `${this.categoriaURL}?idEmpresa=${this.empresa.id}`;
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
