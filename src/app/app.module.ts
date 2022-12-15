import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  DxButtonModule,
  DxDataGridModule,
  DxPopupModule,
  DxTreeListModule,
} from 'devextreme-angular';
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
import { AdminComponent } from './admin/admin.component';
import { NuevaUnidadNegocioComponent } from './unidad-negocio/nueva-unidad-negocio.component';
import { DetalleUnidadNegocioComponent } from './unidad-negocio/detalle-unidad-negocio.component';
import { ListaUnidadNegocioComponent } from './unidad-negocio/lista-unidad-negocio.component';
import { NuevoGrupoCajaComponent } from './grupo-caja/nuevo-grupo-caja.component';
import { ListaGrupoCajaComponent } from './grupo-caja/lista-grupo-caja.component';
import { DetalleGrupoCajaComponent } from './grupo-caja/detalle-grupo-caja.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxMaskModule } from 'ngx-mask';
//configuracion dev extreme para los puntos y comas
import config from 'devextreme/core/config';
import * as localization from 'devextreme/localization';
import { ListaUsuarioComponent } from './usuario/lista-usuario.component';
import { DetalleUsuarioComponent } from './usuario/detalle-usuario.component';
import { NuevoUsuarioComponent } from './usuario/nuevo-usuario.component';
import { ListaTransferenciaCajaListaComponent } from './caja/lista-transferencia-caja.component';
import { NuevaTransferenciaCajaComponent } from './caja/nueva-transferencia-caja.component';
import { VolverComponent } from './botones/volver.component';
import { ReporteTransferenciaComponent } from './caja/reporte-transferencia.component';
import { ReporteCajasComponent } from './reporte-cajas/reporte-cajas.component';
(localization as any).disableIntl();
config({
  thousandsSeparator: '.',
  decimalSeparator: ',',
});
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
@NgModule({
  declarations: [
    AppComponent,
    ReporteUNComponent,
    ReporteEmpComponent,
    AdminComponent,
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
    NuevaUnidadNegocioComponent,
    DetalleUnidadNegocioComponent,
    ListaUnidadNegocioComponent,
    NuevoGrupoCajaComponent,
    ListaGrupoCajaComponent,
    DetalleGrupoCajaComponent,
    HomeComponent,
    DashboardComponent,
    ListaUsuarioComponent,
    DetalleUsuarioComponent,
    NuevoUsuarioComponent,
    NuevaTransferenciaCajaComponent,
    ListaTransferenciaCajaListaComponent,
    VolverComponent,
    ReporteTransferenciaComponent,
    ReporteCajasComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    DxTreeListModule,
    DxButtonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SweetAlert2Module,
    DxDataGridModule,
    DxPopupModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
