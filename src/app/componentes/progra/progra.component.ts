import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CGrupos } from 'src/app/modelos/grupos';
import { Personas } from 'src/app/modelos/Personas';
import { Progra } from 'src/app/modelos/Progra';
import { PrograService } from 'src/app/servicios/progra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-progra',
  templateUrl: './progra.component.html',
  styleUrls: ['./progra.component.css']
})
export class PrograComponent implements OnInit {
  page: number = 1;
  constructor( private prograService:PrograService, private modalService: NgbModal,
    private formBuilder: FormBuilder) { }
    personas: Personas;
    grupos;
  //add
  registerForm: FormGroup;
  submitted = false;
  modalReference: NgbModalRef;  //para mensaje
  progra: Progra;
  pro: Progra;

  //modificar
  registerForm2: FormGroup;
  modDic: Progra = null;
  PrograMod:Progra= new Progra();
  modgrupo;
  /// busqueda
  searchText;
  //
  gestionp = [
    {
      "ges": "2020",
      "value": "2020"
    },
    {
      "ges": "2021",
      "value": "2021"
    }, {
      "ges": "2022",
      "value": "2022"
    }, {
      "ges": "2023",
      "value": "2023"
    },
    {
      "ges": "2024",
      "value": "2024"
    },
    {
      "ges": "2025",
      "value": "2025"
    },];
/// busqueda gestion
    busGestion;
    busGrupos:CGrupos;

  ngOnInit() {
   
    this.registerForm = this.formBuilder.group({
      codg: ['', [Validators.required]],
      codp: ['', [Validators.required,]], 
      gestion: ['', [Validators.required,]],
    });
    this.registerForm2 = this.formBuilder.group({
      codg: ['', [Validators.required]],
      codp: ['', [Validators.required,]], 
      gestion: ['', [Validators.required,]],
    });

    this.prograService.getProgra().subscribe((respo: Progra) => {
      this.progra = respo;
     
      
    
    })
    this.prograService.getAlumnos().subscribe((resp:Personas)=>{
      this.personas=resp;
     
    })
    this.prograService.getGrupos().subscribe((resp:CGrupos)=>{
        this.grupos=resp;
      
    })
    this.prograService.getGrupos().subscribe((resp:CGrupos)=>{
      this.busGrupos=resp;
     
  })
  }

  /// adicionar
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if ((this.registerForm.invalid) == true) {

      return;
    }
    this.pro={
      codp:this.registerForm.controls.codp.value,
      nombre: null,
      codg:this.registerForm.controls.codg.value,
      grupo:null,
      gestion:this.registerForm.controls.gestion.value,
      estado:1,
      notafinal:1
    }
    Swal.fire({
      title: '¿Esta seugro de crear?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, crear !'
    }).then((result) => {
      if (result.isConfirmed) {
      
        
        this.prograService.create(this.pro).subscribe((resp:any)=>{
   
          
          if (resp==0) {
            Swal.fire({
              icon: 'error',
              title: 'Error.',
              text: 'La Programacion ya Existe!',
             
            })
          }else{
            if(resp!=0){
              this.prograService.getProgra().subscribe((respo: Progra) => {
                this.progra = respo;
                Swal.fire({
                  icon: 'success',
                  title: 'Creado con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
              })
            }
          }
         
       
        })

        
      }
    })
    this.modalReference.close();  //para cerrar
  }
  get f() { return this.registerForm.controls; }
  llamaModalAddProgra(modal) {
    this.submitted = false;
    //inicializar valores del formulario
    this.registerForm.reset([{ codp: '' }, { codg: '' }, { gestion: '' }]);
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
    this.pro={
      codp:this.registerForm2.controls.codp.value,
      nombre: null,
      codg:this.registerForm2.controls.codg.value,
      grupo:null,
      gestion:this.registerForm2.controls.gestion.value,
      estado:1,
      notafinal:1
    }
    Swal.fire({
      title: '¿Esta seugro de modificar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        
        this.prograService.update(this.pro,this.modDic.codp,this.modDic.codg, this.modDic.gestion).subscribe(resp=>{

          if (resp==0) {
            Swal.fire({
              icon: 'error',
              title: 'Error.',
              text: 'La Programacion ya Existe!',
             
            })
          }else{
            if (resp!=0) {
              this.prograService.getProgra().subscribe((respo: Progra) => {
                this.progra = respo;
                Swal.fire({
                  icon: 'success',
                  title: 'Modificado con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
              });
            }
          }
        
        })
        
      }
    })

    this.modalReference.close();  //para cerrar
  }
  get f2() { return this.registerForm2.controls; }


  llamaModalModE(modal, progra:Progra) {
    //para cargar datos para modificar
  
    this.registerForm2 = this.formBuilder.group({
      codg: [progra.codg ],
      codp: [progra.codp], 
      gestion: [progra.gestion],
    });
    this.modDic=this.registerForm2.value;
   
    
    //para que la ventana modal se cierre
    this.modalReference = this.modalService.open(modal);
  }

  ///eliminar
delete(progra:Progra){
 
  
  Swal.fire({
   title: '¿Esta seguro de Eliminar?',
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Si'
 }).then((result) => {
   if (result.isConfirmed) {
  
     this.prograService.dell(progra.codp, progra.codg,progra.gestion).subscribe(res=>{
      this.prograService.getProgra().subscribe((respo: Progra) => {
        this.progra = respo;
    
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
  
capturarGes(gestion){
console.log(gestion);

  if (gestion!=0) {
    this.prograService.getPrograGestion(gestion).subscribe((respo: Progra) => {
      this.progra = respo;
    
    })
  }else{
    
    this.prograService.getProgra().subscribe((respo: Progra) => {
      this.progra = respo;
     
    })
  }
  
  
}
capurarGrup(grupo1){
  if (grupo1!=0) {
   
    
    this.prograService.getPrograGestion(grupo1).subscribe((respo: Progra) => {
      this.progra = respo;
   
    }) 
  }else{
   
    
    this.prograService.getProgra().subscribe((respo: Progra) => {
      this.progra = respo;
     
    })
  }
}


}
