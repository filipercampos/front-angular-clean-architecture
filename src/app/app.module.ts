import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DataModule } from './data/data.module';
import { DomainModule } from './domain/domain.module';
import { InfraModule } from './infra/infra.module';
import { PresentationModule } from './presentation/presentation.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    DomainModule,
    DataModule,
    InfraModule,
    PresentationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
