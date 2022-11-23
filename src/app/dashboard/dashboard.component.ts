import { Component, OnInit } from '@angular/core';
import { Empresa } from '../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  empresa: Empresa;
  constructor() {}

  ngOnInit(): void {
    this.empresa = JSON.parse(localStorage.getItem('empresa'));
  }
}
