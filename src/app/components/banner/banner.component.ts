import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  public title: string;
  public age: number;
  public names: string[];
  public dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];

  constructor() {
    this.title = 'Este es el titulo';
    this.age = 15;
    this.names = ['Ramon', 'Pepe', 'Raul'];
  }

  //ngOnInit es la primer funcion que se ejecuta al montar el componente
  ngOnInit(): void {
    const [, , p3] = this.dbz;
  }

  addAge(): void {
    this.age++;
  }
  decreaseAge(): void {
    this.age--;
  }
}
