import { Component } from '@angular/core';

@Component({
  //selector: "nombre de la etiqueta"
  selector: 'app-root',
  //Template Url: es lo que se va a mostrar con esa etiqueta
  templateUrl: './app.component.html',
  //stylesUrl: "es el estilo del componente"
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ricardo';
}
