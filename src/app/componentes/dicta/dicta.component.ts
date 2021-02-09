import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Dicta } from 'src/app/modelos/Dicta';
import { Personas } from 'src/app/modelos/Personas';
import { DictaService } from 'src/app/servicios/dicta.service';
import Swal from 'sweetalert2';
import { CGrupos } from '../../modelos/grupos';

@Component({
  selector: 'app-dicta',
  templateUrl: './dicta.component.html',
  styleUrls: ['./dicta.component.css']
})
export class DictaComponent implements OnInit {
  page: number = 1;
  constructor(private dictaService: DictaService, private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  personas: Personas;
  grupos
  //add
  registerForm: FormGroup;
  submitted = false;
  modalReference: NgbModalRef;  //para mensaje
  dicta: Dicta;

  dic: Dicta;

  //modificar
  registerForm2: FormGroup;
  modDic: Dicta = null;
  dictaMod: Dicta = new Dicta();
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

  ngOnInit() {

    this.dictaService.getDict().subscribe((respo: Dicta) => {
      this.dicta = respo;
      // console.log(respo);
    })
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
    this.dictaService.getDocentes().subscribe((resp: Personas) => {
      this.personas = resp;
      //console.log(this.personas); 
    })
    this.dictaService.getGrupos().subscribe((resp: CGrupos) => {
      this.grupos = resp;
      // console.log(this.grupos);
    })
  }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if ((this.registerForm.invalid) == true) {

      return;
    }
    this.dic = {
      codp: this.registerForm.controls.codp.value,
      nombre: null,
      codg: this.registerForm.controls.codg.value,
      grupo: null,
      gestion: this.registerForm.controls.gestion.value,
      estado: 1
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
        this.dictaService.create(this.dic).subscribe((resp: any) => {
          // console.log(resp);
          if (resp != 0) {
            this.dictaService.getDict().subscribe((respo: Dicta) => {
              this.dicta = respo;
              Swal.fire({
                icon: 'success',
                title: 'Creado con exito',
                showConfirmButton: false,
                timer: 1500
              })
              //console.log("done");
            })
          }
          if (resp==0) {
            Swal.fire({
              icon: 'error',
              title: 'Error.',
              text: 'La Programacion ya Existe!',
             
            })
          }
        })


      }
    })
    this.modalReference.close();  //para cerrar
  }
  get f() { return this.registerForm.controls; }
  llamaModalAddDicta(modal) {
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
    this.dic = {
      codp: Number(this.registerForm2.controls.codp.value),
      nombre: null,
      codg: Number(this.registerForm2.controls.codg.value),
      grupo: null,
      gestion: Number(this.registerForm2.controls.gestion.value),
      estado: 1
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
        // console.log(this.dic);

        this.dictaService.update(this.dic, this.modDic.codp, this.modDic.codg, this.modDic.gestion).subscribe(resp => {

          if (resp != 0) {
            this.dictaService.getDict().subscribe((respo: Dicta) => {
              this.dicta = respo;
  
              
              Swal.fire({
                icon: 'success',
                title: 'Modificado con exito',
                showConfirmButton: false,
                timer: 1500
              })
              //  console.log("done");
            })
          }
          if (resp==0) {
            Swal.fire({
              icon: 'error',
              title: 'Error.',
              text: 'La Programacion ya Existe!',
             
            })
          }
          
        })

      }
    })

    this.modalReference.close();  //para cerrar
  }
  get f2() { return this.registerForm2.controls; }


  llamaModalModE(modal, dicta: Dicta) {
    //para cargar datos para modificar
    // console.log(dicta.gestion);
    this.registerForm2 = this.formBuilder.group({
      codg: [dicta.codg],
      codp: [dicta.codp],
      gestion: [dicta.gestion],
    });
    this.modDic = this.registerForm2.value;
    // console.log(this.registerForm2.value);

    //para que la ventana modal se cierre
    this.modalReference = this.modalService.open(modal);
  }

  ///eliminar
  delete(dicta: Dicta) {
    // console.log("eliminado");

    Swal.fire({
      title: '¿Esta seguro de Eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        this.dictaService.dell(dicta.codp, dicta.codg, dicta.gestion).subscribe(res => {
          this.dictaService.getDict().subscribe((respo: Dicta) => {
            this.dicta = respo;
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              showConfirmButton: false,
              timer: 1500
            })
            //  console.log("done");
          })
        })
      }
    })
  }

  capturarGes(gestion) {
    this.dictaService.getDictaGestion(gestion).subscribe((respo: Dicta) => {
      this.dicta = respo;
      // console.log(this.dicta);
    })

  }


}
