import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './static/footer/footer.component';
import { NavComponent } from './static/nav/nav.component';
import {TallerModule} from './componentes/tallerModule'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import { ServiciosModule } from './servicios/servicios.module';
import { PersonaModule } from './componentes/personas/persona.module';


import{ HttpClientModule } from "@angular/common/http/";


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TallerModule,
    PersonaModule,
    ServiciosModule,
    HttpClientModule,
    
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
