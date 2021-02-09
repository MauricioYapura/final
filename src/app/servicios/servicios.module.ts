import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriasService } from './materias.service';
import { PersonasService } from './personas.service';
import { from } from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import { MenuService } from './menu.service';
import { AreasService } from './areas.service';
import { ConfigService } from './config.service';
import { GruposService } from './grupos.service';
import { EtapasService } from './etapas.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers : [
    MateriasService,
    MenuService,
    PersonasService,
    AreasService,ConfigService,
    GruposService,
    EtapasService
  ]
})
export class ServiciosModule { }
