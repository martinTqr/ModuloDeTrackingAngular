import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxPivotGridModule } from 'devextreme-angular';
import { AppComponent } from './components/app/app.component';
import { BannerComponent } from './components/banner';
import { GridComponent } from './components/grid/grid.component';

@NgModule({
  declarations: [AppComponent, BannerComponent, GridComponent],
  imports: [BrowserModule, DxPivotGridModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
