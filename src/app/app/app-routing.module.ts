import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleCajaComponent } from '../caja/detalle-caja.component';
import { ListaCajasComponent } from '../caja/lista-cajas.component';
import { NuevaCajaComponent } from '../caja/nueva-caja.component';
import { DetalleCategoriaComponent } from '../categoria/detalle-categoria.component';
import { ListaCategoriaComponent } from '../categoria/lista-categoria.component';
import { NuevaCategoriaComponent } from '../categoria/nueva-categoria.component';
import { DetalleEmpresaComponent } from '../empresa/detalle-empresa.component';
import { ListaEmpresaComponent } from '../empresa/lista-empresa.component';
import { NuevaEmpresaComponent } from '../empresa/nueva-empresa.component';
import { HomeComponent } from '../home/home.component';
import { DetalleMovimientoComponent } from '../movimiento/detalle-movimiento.component';
import { ListaMovimientoComponent } from '../movimiento/lista-movimiento.component';
import { NuevoMovimientoComponent } from '../movimiento/nuevo-movimiento.component';
import { ReporteEmpComponent } from '../reporte-emp/reporte-emp.component';
import { ReporteUNComponent } from '../reporte-un/reporte-un.component';
import { DetalleUnidadNegocioComponent } from '../unidad-negocio/detalle-unidad-negocio.component';
import { ListaUnidadNegocioComponent } from '../unidad-negocio/lista-unidad-negocio.component';
import { NuevaUnidadNegocioComponent } from '../unidad-negocio/nueva-unidad-negocio.component';

const rutas: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reporte-emp/:id', component: ReporteEmpComponent },
  { path: 'reporte-un/:id', component: ReporteUNComponent },

  { path: 'movimiento/lista', component: ListaMovimientoComponent },
  { path: 'movimiento/nuevo', component: NuevoMovimientoComponent },
  { path: 'movimiento/detalle/:id', component: DetalleMovimientoComponent },

  { path: 'unidad-negocio/lista', component: ListaUnidadNegocioComponent },
  { path: 'unidad-negocio/nuevo', component: NuevaUnidadNegocioComponent },
  {
    path: 'unidad-negocio/detalle/:id',
    component: DetalleUnidadNegocioComponent,
  },

  { path: 'caja/lista', component: ListaCajasComponent },
  { path: 'caja/detalle/:id', component: DetalleCajaComponent },
  { path: 'caja/nueva', component: NuevaCajaComponent },

  { path: 'empresa/lista', component: ListaEmpresaComponent },
  { path: 'empresa/detalle/:id', component: DetalleEmpresaComponent },
  { path: 'empresa/nueva', component: NuevaEmpresaComponent },
  //rutas para categoria
  { path: 'categoria/lista', component: ListaCategoriaComponent },
  { path: 'categoria/detalle/:id', component: DetalleCategoriaComponent },
  { path: 'categoria/nueva', component: NuevaCategoriaComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
