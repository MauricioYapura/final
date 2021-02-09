import { Injectable } from '@angular/core';
import { NavComponent } from '../static/nav/nav.component';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  nombreUsuario:string='Invitado';
  constructor( ) { 
    console.log("usuario: "+ this.nombreUsuario)
  }
  susuarioFooter(user:string){
    console.log("entra: "+ user);
    this.nombreUsuario=user;
  }
  
}
