import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Roles } from 'src/app/modelos/roles';
import { RolesService } from 'src/app/servicios/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,private rolesService:RolesService) { }
    page: number = 1;
    //add
     registerForm: FormGroup;
     submitted = false;
     modalReference: NgbModalRef;  //para mensaje
     roles:Roles;
    
     rol:Roles;
     //modificar
     registerForm2: FormGroup;
     rolMod:Roles=null;
    /// estod
    myForm: FormGroup;
    /// busqueda
    searchText;
  ngOnInit() {
    this.rolesService.getRolEst(1).subscribe((res:Roles)=>{
      this.roles=res;
      
    })
    this.myForm =this.formBuilder.group({
      gender: new FormControl(['', Validators.required])
    });
    this.registerForm = this.formBuilder.group({      
      rol: ['', [Validators.required, Validators.maxLength(40)]],
    });
    this.registerForm2 = this.registerForm;
  }
///
///adcicionar
onSubmit() {
  let fotoO=null;
  
  this.submitted = true;
  // stop here if form is invalid
  if ((this.registerForm.invalid) == true) {
    return;
  }
  this.rol={
    codr:null,
    nombre:(this.registerForm.controls.rol.value).toUpperCase(),
    estado:1
  }
  Swal.fire({
    title: '¿Esta seugro de crear el Rol?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, crear Rol!'
  }).then((result) => {
    if (result.isConfirmed) {
      
      this.rolesService.create(this.rol).subscribe((resp:any)=>{
        if (resp==0) {
          Swal.fire({
            icon: 'error',
            title: 'Error.',
            text: 'El Rol ya Existe!',
           
          })
        }else{
          this.rolesService.getRolEst(1).subscribe((resp: Roles) => {
            this.roles = resp;
            this.myForm.reset({garder:'1'} );  
            Swal.fire({
              icon: 'success',
              title: 'Creado con exito',
              showConfirmButton: false,
              timer: 1500
            })  
          }) 
        }
       
      })
      
    }
  })
  this.modalReference.close();  //para cerrar
}
get f() { return this.registerForm.controls; }

llamaModalAdd(modal) {
  this.submitted = false;
  //inicializar valores del formulario
  this.registerForm.reset([  { rol: '' }]);
  //para que la ventana modal se cierre
 
  this.modalReference = this.modalService.open(modal);
}

  /// roles get estados
  onSubmitEstado(){
  // console.log("Estados en los que se hace click ::"+ this.myForm.controls.gender.value);
   this.rolesService.getRolEst(this.myForm.controls.gender.value).subscribe((resp: Roles) => {
     this.roles = resp;
   })
 }

 //modificar
 onSubmit2() {
  this.submitted = true;
  // stop here if form is invalid
  if ((this.registerForm2.invalid) == true) {
    return;
  }
  this.rol={
    codr:this.rolMod.codr,
    nombre:(this.registerForm2.controls.rol.value).toUpperCase(),
    estado:this.rolMod.estado
  }
  Swal.fire({
    title: '¿Esta seugro de modificar la Area?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si!'
  }).then((result) => {
    if (result.isConfirmed) {
      
      this.rolesService.update(this.rol).subscribe(res=>{
        if (res==0) {
          Swal.fire({
            icon: 'error',
            title: 'Error.',
            text: 'El Rol ya Existe!',
           
          })
        }else{
          this.rolesService.getRolEst(1).subscribe((resp: Roles) => {
            this.roles = resp;
            this.myForm.reset({garder:'1'} );  
            Swal.fire({
              icon: 'success',
              title: 'Creado con exito',
              showConfirmButton: false,
              timer: 1500
            })  
          }) 
        }  
      })
      
    }
  })

  this.modalReference.close();  //para cerrar
}
get f2() { return this.registerForm2.controls; }

llamaModalMod(modal, rol:Roles) {
  //para cargar datos para modificar
  this.registerForm2.reset({  rol: rol.nombre });
  this.rolMod=rol;
  //para que la ventana modal se cierre
  this.modalReference = this.modalService.open(modal);
}
 //elimoinar

 delete(rolDell:Roles){
  //console.log("eliminado");
     this.rol={
      codr:rolDell.codr,
      nombre:rolDell.nombre,
      estado:0
    }
     Swal.fire({
      title: '¿Esta seguro de Eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
       // console.log(this.area);
        this.rolesService.dell(this.rol.codr, this.rol).subscribe(res=>{
          this.rolesService.getRolEst(0).subscribe((resp: Roles) => {
            this.roles = resp;
            this.myForm.reset({garder:'0'} );    
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              showConfirmButton: false,
              timer: 1500
            })
          })  
        })
       
      }
    })
   }

   /// habilitar
 estadoHabArea(rolHab:Roles){
  // console.log('hanilitado');
   this.rol={
    codr:rolHab.codr,
    nombre:rolHab.nombre,
    estado:1
  }
   Swal.fire({
    title: '¿Esta seguro de Habilitar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.isConfirmed) {
     // console.log(this.area);
      this.rolesService.estadohab(this.rol.codr,this.rol).subscribe(res=>{

        this.rolesService.getRolEst(1).subscribe((res:any)=>{
          this.roles=res; 
          this.myForm.reset({garder:'1'} );    
          Swal.fire({
            icon: 'success',
            title: 'Habilitado',
            showConfirmButton: false,
            timer: 1500
          })
        })   
      })
     
    }
  })
 }
}
