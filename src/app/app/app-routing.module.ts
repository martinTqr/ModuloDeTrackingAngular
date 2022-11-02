import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';
import { ReporteEmpComponent } from '../reporte-emp/reporte-emp.component';
import { ReporteUNComponent } from '../reporte-un/reporte-un.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'reporte-emp', component: ReporteEmpComponent },
  { path: 'reporte-un', component: ReporteUNComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
