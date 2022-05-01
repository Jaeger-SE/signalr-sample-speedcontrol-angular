import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from "primeng/panel";
import { ButtonModule } from "primeng/button";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CopViewComponent } from './components/cop-view/cop-view.component';
import { RadarViewComponent } from './components/radar-view/radar-view.component';
import { OfficeViewComponent } from './components/office-view/office-view.component';
import { IndexComponent } from './components/index/index.component';
import {TerminalModule} from "primeng/terminal";

@NgModule({
  declarations: [
    AppComponent,
    CopViewComponent,
    RadarViewComponent,
    OfficeViewComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PanelModule,
    TerminalModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
