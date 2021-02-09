import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Area } from '../../modelos/area';
import { AreasService } from '../../servicios/areas.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,private areasService:AreasService) { }
    page: number = 1;
 //add
  registerForm: FormGroup;
  submitted = false;
  modalReference: NgbModalRef;  //para mensaje
  areas:Area;
 
  area:Area;
  //modificar
  registerForm2: FormGroup;
  areaMod:Area=null;
 /// estod
 myForm: FormGroup;
 /// busqueda
 searchText;
  ngOnInit() {
    

    this.myForm =this.formBuilder.group({
      gender: new FormControl(['', Validators.required])
    });
    this.areasService.getAreasEst(1).subscribe((resp: Area) => {
      this.areas = resp;
    })


    this.registerForm = this.formBuilder.group({      
      area: ['', [Validators.required, Validators.maxLength(30)]],
    });
    this.registerForm2 = this.registerForm;
  }
  
///adcicionar
  onSubmit() {
    let fotoO=null;
    
    this.submitted = true;
    // stop here if form is invalid
    if ((this.registerForm.invalid) == true) {
      return;
    }
    this.area={
      coda:null,
      nombre:(this.registerForm.controls.area.value).toUpperCase(),
      estado:1
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
      //  console.log(this.area);
        this.areasService.create(this.area).subscribe((resp:any)=>{
              // console.log(resp);
          if(resp!=0){
            this.areasService.getAreasEst(1).subscribe((resp: Area) => {
              this.areas = resp;
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
              text: 'La Area ya Existe!',
             
            })
          }
        })
        
      }
    })
    this.modalReference.close();  //para cerrar
  }
  get f() { return this.registerForm.controls; }


  llamaModalAddArea(modal) {
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
    this.area={
      coda:this.areaMod.coda,
      nombre:(this.registerForm2.controls.area.value).toUpperCase(),
      estado:this.areaMod.estado
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
       // console.log(this.area);
        this.areasService.update(this.area).subscribe(res=>{

          if(res!=0){
            this.areasService.getAreasEst(1).subscribe((resp: Area) => {
              this.areas = resp;
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
              text: 'La Area ya Existe!',
             
            })
          }  
        })
        
      }
    })

    this.modalReference.close();  //para cerrar
  }
  get f2() { return this.registerForm2.controls; }

  llamaModalModA(modal, area:Area) {
    //para cargar datos para modificar
    this.registerForm2.reset({  area: area.nombre });
    this.areaMod=area;
    //para que la ventana modal se cierre
    this.modalReference = this.modalService.open(modal);
  }
 //elimoinar

 delete(areaDell:Area){
//console.log("eliminado");
   this.area={
    coda:areaDell.coda,
    nombre:areaDell.nombre,
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
      this.areasService.dell(this.area.coda, this.area).subscribe(res=>{
        this.areasService.getAreasEst(0).subscribe((resp: Area) => {
          this.areas = resp;
          this.myForm.reset({garder:'1'} );  
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
 estadoHabArea(areaHab:Area){
  // console.log('hanilitado');
   this.area={
    coda:areaHab.coda,
    nombre:areaHab.nombre,
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
      this.areasService.estadohab(this.area.coda,this.area).subscribe(res=>{
        this.areasService.getAreasEst(1).subscribe((res:any)=>{
          this.areas=res; 
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
  this.areasService.getAreasEst(this.myForm.controls.gender.value).subscribe((resp: Area) => {
    this.areas = resp;
  })
}
}
