import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  categoriaURL = environment.categoriaURL;
  constructor(private httpClient: HttpClient) {}

  public lista(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.categoriaURL);
  }
  public detalle(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(this.categoriaURL + id);
  }
  public crear(categoria: Categoria): Observable<any> {
    return this.httpClient.post<any>(this.categoriaURL, categoria);
  }
}
