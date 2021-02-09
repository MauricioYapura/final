import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Menus } from 'src/app/modelos/menus';
import { Procesos } from 'src/app/modelos/procesos';
import { MenusService } from 'src/app/servicios/menus.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mepro',
  templateUrl: './mepro.component.html',
  styleUrls: ['./mepro.component.css']
})
export class MeproComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder, private menusService: MenusService) { }
  page: number = 1;
  page1: number = 1;

  menus: Menus
  procesos: Procesos = null;
  radioSelected: number;
  menusStatico: Procesos;
  /// estod
  myForm: FormGroup;
  myMenus: FormGroup;
  /// busqueda
  searchText;
  searchText1
  ///
  checks = false;
  //
  sel = "";
  ngOnInit() {
    this.myForm = this.formBuilder.group({
      gender: new FormControl(['', Validators.required])
    });
    this.myMenus = this.formBuilder.group({
      menuS: new FormControl(['', Validators.required])
    });
    this.menusService.getMenuEst(1).subscribe((res: Menus) => {
      this.menus = res;
    
    })
  }

  /// asig todo uno  nada
  onSubmitAsignado() {
    this.checks = false;

    this.menusService.getMenuAsig(this.radioSelected, this.myForm.controls.gender.value).subscribe((resp: Procesos) => {
      this.procesos = resp;
      this.menusStatico = resp;
      if (this.procesos == this.menusStatico && this.myForm.controls.gender.value == 1) {

        this.checks = true;
        this.page1 = 1
        this.sel = "1"
      }

    })
  }
  //// ver menu
  onItemChange(item) {
    this.radioSelected = item
  

    this.menusService.getProces(item).subscribe((res: any) => {
      this.procesos = res
      this.menusStatico = res;
      if (this.procesos == this.menusStatico) {
       
        this.checks = true;
        this.page1 = 1
        this.sel = "1"
      }
    })

  }


  /// para eliminar o agregar
  onChange(codp: number, isChecked: boolean) {


    if (isChecked) {
      // console.log("agregar");
     
      this.menusService.createMepro(this.radioSelected, codp).subscribe(resp => {
      
        if (resp != 0) {
          this.menusService.getMenuAsig(this.radioSelected, 0).subscribe((res: any) => {
            this.procesos = res
            this.menusStatico = res;
            // console.log("agregado");

            this.page1 = 1;
            this.sel = "0";
            
          })
        }
        if (resp == 0) {
          this.menusService.getMenuAsig(this.radioSelected, 2).subscribe((res: any) => {
            this.procesos = res
            this.menusStatico = res;
            this.page1 = 1;
            this.sel = "2"
          })
          this.checks = false;
          Swal.fire({
            icon: 'error',
            title: 'Error.',
            text: 'La Area ya Existe!',
          })
        }
      })


    } else {
      // console.log("Eliminar");
    
      this.menusService.dellMepro(this.radioSelected, codp).subscribe(res => {

        this.menusService.getMenuAsig(this.radioSelected, 1).subscribe((res: any) => {
          this.procesos = res
          this.menusStatico = res;
          // console.log("eliminado");
          this.page1 = 1
        })
      })
    }
  }

  handlePageChange(event) {
   
    this.menusService.getProces(0).subscribe((res: any) => {
      this.procesos = res
      this.menusStatico = res;
      if (this.procesos == this.menusStatico) {
       
        this.checks = true;
        this.page1 = 1
        this.sel = "1"
      }
    })
    this.page = event;
  }
}
