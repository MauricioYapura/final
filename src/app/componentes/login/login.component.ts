import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/servicios/config.service';
import { MenuService } from '../../servicios/menu.service';
import { Personas } from '../../modelos/Personas';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private modalservice: NgbModal,
    private configService: ConfigService,
    private menuServ: MenuService,
    private router: Router) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
    })

  }

  onsubmit() {
    //console.log(this.loginform.controls.usuario.value + " clave :" + this.loginform.controls.password.value);

    this.menuServ.getLogin(this.loginform.controls.usuario.value, this.loginform.controls.password.value).subscribe(

      (resp: Personas) => {
       // console.log(resp);
        if (resp!=null) {
          localStorage.setItem('currentUser', JSON.stringify(resp))
          localStorage.setItem('token',resp.token);
          this.configService.nombreUsuario = resp.nombre+" "+ resp.ap+" " + resp.am;
          this.rutasLogin(resp.login, this.router);
          swal.fire('Login', `Hola ${resp.nombre}, has iniciado sesión con éxito!`, 'success');
        }
        else
        swal.fire('Error', `Usuario o password incorrecto!`, 'warning');
       
       
      }
    )

  }

  rutasLogin( usuario, xr: Router){
      let promesa=new Promise (function (resolve:any ,reject:any){
        resolve();
      });
      promesa.then(function() {
        xr.navigate([{ outlets: { navbar: ['roles', usuario] } }])
      }).then(function(){
        xr.navigate(['/personal']);
        
      })
  }

}
