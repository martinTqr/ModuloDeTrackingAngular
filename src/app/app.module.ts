import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { DxButtonModule, DxTreeListModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CajaComponent } from './caja/caja.component';
import { ReporteEmpComponent } from './reporte-emp/reporte-emp.component';
import { ReporteUNComponent } from './reporte-un/reporte-un.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app/app-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { MovimientoComponent } from './movimiento/movimiento.component';

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
    MovimientoComponent,
  ],
  imports: [BrowserModule, DxTreeListModule, DxButtonModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
