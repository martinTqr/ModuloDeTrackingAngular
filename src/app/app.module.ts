import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { BannerComponent } from './components/banner';
import { ArbolComponent } from './arbol/arbol.component';
import { DxTreeListModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CajaComponent } from './caja/caja.component';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
@NgModule({
  declarations: [AppComponent, BannerComponent, ArbolComponent, CajaComponent],
  imports: [BrowserModule, DxTreeListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
