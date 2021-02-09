import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Menus } from 'src/app/modelos/menus';
import { MenusService } from 'src/app/servicios/menus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,private menuService:MenusService) { }
    page: number = 1;
    //add
     registerForm: FormGroup;
     submitted = false;
     modalReference: NgbModalRef;  //para mensaje
     menus:Menus;
    
     menu:Menus;
     //modificar
     registerForm2: FormGroup;
     menuMod:Menus=null;
    /// estod
    myForm: FormGroup;
    /// busqueda
    searchText;
  ngOnInit() {
    this.menuService.getMenuEst(1).subscribe((res:Menus)=>{
      this.menus=res;
    
    });
    this.myForm =this.formBuilder.group({
      gender: new FormControl(['', Validators.required])
    });
    this.registerForm = this.formBuilder.group({      
      menu: ['', [Validators.required, Validators.maxLength(40)]],
    });
    this.registerForm2 = this.registerForm;
  }

  ///
///adcicionar
onSubmit() {
  
  
  this.submitted = true;
  // stop here if form is invalid
  if ((this.registerForm.invalid) == true) {
    return;
  }
  this.menu={
    codm:null,
    nombre:(this.registerForm.controls.menu.value).toUpperCase(),
    estado:1
  }
  Swal.fire({
    title: '¿Esta seugro de crear el Menu?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, crear Menu!'
  }).then((result) => {
    if (result.isConfirmed) {
      // console.log(this.menu);
      this.menuService.create(this.menu).subscribe((resp:any)=>{
        if(resp!=0){
        this.menuService.getMenuEst(1).subscribe((resp: Menus) => {
          this.menus = resp;
          this.myForm.reset({garder:'1'} );  
          Swal.fire({
            icon: 'success',
            title: 'Creado con exito',
            showConfirmButton: false,
            timer: 1500
          })  
        }) 
      }
      if (resp==0) {
        Swal.fire({
          icon: 'error',
          title: 'Error.',
          text: 'El Menu ya Existe!',
         
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
  this.registerForm.reset([  { menu: '' }]);
  //para que la ventana modal se cierre
 
  this.modalReference = this.modalService.open(modal);
}
 /// roles get estados
 onSubmitEstado(){
  // console.log("Estados en los que se hace click ::"+ this.myForm.controls.gender.value);
   this.menuService.getMenuEst(this.myForm.controls.gender.value).subscribe((resp: Menus) => {
     this.menus = resp;
   })
 }

 //modificar
 onSubmit2() {
  this.submitted = true;
  // stop here if form is invalid
  if ((this.registerForm2.invalid) == true) {
    return;
  }
  this.menu={
    codm:this.menuMod.codm,
    nombre:(this.registerForm2.controls.menu.value).toUpperCase(),
    estado:this.menuMod.estado
  }
  Swal.fire({
    title: '¿Esta seugro de modificar ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si!'
  }).then((result) => {
    if (result.isConfirmed) {
      // console.log(this.menu);
      this.menuService.update(this.menu).subscribe(res=>{
        
        if(res!=0){
          this.menuService.getMenuEst(1).subscribe((resp: Menus) => {
            this.menus = resp;
            this.myForm.reset({garder:'1'} );  
            Swal.fire({
              icon: 'success',
              title: 'Modificado con exito',
              showConfirmButton: false,
              timer: 1500
            })  
          }) 
        }
        if (res==0) {
          Swal.fire({
            icon: 'error',
            title: 'Error.',
            text: 'El Menu ya Existe!',
           
          })
        }
      })
      
    }
  })

  this.modalReference.close();  //para cerrar
}
get f2() { return this.registerForm2.controls; }

llamaModalMod(modal, menu:Menus) {
  //para cargar datos para modificar
  this.registerForm2.reset({  menu: menu.nombre });
  this.menuMod=menu;
  //para que la ventana modal se cierre
  this.modalReference = this.modalService.open(modal);
}
 //elimoinar

 delete(menuDell:Menus){
  //console.log("eliminado");
     this.menu={
      codm:menuDell.codm,
      nombre:menuDell.nombre,
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
        this.menuService.dell(this.menu.codm, this.menu).subscribe(res=>{
          this.menuService.getMenuEst(0).subscribe((resp: Menus) => {
            this.menus = resp;
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
 estadoHab(menuHab:Menus){
  // console.log('hanilitado');
   this.menu={
    codm:menuHab.codm,
    nombre:menuHab.nombre,
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
      this.menuService.estadohab(this.menu.codm,this.menu).subscribe(res=>{
        this.menuService.getMenuEst(1).subscribe((res:any)=>{
          this.menus=res; 
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
