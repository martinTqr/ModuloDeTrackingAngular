import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css'],
})
export class ListaUsuarioComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.lista().subscribe((usuarios) => {
      console.log(usuarios);
    });
  }
}
