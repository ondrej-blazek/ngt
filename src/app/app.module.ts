// NG core and NPM
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Declarations
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

// Local functionality - Imports
import { NgsModule } from '@ngs/ngs.module';
import { NgcModule } from '@ngc/ngc.module';
import { NgtModule } from '@ngt/ngt.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgsModule,
    NgcModule,
    NgtModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
