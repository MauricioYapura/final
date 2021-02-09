import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Menus } from 'src/app/modelos/menus';
import { Roles } from '../../modelos/roles';
import { RolesService } from '../../servicios/roles.service';

import { MenusService } from 'src/app/servicios/menus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rolme',
  templateUrl: './rolme.component.html',
  styleUrls: ['./rolme.component.css']
})
export class RolmeComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,private rolesService:RolesService) { }
  page: number = 1;
    page1: number = 1;
 /// asigna
 myForm: FormGroup;
 ///
 menus:Menus;
 roles:Roles;
 menusStatico:Menus;
 radioSelected:number;
  /// busqueda
  searchText;
  searchText1;
   ///
   checks=false;
   //
   sel="";
  ngOnInit() {
    this.myForm =this.formBuilder.group({
      gender: new FormControl(['', Validators.required])
    });
    this.rolesService.getRolEst(1).subscribe((res:Roles)=>{
      this.roles=res;
      console.log(this.roles);
    })
  }

 //// ver rol
  onItemChange(item){
    this.radioSelected=item
    console.log(this.radioSelected);
   
    this.rolesService.getMenu(item).subscribe((res:any)=>{
      this.menus=res
      this.menusStatico=res;
      console.log(this.menus);
      
      if (this.menus==this.menusStatico   ) {
        console.log("igual");
        this.checks=true;
        this.page1=1;
        this.sel="1"
      }
    })
    
    }

 /// asig todo uno  nada
   onSubmitAsignado(){
    this.checks=false;
 console.log("Estados en los que se hace click ::"+ this.myForm.controls.gender.value+" rol: "+this.radioSelected);
   this.rolesService.getMenuAsig(this.radioSelected,this.myForm.controls.gender.value).subscribe((resp: Menus) => {
    this.menus=resp;
    this.menusStatico=resp;
    if (this.menus==this.menusStatico && this.myForm.controls.gender.value==1  ) {
      console.log("igual");
      this.checks=true;
      this.page1=1
      this.sel="1"
    }
   
   })
 }
/// para eliminar o agregar
 onChange(codm:number, isChecked: boolean) {
   
  
  if(isChecked) {
   console.log("agregar");
   
   this.rolesService.createRolme(this.radioSelected,codm).subscribe(resp=>{
    
    
    if (resp==0) {

      this.rolesService.getMenuAsig(this.radioSelected, 2).subscribe((res: any) => {
        this.menus=res
        this.menusStatico=res;
       
        this.page1 = 1;
        this.sel = "2"
      })
      Swal.fire({
        icon: 'error',
        title: 'Error.',
        text: 'El menu ya Existe!',
       
      })

    }
    else{
      this.rolesService.getMenuAsig(this.radioSelected,0).subscribe((res:any)=>{
        this.menus=res
        this.menusStatico=res;
        
        
        if (this.menus==this.menusStatico   ) {
        
          this.page1=1
          this.sel="0"
        }
      })
    }
    
   }) 
  } else {
// console.log("Eliminar");
    
    this.rolesService.dellRolme(this.radioSelected,codm).subscribe(res=>{
      this.rolesService.getMenuAsig(this.radioSelected,1).subscribe((res:any)=>{
        this.menus=res
        this.menusStatico=res;
        
        if (this.menus==this.menusStatico   ) {
          
          this.checks=true;
          this.sel="1";
          this.page1=1
        }
      })
    })
  }
}

handlePageChange(event) {
  
  this.rolesService.getMenu(0).subscribe((res:any)=>{
    this.menus=res
    this.menusStatico=res;
    if (this.menus==this.menusStatico   ) {
      
      this.checks=true;
      this.page1=1;
      this.sel="1"
    }
  })
  this.page = event;
}

}
