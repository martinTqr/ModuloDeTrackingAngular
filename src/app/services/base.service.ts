import { Injectable } from '@angular/core';
import { Empresa } from '../models';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private localService: LocalService) {}
  get getIdEmpresa(): number {
    const empresa = this.localService.getData('empresa');
    return empresa.id;
  }
  get empresaParametro(): string {
    return `?idEmpresa=${this.getIdEmpresa}`;
  }
}
