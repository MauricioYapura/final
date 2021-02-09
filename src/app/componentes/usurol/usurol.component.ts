import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cDatos } from 'src/app/modelos/cDatos';
import { Roles } from 'src/app/modelos/roles';
import { UsurolService } from 'src/app/servicios/usurol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usurol',
  templateUrl: './usurol.component.html',
  styleUrls: ['./usurol.component.css']
})
export class UsurolComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder, private usuRolService: UsurolService) { }
    page: number = 1;
    page1: number = 1;
    roles:Roles;
    usuarios:cDatos;
    rolesStatico:Roles;
    radioSelected:number;
     /// busqueda
     searchText;
     searchText1;
    /// asigna
 myForm: FormGroup;
  ///
  checks=false;
  //
  sel="";
  ngOnInit() {
    this.myForm =this.formBuilder.group({
      gender: new FormControl(['', Validators.required])
    });
    this.usuRolService.getLogin(1).subscribe((res:any)=>{
      this.usuarios=res;
     
      
    })
  }

   //// ver usuario
  onItemChange(item){
    this.radioSelected=item
    
   
    this.usuRolService.getRol(item).subscribe((res:any)=>{
      this.roles=res
      this.rolesStatico=res;
      
      
      if (this.roles==this.rolesStatico    ) {
       
        this.checks=true;
        this.page1=1;
        this.sel="1"
      }
    })
    
    }
/// asig todo uno  nada
   onSubmitAsignado(){
    this.checks=false;
 
   this.usuRolService.getRolesAsig(this.radioSelected,this.myForm.controls.gender.value).subscribe((resp: Roles) => {
    this.roles=resp;
    this.rolesStatico=resp;
    if (this.roles==this.rolesStatico && this.myForm.controls.gender.value==1  ) {
     
      this.checks=true;
      this.page1=1
      this.sel="1"
    }
   
   })
 }
 onChange(codr:number, isChecked: boolean) {
   
  
  if(isChecked) {
  //  console.log("agregar");
   
   this.usuRolService.createUsurol(this.radioSelected,codr).subscribe(resp=>{
    if (resp==0) {

      this.usuRolService.getRolesAsig(this.radioSelected, 2).subscribe((res: any) => {
        this.roles=res
        this.rolesStatico=res;
        this.page1 = 1;
        this.sel = "2"
      })
      Swal.fire({
        icon: 'error',
        title: 'Error.',
        text: 'El rol ya Existe!',
       
      })

    }else{
      this.usuRolService.getRolesAsig(this.radioSelected,0).subscribe((res:any)=>{
        this.roles=res
        this.rolesStatico=res;
       
        
        if (this.roles==this.rolesStatico   ) {
         
          this.page1=1
          this.sel="0"
        }
      })
    }
   
   }) 
  } else {
    // console.log("Eliminar");
   
    this.usuRolService.dellUsurol(this.radioSelected,codr).subscribe(res=>{
      this.usuRolService.getRolesAsig(this.radioSelected,1).subscribe((res:any)=>{
        this.roles=res
        this.rolesStatico=res;
       
        
        if (this.roles==this.rolesStatico   ) {
         
          this.checks=true;
          this.sel="1";
          this.page1=1
        }
      })
    })
  }
}
handlePageChange(event) {
 
  this.usuRolService.getRol(0).subscribe((res:any)=>{
    this.roles=res
    this.rolesStatico=res;
    if (this.roles==this.rolesStatico   ) {
     
      this.checks=true;
      this.page1=1
      this.sel="1"
    }
  })
  this.page = event;
}
}
