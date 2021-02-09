import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Validators } from '@angular/forms';
import { MatgestionComponent } from './componentes/matgestion/matgestion.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { NavComponent } from './static/nav/nav.component';
import { PersonasComponent } from './componentes/personas/personas.component';
import { AreasComponent } from './componentes/areas/areas.component';
import { GruposComponent } from './componentes/grupos/grupos.component';
import { EtapasComponent } from './componentes/etapas/etapas.component';
import { DictaComponent } from './componentes/dicta/dicta.component';
import { PrograComponent } from './componentes/progra/progra.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { RolesComponent } from './componentes/roles/roles.component';
import { MenusComponent } from './componentes/menus/menus.component';
import { MeproComponent } from './componentes/mepro/mepro.component';
import { RolmeComponent } from './componentes/rolme/rolme.component';
import { UsurolComponent } from './componentes/usurol/usurol.component';



const routes: Routes = [
 {path:'', component: HomeComponent},
 {path:'roles/:login', component: NavComponent, outlet:'navbar'},
 {path:'', component: NavComponent, outlet:'navbar'},
 {path:'login', component: LoginComponent},
 {path:'personal', component: PersonasComponent},
 {path:'areas', component: AreasComponent},
 {path:'grupos', component: GruposComponent},
 {path:'portada', component: HomeComponent},
 { path: 'personal/:xestado', component: PersonasComponent },
 {path:'etapas', component: EtapasComponent},
 {path:'dicta', component: DictaComponent},
 {path:'progra', component: PrograComponent},
 {path:'proyectos', component: ProyectosComponent},
 {path:'rolesG', component: RolesComponent},
 {path:'menusG', component: MenusComponent},
 {path:'mepro', component: MeproComponent},
 {path:'rolme', component: RolmeComponent},
 {path:'usurol', component: UsurolComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
