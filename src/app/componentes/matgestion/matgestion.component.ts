import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, from } from 'rxjs';  // para mensaje
import { debounceTime } from 'rxjs/operators'; // para mensaje
import { materias } from '../../modelos/materias';
import { MateriasService } from '../../servicios/materias.service';


@Component({
  selector: 'app-matgestion',
  templateUrl: './matgestion.component.html',
  styleUrls: ['./matgestion.component.css']
})
export class MatgestionComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private matService: MateriasService) { }

  registerForm: FormGroup;
  registerForm2: FormGroup;
  successMessage: string;  //para mensaje
  private _success = new Subject<string>(); //para mensaje
  staticAlertClosed = false;  //para mensaje

  modalReference: NgbModalRef;  //para mensaje
  submitted = false;
  index = 0; //el indice para borrar
  xestado = "";
  matEstado:any;
  matjs: any;
  materia: materias;

  materiasL: materias[];
  
  infoMat: string;
  ngOnInit() {

    this.matService.getMatlista().subscribe(res => {
    //  console.log(res),
        this.matjs = res;
    })
    this.registerForm = this.formBuilder.group({
      sigla: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(7)]],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(7)]],
      nivel: ['', [Validators.required,]]
    })
    this.registerForm2 = this.registerForm;
    setTimeout(() => this.staticAlertClosed = true, 20000);  //para mensaje
    this._success.subscribe((message) => this.successMessage = message);  //para mensaje
    this._success.pipe(   //para mensaje
      debounceTime(2000)   //para mensaje
    ).subscribe(() => this.successMessage = null);  //para mensaje
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if ((this.registerForm.invalid) == true) {
      return;
    }
    this.materia = {
      sigla: (this.registerForm.controls.sigla.value).toUpperCase(),
      nombre: (this.registerForm.controls.nombre.value).toUpperCase(),
      nivel: (this.registerForm.controls.nivel.value).toUpperCase(),
      estado: 1
    }
   // console.log(this.materia);
    //llamada a los servicioss
    //this.matService.addMateria(this.materia);
    this.matService.create(this.materia).subscribe(
      res => {
        this.matService.getMatlista().subscribe(res => {
         // console.log(res),
            this.matjs = res;
        })
      }
    )
    //this.materiasL = this.matService.getMaterias();

    this.modalReference.close();  //para cerrar
    this._success.next(`Los Datos se GUARDARON Satisfactoriamente..!`);  //para mensaje

  }
  //MOFICAR DATOS
  onSubmit2() {
    this.submitted = true;
    // stop here if form is invalid
    if ((this.registerForm2.invalid) == true) {
      return;
    }
    //Inicializa Interface 
    this.materia = {
      sigla: (this.registerForm2.controls.sigla.value).toUpperCase(),
      nombre: (this.registerForm2.controls.nombre.value).toUpperCase(),
      nivel: this.registerForm2.controls.nivel.value,
      estado: 1

    }
    //llamada a los servicioss
    this.matService.update(this.materia).subscribe(res => {

      this.matService.getMatlista().subscribe(res => {
      //  console.log(res),
          this.matjs = res;
      })
    }
    )

    this.modalReference.close();  //para cerrar

    this._success.next(`Los Datos se MODIFICARON Satisfactoriamente..!`);  //para mensaje
  }

  get f() { return this.registerForm.controls; }
  get f2() { return this.registerForm2.controls; }

  llamaModalAdd(modal) {
    this.submitted = false;
    //inicializar valores del formulario
    this.registerForm.reset([{ ru: '' }, { nombre: '' }, { ap: '' }, { am: '' }]);
    //para que la ventana modal se cierre
    this.modalReference = this.modalService.open(modal);
  }

  //modificar
  llamaModalMod(modal, sigla, nombre, nivel, con) {
    //para cargar datos para modificar
    this.registerForm2.reset({ sigla: sigla, nombre: nombre, nivel: nivel });
    //para que la ventana modal se cierre
    this.modalReference = this.modalService.open(modal);
    //guardamos el index
    this.index = con;
  }

  //ELIMINAR DATOS show modal 
  llamaModalDel(modal, sigla, nombre, nivel, con) {
    //para que la ventana modal se cierre
    this.modalReference = this.modalService.open(modal);
    this.infoMat = "nombre: " + nombre + " nivel: " + nivel + " Sigla " + sigla;
    this.matEstado = {
      sigla: (this.registerForm2.controls.sigla.value).toUpperCase(),
      nombre: (this.registerForm2.controls.nombre.value).toUpperCase(),
      nivel: this.registerForm2.controls.nivel.value,
      estado: 1

    }
    //guardamos la sigla
    this.xestado = sigla;
  }
  //AHORA SI ELIMINA
  eliminar() {
    //Llama al servicio para eliminar
    
    this.matService.dellMat(this.xestado,this.matEstado).subscribe(res=>{
     
      this.matService.getMatlista().subscribe(res => {
       // console.log(res),
          this.matjs = res;
      })
    }); //ELIMINA EL DATO
    
    this.matService.addMateria(this.materia);//INSERTA DATO
    this.modalReference.close();  //para cerrar
    this._success.next(`Los Datos se ELIMINARON Satisfactoriamente..!`);  //para mensaje
  }


  // estadoH(mat, con) {
  //   console.log(con)
  //   //Inicializa Interface 
  //   this.materia = {
  //     sigla: mat.sigla,
  //     nombre: (mat.nombre).toUpperCase(),
  //     nivel: (mat.nivel).toUpperCase(),
  //     estado: 1
  //   }
  //   //llamada a los servicioss
  //   this.matService.addMateria(this.materia);//INSERTA DATO
  //   this.matService.dellMat(con);  //ELIMINA DATO

  // }
}
