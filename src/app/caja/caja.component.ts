import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css'],
})
export class CajaComponent implements OnInit {
  @Input() nombre: string = '';
  @Input() monto: string = '';

  ngOnInit(): void {}
}
