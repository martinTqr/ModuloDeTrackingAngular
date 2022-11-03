import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';
import { DetalleMovimientoComponent } from '../movimiento/detalle-movimiento.component';
import { ListaMovimientoComponent } from '../movimiento/lista-movimiento.component';
import { NuevoMovimientoComponent } from '../movimiento/nuevo-movimiento.component';
import { ReporteEmpComponent } from '../reporte-emp/reporte-emp.component';
import { ReporteUNComponent } from '../reporte-un/reporte-un.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'reporte-emp', component: ReporteEmpComponent },
  { path: 'reporte-un', component: ReporteUNComponent },
  { path: 'movimiento/lista', component: ListaMovimientoComponent },
  { path: 'movimiento/nuevo', component: NuevoMovimientoComponent },
  { path: 'movimiento/detalle/:id', component: DetalleMovimientoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
