import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../servicios/config.service';
import swal from 'sweetalert2';
import { Personas } from '../../modelos/Personas';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 
  constructor(public configService:ConfigService,
    private router: Router) { }
    xusuario = 'Invitado';
  ngOnInit() {
    if (this.isAuthenticated()) {
      this.xusuario = this.getCurrentSesion().nombre+" "+this.getCurrentSesion().ap+" "+this.getCurrentSesion().am;
     
      this.configService.nombreUsuario=this.xusuario
    }else {
      console.log("erorrr entra");
      
      this.xusuario = 'Invitado';
    }
  
  }

  getCurrentSesion():Personas {
    var xper = localStorage.getItem('currentUser');
    return (xper) ?  <Personas> JSON.parse(xper) : null;
  }
  
  isAuthenticated(): boolean {
    return (this.getCurrentSesion() != null) ? true : false;
  };
 
  date=Date.now();

  logout(){
    const usuario=this.configService.nombreUsuario;
    this.rutasLogin(usuario, this.router);
    this.configService.nombreUsuario ='Invitado';
    this.xusuario='Invitado';
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  rutasLogin( usuario, xr: Router){
    let promesa=new Promise (function (resolve:any ,reject:any){
      resolve();
    });
    promesa.then(function() {
      xr.navigate([{ outlets: { navbar: ['roles', 0] } }])
    }).then(function(){
      xr.navigate(['/portada']);
      
    })
  }

}
