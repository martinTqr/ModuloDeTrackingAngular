import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { BannerComponent } from './components/banner';
import { ReporteUNComponent } from './components/reporteUN/reporteUN.component';
import { DxButtonModule, DxTreeListModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CajaComponent } from './caja/caja.component';
import { ReporteEmpComponent } from './components/reporte-emp/reporte-emp.component';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ReporteUNComponent,
    CajaComponent,
    ReporteEmpComponent,
  ],
  imports: [BrowserModule, DxTreeListModule, DxButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
