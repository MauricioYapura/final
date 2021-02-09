import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatgestionComponent } from './matgestion/matgestion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AreasComponent } from './areas/areas.component';
import { GruposComponent } from './grupos/grupos.component';

import { EtapasComponent } from './etapas/etapas.component';
import { DictaComponent } from './dicta/dicta.component';
import { PrograComponent } from './progra/progra.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { RolesComponent } from './roles/roles.component';
import { MenusComponent } from './menus/menus.component';
import { MeproComponent } from './mepro/mepro.component';
import { RolmeComponent } from './rolme/rolme.component';
import { UsurolComponent } from './usurol/usurol.component';
import { NgxPrintModule } from 'ngx-print';



@NgModule({
  declarations: [MatgestionComponent, HomeComponent, LoginComponent, AreasComponent,GruposComponent,EtapasComponent,
    DictaComponent,PrograComponent,ProyectosComponent, RolesComponent,
    MenusComponent,MeproComponent,RolmeComponent,UsurolComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxPrintModule
    
    
  ]
})
export class TallerModule { }