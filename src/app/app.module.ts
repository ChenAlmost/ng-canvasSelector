import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BaseCanvasComponent } from './base-canvas/base-canvas.component';
import { DrawCanvasDirective } from './draw-canvas.directive';
import { RxjsCanvasComponent } from './rxjs-canvas/rxjs-canvas.component';
import { ObservablesDirective } from './shared/observables.directive';

@NgModule({
  declarations: [
    AppComponent,
    BaseCanvasComponent,
    DrawCanvasDirective,
    RxjsCanvasComponent,
    ObservablesDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
