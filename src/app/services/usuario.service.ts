import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/';
import { BaseService } from './base.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends BaseService {
  usuarioURL = environment.usuarioURL;
  constructor(private httpClient: HttpClient, ls: LocalService) {
    super(ls);
  }

  public lista(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(
      this.usuarioURL + this.empresaParametro
    );
  }
  public detalle(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.usuarioURL + id);
  }
  public crear(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(this.usuarioURL, usuario);
  }
}
