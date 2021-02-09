import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CGrupos } from '../../modelos/grupos';
import { GruposService } from '../../servicios/grupos.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  page: number = 1;
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder, private gruposService: GruposService) { }
  //addd
  registerForm: FormGroup;
  submitted = false;
  modalReference: NgbModalRef;  //para mensaje
  grupos: CGrupos;
  grupo: CGrupos;
  //modificar
  registerForm2: FormGroup;
  grupoMod: CGrupos = null;

  /// estod
  myForm: FormGroup;
  /// busqueda
  searchText;
  ngOnInit() {
    this.gruposService.getGruposEstado(1).subscribe((res: any) => {
      this.grupos = res;      
    })

    this.myForm =this.formBuilder.group({
      gender: new FormControl(['', Validators.required])
    });

    this.registerForm = this.formBuilder.group({
      grupo: ['', [Validators.required, Validators.maxLength(30)]],
    });
    this.registerForm2 = this.registerForm;
  }

  ///adcicionar
  onSubmit() {


    this.submitted = true;
    // stop here if form is invalid
    if ((this.registerForm.invalid) == true) {
      return;
    }
    this.grupo = {
      codg: null,
      nombre: (this.registerForm.controls.grupo.value).toUpperCase(),
      estado: 1
    }
    Swal.fire({
      title: '¿Esta seugro de crear la Area?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, crear Area!'
    }).then((result) => {
      if (result.isConfirmed) {
      //  console.log(this.grupo);
        this.gruposService.create(this.grupo).subscribe((resp:any) => {
          if(resp!=0){
          this.gruposService.getGruposEstado(1).subscribe((res: any) => {
            this.grupos = res;    
            this.myForm.reset({garder:'1'} );  
            Swal.fire({
              icon: 'success',
              title: 'Creado con exito',
              showConfirmButton: false,
              timer: 1500
            })
          })}
          if (resp==0) {
            Swal.fire({
              icon: 'error',
              title: 'Error.',
              text: 'El Grupo ya Existe!',             
            })
          }
        })
        
      }
    })
    this.modalReference.close();  //para cerrar
  }
  get f() { return this.registerForm.controls; }


  llamaModalAddGrupo(modal) {
    this.submitted = false;
    //inicializar valores del formulario
    this.registerForm.reset([{ grupo: '' }]);
    //para que la ventana modal se cierre

    this.modalReference = this.modalService.open(modal);
  }
  //modificar
  onSubmit2() {
    this.submitted = true;
    // stop here if form is invalid
    if ((this.registerForm2.invalid) == true) {
      return;
    }
    this.grupo = {
      codg: this.grupoMod.codg,
      nombre: (this.registerForm2.controls.grupo.value).toUpperCase(),
      estado: this.grupoMod.estado
    }
   // console.log(this.grupo);
    
    Swal.fire({
      title: '¿Esta seugro de modificar la Area?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
       // console.log(this.grupo);
        this.gruposService.update(this.grupo).subscribe(res => {
     
          
          if(res!=0){
            this.gruposService.getGruposEstado(1).subscribe((res: any) => {
              this.grupos = res;    
              this.myForm.reset({garder:'1'} );  
              Swal.fire({
                icon: 'success',
                title: 'Modificado con exito',
                showConfirmButton: false,
                timer: 1500
              })
            })}
            if (res==0) {
              Swal.fire({
                icon: 'error',
                title: 'Error.',
                text: 'El Grupo ya Existe!',             
              })
            }
        })
        
      }
    })

    this.modalReference.close();  //para cerrar
  }
  get f2() { return this.registerForm2.controls; }

  llamaModalModG(modal, grupo: CGrupos) {
    //para cargar datos para modificar
    this.registerForm2.reset({ grupo: grupo.nombre });
    this.grupoMod = grupo;
    //para que la ventana modal se cierre
    this.modalReference = this.modalService.open(modal);
  }
  ///dell
  delete(grupoDell) {
   // console.log("eliminado"+grupoDell.codg);
    this.grupo = {
      codg: grupoDell.codg,
      nombre: grupoDell.nombre,
      estado: 0
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
        //console.log(this.grupo);
        this.gruposService.dell(this.grupo.codg, this.grupo).subscribe(res => {
          this.gruposService.getGruposEstado(0).subscribe((res: any) => {
            this.grupos = res;    
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
  estadoHabGrupo(grupoHab: CGrupos) {
   // console.log('hanilitado');
    this.grupo = {
      codg: grupoHab.codg,
      nombre: grupoHab.nombre,
      estado: 1
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
       // console.log(this.grupo);
        this.gruposService.estadohab(this.grupo.codg, this.grupo).subscribe(res => {
          this.gruposService.getGruposEstado(1).subscribe((res: any) => {
            this.grupos = res;   
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


/// areas get estados

onSubmitEstadoPer(){
 // console.log("Estados en los que se hace click ::"+ this.myForm.controls.gender.value);
  this.gruposService.getGruposEstado(this.myForm.controls.gender.value).subscribe((resp: CGrupos) => {
    this.grupos = resp;
  })
}


}
