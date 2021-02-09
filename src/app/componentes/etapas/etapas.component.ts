import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Etapas } from 'src/app/modelos/Etapas';
import { EtapasService } from 'src/app/servicios/etapas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrls: ['./etapas.component.css']
})
export class EtapasComponent implements OnInit {
  page: number = 1;
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,private etapasService:EtapasService) { }
 //add
 registerForm: FormGroup;
 submitted = false;
 modalReference: NgbModalRef;  //para mensaje
 etapas:Etapas;

 etapa:Etapas;
   //modificar
   registerForm2: FormGroup;
   etapaMod:Etapas=null;
  /// estod
  myForm: FormGroup;
  /// busqueda
  searchText
  ngOnInit() {
      this.myForm =this.formBuilder.group({
      gender: new FormControl(['', Validators.required])
    });
    this.registerForm = this.formBuilder.group({      
      etapa: ['', [Validators.required, Validators.maxLength(30)]],
    });
    this.registerForm2 = this.registerForm;

    this.etapasService.getEtapasEst(1).subscribe((resp: Etapas) => {
      this.etapas = resp;
    })
  }

  ///adcicionar
  onSubmit() {
    
    
    this.submitted = true;
    // stop here if form is invalid
    if ((this.registerForm.invalid) == true) {
      return;
    }
    this.etapa={
      code:null,
      nombre:(this.registerForm.controls.etapa.value).toUpperCase(),
      estado:1
    }
    Swal.fire({
      title: '¿Esta seugro de crear la Etapa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, crear Etapa!'
    }).then((result) => {
      if (result.isConfirmed) {
      //  console.log(this.etapa);
        this.etapasService.create(this.etapa).subscribe((resp:any)=>{
          if(resp!=0){
          this.etapasService.getEtapasEst(1).subscribe((resp: Etapas) => {
            
            this.etapas = resp;
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
            text: 'La Etapa ya Existe!',
           
          })
        }
        })
        
      }
    })
    this.modalReference.close();  //para cerrar
  }
  get f() { return this.registerForm.controls; }
  llamaModalAddEtapas(modal) {
    this.submitted = false;
    //inicializar valores del formulario
    this.registerForm.reset([  { area: '' }]);
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
    this.etapa={
      code:this.etapaMod.code,
      nombre:(this.registerForm2.controls.etapa.value).toUpperCase(),
      estado:this.etapaMod.estado
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
        //console.log(this.etapa);
        this.etapasService.update(this.etapa).subscribe(res=>{


          if(res!=0){
            this.etapasService.getEtapasEst(1).subscribe((resp: Etapas) => {
              
              this.etapas = resp;
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
              text: 'La Etapa ya Existe!',
             
            })
          }
        })
       
      }
    })

    this.modalReference.close();  //para cerrar
  }
  get f2() { return this.registerForm2.controls; }

  llamaModalModE(modal, etapa:Etapas) {
    //para cargar datos para modificar
    this.registerForm2.reset({  etapa: etapa.nombre });
    this.etapaMod=etapa;
    //para que la ventana modal se cierre
    this.modalReference = this.modalService.open(modal);
  }


//elimoinar

delete(etapaDell:Etapas){
  //console.log("eliminado");
  this.etapa={
   code:etapaDell.code,
   nombre:etapaDell.nombre,
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
    // console.log(this.etapa);
     this.etapasService.dell(this.etapa.code, this.etapa).subscribe(res=>{
       this.etapasService.getEtapasEst(0).subscribe((resp: Etapas) => {
         this.etapas = resp;
         this.myForm.reset({garder:'1'} );    
       })  
     })
     Swal.fire({
       icon: 'success',
       title: 'Eliminado',
       showConfirmButton: false,
       timer: 1500
     })
   }
 })
}
/// habilitar
estadoHabEtapa(EtapaHab:Etapas){
  //console.log('hanilitado');
  this.etapa={
   code:EtapaHab.code,
   nombre:EtapaHab.nombre,
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
    // console.log(this.etapa);
     this.etapasService.estadohab(this.etapa.code,this.etapa).subscribe(res=>{
       this.etapasService.getEtapasEst(1).subscribe((res:any)=>{
         this.etapas=res; 
         this.myForm.reset({garder:'1'} );    
       })   
     })
     Swal.fire({
       icon: 'success',
       title: 'Habilitado',
       showConfirmButton: false,
       timer: 1500
     })
   }
 })
}

/// areas get estados

onSubmitEstadoEt(){
 // console.log("Estados en los que se hace click ::"+ this.myForm.controls.gender.value);
  this.etapasService.getEtapasEst(this.myForm.controls.gender.value).subscribe((resp: Etapas) => {
    this.etapas = resp;
  })
}
}
