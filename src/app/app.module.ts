// NG core and NPM
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Declarations
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

// NGT base code
import { NgsModule } from '@ngs/ngs.module';
import { NgcModule } from '@ngc/ngc.module';
import { NgtModule } from '@ngt/ngt.module';

// Standard app / testing
import { HomeModule } from '@app/home/home.module';
import { SandboxModule } from '@app/sandbox/sandbox.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgsModule,
    NgcModule,
    NgtModule,
    HomeModule,
    SandboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
