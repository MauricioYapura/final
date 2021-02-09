import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Personas } from '../../modelos/Personas';

import { Subject, from } from 'rxjs';  // para mensaje
import { debounceTime } from 'rxjs/operators'; // para mensaje
import { PersonasService } from 'src/app/servicios/personas.service';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import { title } from 'process';
import { cDatos } from '../../modelos/cDatos';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  config: any;
  page: number = 1;
  totalRecords: string;
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private person: PersonasService,
    private router: Router,
    private route: ActivatedRoute,) {



  }


  genero = "";
  ecivil = "";
  xtipo = 'CEDULA:';
  xtiposw = 2;
  registerForm: FormGroup;
  registerForm2: FormGroup;
  submitted = false;
  index = 0; //el indice para borrar
  personas: Personas;
  persona: Personas;
  nombreFotoMod = null;
  //print
  mostrarDato: any;
  mostrarPer1: Personas;
  mostrarrol: any;
  nombreCompleto;
  tipoPersona;
  //datos
  cdatos: cDatos;
  showAsignarPerson;
  datosForm: FormGroup;
  datosForm2: FormGroup;
  submittedLogin = false;
  datoCodp;
  /// estod
  myForm: FormGroup;
  /// busqueda
  searchText;



  private _success = new Subject<string>(); //para mensaje
  staticAlertClosed = false;  //para mensaje
  modalReference: NgbModalRef;  //para mensaje

  private fotoSelecionada;
  ngOnInit() {

    this.person.getPersonasE(1).subscribe((resp: Personas) => {
      this.personas = resp;
      //  console.log(this.personas);

    })

    this.myForm = this.formBuilder.group({
      gender: new FormControl(['', Validators.required])
    });

    this.registerForm = this.formBuilder.group({
      tipo: ['', []],
      rol: [''],
      codp: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      ap: [''],
      am: [''],
      celular: ['',],
      genero: ['', Validators.required],
      fnac: ['', [Validators.required]],
      direc: [''],
      ecivil: ['', [Validators.required]],

    });
    this.datosForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required]],
      repetirPassword: ['', Validators.required],

    }, {
      validator: this.MustMatch('password', 'repetirPassword')
    });

    this.datosForm2 = this.formBuilder.group({
      login: [''],
      password: ['', [Validators.required]],
      repetirPassword: ['', Validators.required],

    }, {
      validator: this.MustMatch('password', 'repetirPassword')
    });
    this.registerForm2 = this.registerForm;
    this.registerForm2 = this.formBuilder.group({
      tipo: ['', []],
      rol: [''],
      codp: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      ap: [''],
      am: ['',],
      celular: ['',],
      genero: ['', [Validators.required]],
      fnac: ['', [Validators.required]],
      direc: ['',],
      ecivil: ['', [Validators.required]],
      foto: ['']

    })

  }
  //// csmbisr tipo

  onTipoChange(xtipo) {
    if (xtipo == '1') { this.xtipo = 'REG.UNIV.:'; }
    if (xtipo == '2') { this.xtipo = 'CEDULA:'; }
    this.xtiposw = xtipo;
    // console.log("xtipo es::"+this.xtiposw);
  }
  onSubmit() {
    let fotoO = null;

    this.submitted = true;
    // stop here if form is invalid
    if ((this.registerForm.invalid) == true) {
      return;
    }

    this.persona = {
      codp: this.registerForm.controls.codp.value,
      nombre: (this.registerForm.controls.nombre.value).toUpperCase(),
      ap: this.registerForm.controls.ap.value,
      am: this.registerForm.controls.am.value,
      estado: 1,
      fnac: this.registerForm.controls.fnac.value,
      genero: this.registerForm.controls.genero.value,
      direc: this.registerForm.controls.direc.value,
      celular: this.registerForm.controls.celular.value,
      foto: fotoO,
      ecivil: this.registerForm.controls.ecivil.value,
      login: null,
      token: null
    }
    if (this.registerForm.controls.ap.value != null) {
      //  console.log("ap");

      this.persona.ap = (this.persona.ap).toUpperCase()
    }
    if (this.registerForm.controls.am.value != null) {
      //  console.log("am");

      this.persona.am = (this.persona.am).toUpperCase()
    }
    /// con foto
    if (this.fotoSelecionada) {
      this.person.create(this.persona).subscribe((resp1: any) => {
        if (resp1 == 0) {
          swal.fire({
            icon: 'error',
            title: 'Error.',
            text: 'La Area ya Existe!',

          })
        }
        else {
          if (resp1 != 0) {
            this.person.getPersona(resp1).subscribe((response: Personas) => {
              if (this.xtiposw == 1) {
                this.person.setAlu(response.codp, this.persona.codp, this.persona).subscribe(respAlu => {
                  this.person.subirFoto(this.fotoSelecionada, response.codp).subscribe(responseFoto => {
                    this.person.getPersonasE(1).subscribe((resp: Personas) => {
                      this.personas = resp;
                      // this.person.subirFoto(this.fotoSelecionada, this.persona.codp).subscribe(responseFoto => {})
                      swal.fire({
                        icon: 'success',
                        title: 'Persona ' + this.persona.nombre + ' Creada Con Exito ',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    });
                  })
                })
              }
              else {
                this.person.setDoc(response.codp, this.persona.codp, this.persona).subscribe(respAlu => {
                  this.person.subirFoto(this.fotoSelecionada, response.codp).subscribe(responseFoto => {
                    this.person.getPersonasE(1).subscribe((resp: Personas) => {
                      this.personas = resp;
                      // this.person.subirFoto(this.fotoSelecionada, this.persona.codp).subscribe(responseFoto => {})
                      swal.fire({
                        icon: 'success',
                        title: 'Persona ' + this.persona.nombre + ' Creada Con Exito ',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    });
                  })
                })
              }


            })
          }
        }
      })


    }
    /// sin foto
    if (this.fotoSelecionada == null) {
      this.person.create(this.persona).subscribe((resp1: any) => {
        if (resp1 == 0) {
          swal.fire({
            icon: 'error',
            title: 'Error.',
            text: 'La Persona ya Existe!',

          })
        }
        else {
          if (resp1 != 0) {
            this.person.getPersona(resp1).subscribe((response: Personas) => {
              if (this.xtiposw == 1) {
                this.person.setAlu(response.codp, this.persona.codp, this.persona).subscribe(respAlu => {

                  this.person.getPersonasE(1).subscribe((resp: Personas) => {
                    this.personas = resp;
                    // this.person.subirFoto(this.fotoSelecionada, this.persona.codp).subscribe(responseFoto => {})
                    swal.fire({
                      icon: 'success',
                      title: 'Persona ' + this.persona.nombre + ' Creada Con Exito ',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  });

                })
              }
              else {
                this.person.setDoc(response.codp, this.persona.codp, this.persona).subscribe(respAlu => {

                  this.person.getPersonasE(1).subscribe((resp: Personas) => {
                    this.personas = resp;
                    // this.person.subirFoto(this.fotoSelecionada, this.persona.codp).subscribe(responseFoto => {})
                    swal.fire({
                      icon: 'success',
                      title: 'Persona ' + this.persona.nombre + ' Creada Con Exito ',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  });

                })
              }


            })
          }
        }


      })
    }


    this.modalReference.close();  //para cerrar

  }

  // mod personas

  onSubmit2() {
    this.submitted = true;
    // stop here if form is invalid
    if ((this.registerForm2.invalid) == true) {
      return;
    }

    //Inicializa Interface 
    this.persona = {
      codp: this.registerForm2.controls.codp.value,
      nombre: (this.registerForm2.controls.nombre.value).toUpperCase(),
      ap: this.registerForm2.controls.ap.value,
      am: this.registerForm2.controls.am.value,
      estado: 1,
      fnac: this.registerForm2.controls.fnac.value,
      genero: this.registerForm2.controls.genero.value,
      direc: this.registerForm2.controls.direc.value,
      celular: this.registerForm2.controls.celular.value,
      foto: this.nombreFotoMod,
      ecivil: this.registerForm2.controls.ecivil.value,
      login: null,
      token: null
    }
    if (this.registerForm2.controls.ap.value != null) {
      this.persona.ap = (this.persona.ap).toUpperCase()
    }
    if (this.registerForm2.controls.am.value != null) {
      this.persona.am = (this.persona.am).toUpperCase()
    }

    //  console.log(this.persona)
    // llamada a los servicioss


    this.person.update(this.persona).subscribe(res => {

      if (this.fotoSelecionada) {


        this.person.subirFoto(this.fotoSelecionada, this.persona.codp).subscribe(persona => {
          this.person.getPersonasE(1).subscribe((resp: Personas) => {
            this.personas = resp;
            swal.fire({
              icon: 'success',
              title: 'Persona ' + this.persona.nombre + ' Modificado Con Exito',
              showConfirmButton: false,
              timer: 1500
            })
          })
        })
      } else {
        this.person.getPersonasE(1).subscribe((resp: Personas) => {
          this.personas = resp;
          swal.fire({
            icon: 'success',
            title: 'Persona ' + this.persona.nombre + ' Modificado Con Exito',
            showConfirmButton: false,
            timer: 1500
          })
        })

      }

    }
    )

    this.modalReference.close();  //para cerrar

  }
  get f3() { return this.datosForm.controls; }
  get f4() { return this.datosForm2.controls; }
  get f() { return this.registerForm.controls; }
  get f2() { return this.registerForm2.controls; }

  llamaModalAdd(modal) {
    this.submitted = false;
    //inicializar valores del formulario
    this.genero = "";
    this.ecivil = "";
    this.registerForm.reset([{ rol: '' }, { codp: '' }, { nombre: '' }, { ap: '' }, { am: '' }, { fnac: '' }, { genero: '' }, { direc: '' }, { celular: '' }, { foto: '' }, { ecivil: '' }]);
    //para que la ventana modal se cierre
    this.fotoSelecionada = null;
    this.modalReference = this.modalService.open(modal);
  }

  //modificar
  llamaModalPer(modal, codp, nombre, ap, am, estado, fnac, genero, direc, celular, foto, ecivil) {
    //para cargar datos para modificar
    this.registerForm2.reset({ codp: codp, nombre: nombre, ap: ap, am: am, estado: estado, fnac: fnac, genero: genero, direc: direc, celular: celular, ecivil: ecivil });
    this.nombreFotoMod = foto;

    this.genero = genero;
    this.ecivil = ecivil;
    this.fotoSelecionada = null;

    //para que la ventana modal se cierre
    this.modalReference = this.modalService.open(modal);
  }
  delete(per: Personas) {

    //  console.log(per);
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta Seguro?',
      text: "¿Seguro que desea eliminar a la persona " + per.nombre + "?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SI !',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.person.dellPer(per.codp, per).subscribe(resp => {
          this.person.getPersonasE(1).subscribe((resp: Personas) => {
            this.personas = resp;
          })

          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          ':)',
          'error'
        )
      }
    })

  }
  //// selc foto
  selecionarFoto(event) {
    this.fotoSelecionada = event.target.files[0]
    if (this.fotoSelecionada.type.indexOf('image') < 0) {
      swal.fire('Error selecionar una imagen', 'El archivo debe serdel tipo imagen', 'error');
      this.fotoSelecionada = null;
    }
  }

  ///habilitar
  estadoH(codp, peronaEstado: Personas) {
    this.person.estadohab(codp, peronaEstado).subscribe(resp => {
      this.person.getPersonasE(1).subscribe((resp: Personas) => {
        this.personas = resp;
        // console.log(this.personas);

      })
    })
  }
  ///cdatos agregar
  agregarusuario(modal, persona: Personas) {
    this.submittedLogin = false;
    this.showAsignarPerson = persona.nombre + " " + persona.ap + " " + persona.am;
    this.datosForm.reset([{ login: '' }, { password: '' }, { repetirPassword: '' }]);
    this.modalReference = this.modalService.open(modal);
    this.datoCodp = persona.codp;
  }
  crearUsuario() {
    this.submittedLogin = true;
    if ((this.datosForm.invalid) == true) {
      return;
    }
    this.cdatos = {
      login: this.datosForm.controls.login.value,
      codp: this.datoCodp,
      password: this.datosForm.controls.password.value
    }
    // console.log(this.cdatos);
    swal.fire({
      title: '¿Esta seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.person.addLogin(this.cdatos).subscribe(response => {
          if (response == false) {
            swal.fire({
              icon: 'error',
              title: 'Error.',
              text: 'El login ya Existe!',

            })
          } else {
            //console.log(response);
            this.person.getPersonasE(1).subscribe((resp: Personas) => {
              this.personas = resp;
              // console.log(this.personas);
              
              swal.fire(
                'Asignado con exito!',
              )

            })
          }



        })
       

      }
    })

    this.modalReference.close();  //para cerrar
  }
  ////cdatos mod llamad
  modificarUsuario(modal, persona: Personas) {
    this.submittedLogin = false;
   
    this.showAsignarPerson = persona.nombre + " " + persona.ap + " " + persona.am;
    this.datosForm2.reset({ login: persona.login, password: '', repetirPassword: '' });
    this.modalReference = this.modalService.open(modal);
    this.datoCodp = persona.codp;
  }
  /// modificar datos
  moddUsuario() {
    this.submittedLogin = true;
    if ((this.datosForm2.invalid) == true) {
      return;
    }
    this.cdatos = {
      login: this.datosForm2.controls.login.value,
      codp: this.datoCodp,
      password: this.datosForm2.controls.password.value
    }
  
    swal.fire({
      title: '¿Esta seguro de modificar la contraseña?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.person.moddlogin(this.cdatos).subscribe(response => {

          this.person.getPersonasE(1).subscribe((resp: Personas) => {
            this.personas = resp;
          })

        })
        swal.fire(
          'Modificado con exito con exito!',
        )
      }
    })

    this.modalReference.close();  //para cerrar
  }


  /// mostrar datos
  mostrarDatos(modal, codp: number) {
    this.mostrarDato = null;
    this.mostrarrol = null;



    this.person.mostrarDat(codp).subscribe(response => {


      this.mostrarDato = response;


      this.mostrarPer1 = this.mostrarDato[0];
      this.mostrarrol = this.mostrarDato[1];
      if (this.mostrarrol.ru) {

        this.tipoPersona = "Alumno con ru " + this.mostrarrol.ru
      } else { this.tipoPersona = "Docente con cedlula " + this.mostrarrol.cedula }

      this.nombreCompleto = this.mostrarPer1.nombre + " " + this.mostrarPer1.ap + "  " + this.mostrarPer1.am;


      this.modalReference = this.modalService.open(modal);
    })
  }
  //validacion de password
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }


  getCurrentSesion(): Personas {
    var xper = localStorage.getItem('currentUser');
    return (xper) ? <Personas>JSON.parse(xper) : null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentSesion() != null) ? true : false;
  };
  /// personas get estados

  onSubmitEstadoPer() {
   
    this.person.getPersonasE(this.myForm.controls.gender.value).subscribe((resp: Personas) => {
      this.personas = resp;
    })
  }

}
