import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { DxButtonModule, DxTreeListModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CajaComponent } from './caja/caja.component';
import { ReporteEmpComponent } from './reporte-emp/reporte-emp.component';
import { ReporteUNComponent } from './reporte-un/reporte-un.component';
import { AppRoutingModule } from './app/app-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaMovimientoComponent } from './movimiento/lista-movimiento.component';
import { NuevoMovimientoComponent } from './movimiento/nuevo-movimiento.component';
import { DetalleMovimientoComponent } from './movimiento/detalle-movimiento.component';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
@NgModule({
  declarations: [
    AppComponent,
    ReporteUNComponent,
    CajaComponent,
    ReporteEmpComponent,
    InicioComponent,
    ListaMovimientoComponent,
    NuevoMovimientoComponent,
    DetalleMovimientoComponent,
  ],
  imports: [
    BrowserModule,
    DxTreeListModule,
    DxButtonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
