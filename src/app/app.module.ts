import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { DxButtonModule, DxTreeListModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReporteUNComponent } from './reporte-un/reporte-un.component';
import { AppRoutingModule } from './app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaMovimientoComponent } from './movimiento/lista-movimiento.component';
import { NuevoMovimientoComponent } from './movimiento/nuevo-movimiento.component';
import { DetalleMovimientoComponent } from './movimiento/detalle-movimiento.component';
import { ReporteEmpComponent } from './reporte-emp/reporte-emp.component';
import { ListaCajasComponent } from './caja/lista-cajas.component';
import { NuevaCajaComponent } from './caja/nueva-caja.component';
import { DetalleCajaComponent } from './caja/detalle-caja.component';
import { ListaEmpresaComponent } from './empresa/lista-empresa.component';
import { NuevaEmpresaComponent } from './empresa/nueva-empresa.component';
import { DetalleEmpresaComponent } from './empresa/detalle-empresa.component';
import { ListaCategoriaComponent } from './categoria/lista-categoria.component';
import { NuevaCategoriaComponent } from './categoria/nueva-categoria.component';
import { DetalleCategoriaComponent } from './categoria/detalle-categoria.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HomeComponent } from './home/home.component';
import { NuevaUnidadNegocioComponent } from './unidad-negocio/nueva-unidad-negocio.component';
import { DetalleUnidadNegocioComponent } from './unidad-negocio/detalle-unidad-negocio.component';
import { ListaUnidadNegocioComponent } from './unidad-negocio/lista-unidad-negocio.component';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
@NgModule({
  declarations: [
    AppComponent,
    ReporteUNComponent,
    ReporteEmpComponent,
    HomeComponent,
    ListaMovimientoComponent,
    NuevoMovimientoComponent,
    DetalleMovimientoComponent,
    ListaCajasComponent,
    NuevaCajaComponent,
    DetalleCajaComponent,
    ListaEmpresaComponent,
    NuevaEmpresaComponent,
    DetalleEmpresaComponent,
    ListaCategoriaComponent,
    NuevaCategoriaComponent,
    DetalleCategoriaComponent,
    HomeComponent,
    NuevaUnidadNegocioComponent,
    DetalleUnidadNegocioComponent,
    ListaUnidadNegocioComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    DxTreeListModule,
    DxButtonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SweetAlert2Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
