import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Area } from 'src/app/modelos/area';
import { Progra } from 'src/app/modelos/Progra';
import { Proyectos } from 'src/app/modelos/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import Swal from 'sweetalert2';
import { AreasService } from '../../servicios/areas.service';
import { PrograService } from '../../servicios/progra.service';
import { DictaService } from '../../servicios/dicta.service';
import { Personas } from '../../modelos/Personas';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  docSelecionada: any = null;

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder, private proyectaService: ProyectosService,
    private areasService: AreasService, private prograService: PrograService, private dictaService: DictaService) { }
  page: number = 1;
  areas: Area;
  progra: Progra;
  docentes: any;
  //file
  doc = null;
  //add
  registerForm: FormGroup;
  submitted = false;
  modalReference: NgbModalRef;  //para mensaje
  proyectos: Proyectos;
  pro: Proyectos;
  //modificar
  registerForm2: FormGroup;
  proyMod: Proyectos = null;
  proModStatic: any;
  /// estod
  myForm: FormGroup;
  /// busqueda
  searchText

  ngOnInit() {
    this.areasService.getAreas().subscribe((resp: Area) => {
      this.areas = resp;
    })
    this.prograService.getProgra().subscribe((res: Progra) => {
      this.progra = res;
    })
    this.dictaService.getDocentes().subscribe((res: Personas) => {
      this.docentes = res;
    });
    this.proyectaService.getProEstado(1).subscribe((respo: Proyectos) => {

      this.proyectos = respo;

    })

    this.myForm = this.formBuilder.group({
      gender: new FormControl(['', Validators.required])
    });
    this.registerForm = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      resumen: ['', [Validators.maxLength(100)]],

      fecha: ['', [Validators.required]],
      codarea: ['', [Validators.required,]],
      codprogra: ['', [Validators.required,]],
      codTutor: [''],
    });
    this.registerForm2 = this.registerForm;
  }


  /// addd
  onSubmit() {
    let docc = null
    this.submitted = true;
    // stop here if form is invalid
    if ((this.registerForm.invalid) == true) {
      return;
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

        let progranew = this.registerForm.controls.codprogra.value;

        this.pro = {
          codpro: null,
          titulo: this.registerForm.controls.titulo.value,
          resumen: this.registerForm.controls.resumen.value,
          file: docc,
          notadefensa: 1,
          estado: 1,
          fecha: this.registerForm.controls.fecha.value,
          estadoproy: 1,
          codTutor: this.registerForm.controls.codTutor.value,
          codarea: this.registerForm.controls.codarea.value,
          codp: progranew.codp,
          codg: progranew.codg,
          gestion: progranew.gestion,
          nombreautor: null,
          nombreGrupo: null,
          nombrearea: null,
          nombredoc: null
        }
        if (this.docSelecionada) {

          this.proyectaService.create(this.pro).subscribe((resp: any) => {

            if (resp == 0) {
              Swal.fire({
                icon: 'error',
                title: 'Error.',
                text: 'El proyecto ya Existe!',

              })
            }
            if (resp != 0) {
              this.proyectaService.subirConDoc(this.docSelecionada, resp).subscribe(resp => {
                this.proyectaService.getProEstado(1).subscribe((respo: Proyectos) => {

                  this.proyectos = respo;

                  Swal.fire({
                    icon: 'success',
                    title: 'Creado con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                })
              })
            }

          })



        }
        if (!this.docSelecionada) {
          this.proyectaService.create(this.pro).subscribe((resp: any) => {

            if (resp == 0) {
              Swal.fire({
                icon: 'error',
                title: 'Error.',
                text: 'El proyecto ya Existe!',

              })
            } else {
              this.proyectaService.getProEstado(1).subscribe((respo: Proyectos) => {
                this.proyectos = respo;

                Swal.fire({
                  icon: 'success',
                  title: 'Creado con exito',
                  showConfirmButton: false,
                  timer: 1500
                })
              })
            }
          })
        }
      }
    })
    this.modalReference.close();  //para cerrar
  }

  get f() { return this.registerForm.controls; }
  llamaModalAddProy(modal) {
    this.submitted = false;
    //inicializar valores del formulario
    this.registerForm.reset([{ area: '' }]);
    //para que la ventana modal se cierre

    this.modalReference = this.modalService.open(modal);
  }

  //modificar
  onSubmit2() {
    this.doc = null;
    this.submitted = true;
    // stop here if form is invalid
    if ((this.registerForm2.invalid) == true) {
      return;
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

        let progranew = this.registerForm2.controls.codprogra.value

        this.pro = {
          codpro: this.proModStatic.codpro,
          titulo: this.registerForm2.controls.titulo.value,
          resumen: this.registerForm2.controls.resumen.value,
          file: this.proModStatic.file,
          notadefensa: 1,
          estado: 1,
          fecha: this.registerForm2.controls.fecha.value,
          estadoproy: 1,
          codTutor: this.registerForm2.controls.codTutor.value,
          codarea: this.registerForm2.controls.codarea.value,
          codp: progranew.codp,
          codg: progranew.codg,
          gestion: progranew.gestion,
          nombreautor: null,
          nombreGrupo: null,
          nombrearea: null,
          nombredoc: null
        }



        this.proyectaService.update(this.pro).subscribe(resp => {
          if (resp == 0) {
            Swal.fire({
              icon: 'error',
              title: 'Error.',
              text: 'El proyecto ya Existe!',

            })
          }
          if (resp != 0) {
            if (this.docSelecionada) {




              this.proyectaService.subirConDoc(this.docSelecionada, this.pro.codpro).subscribe(resp => {
                this.proyectaService.getProEstado(1).subscribe((respo: Proyectos) => {

                  this.proyectos = respo;

                  Swal.fire({
                    icon: 'success',
                    title: 'Modificado con exito',
                    showConfirmButton: false,
                    timer: 1500
                  })
                })
              })
            }
            else {
              this.proyectaService.update(this.pro).subscribe((resp: any) => {
                   
                  this.proyectaService.getProEstado(1).subscribe((respo: Proyectos) => {
                    this.proyectos = respo;
  
                    Swal.fire({
                      icon: 'success',
                      title: 'Creado con exito',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  })
                
              })
            }

          }
          
        })



      }
    })

    this.modalReference.close();  //para cerrar
  }
  get f2() { return this.registerForm2.controls; }


  llamaModalModPro(modal, pro: Proyectos) {
    //para cargar datos para modificar

    const areaMod = {
      coda: pro.codarea,
      nombre: pro.nombrearea
    };
    const docMod = {
      codp: pro.codTutor,
      nombre: pro.nombredoc
    }
    const promod = {
      codp: pro.codp,
      codg: pro.codg,
      gestion: pro.gestion
    }

    this.registerForm2 = this.formBuilder.group({
      titulo: [pro.titulo],
      resumen: [pro.resumen],
      file: [pro.file],
      fecha: [pro.fecha],
      codarea: [areaMod.coda],
      codprogra: [promod],
      codTutor: [docMod.codp],
    });

    this.proModStatic = pro;
    this.proyMod = this.registerForm2.value;

    //para que la ventana modal se cierre
    this.modalReference = this.modalService.open(modal);
  }


  /// habilitar
  estadoHabPro(proHab: Proyectos) {

    this.pro = proHab;
    this.pro.estado = 1;
    Swal.fire({
      title: '¿Esta seguro de Habilitar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        this.proyectaService.estadohab(this.pro.codpro, this.pro).subscribe(res => {
          this.proyectaService.getProEstado(1).subscribe((respo: Proyectos) => {

            this.proyectos = respo;

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

  //elimoinar

  delete(proDell: Proyectos) {

    this.pro = proDell;
    this.pro.estado = 0;
    Swal.fire({
      title: '¿Esta seguro de Eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        this.proyectaService.dell(this.pro.codpro, this.pro).subscribe(res => {
          this.proyectaService.getProEstado(1).subscribe((respo: Proyectos) => {

            this.proyectos = respo;

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

  onSubmitEstadoPer() {

    this.proyectaService.getProEstado(this.myForm.controls.gender.value).subscribe((resp: Proyectos) => {
      this.proyectos = resp;
    })
  }

  //// selc foto
  selecionarFoto(event) {
    this.docSelecionada = null
    this.docSelecionada = event.target.files[0];
    if (this.docSelecionada.type.indexOf('application/pdf') < 0) {

      Swal.fire('Error selecionar una archivo', 'El archivo debe ser del tipo pdf', 'error');
      this.docSelecionada = null;
    }


  }
}
