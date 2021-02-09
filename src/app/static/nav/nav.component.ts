import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Personas } from 'src/app/modelos/Personas';
import { ConfigService } from 'src/app/servicios/config.service';
import { MenuService } from '../../servicios/menu.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  roles: any;
  menus: any;
  constructor(private menu: MenuService,
    private activedRoute: ActivatedRoute,
    public configService: ConfigService
  ) {
   
  }
  codRoles: number;
  ngOnInit() {
    this.activedRoute.params.subscribe(usuario => {
      if (this.isAuthenticated()) {       
       this.menu.getRoles(usuario.login).subscribe(resp => {
         this.roles = resp;
         if(resp==0){
         this.listaMenu();}
         else{
          this.menu.getMenus(1).subscribe(res => {

            this.menus = res;
           // console.log(this.menus)
          })
         }
       })}
     })
  }

  getCurrentSesion(): Personas {
    var xper =localStorage.getItem('currentUser');
    return (xper) ? <Personas> JSON.parse(xper) : null;
  }
  
  isAuthenticated(): boolean {
    return (this.getCurrentSesion() != null) ? true : false;
  };

  onRolesChange(xindex) {
   // console.log(this.codRoles)
    this.menu.getMenus(xindex).subscribe(res => {

      this.menus = res;
     // console.log(this.menus)
    })
  }
  listaMenu(){
    this.menu.getMenus(0).subscribe(res => {

      this.menus = res;
     // console.log(this.menus)
    })
  }


}
