import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { observable, Observable, throwError } from 'rxjs';
import { Personas } from '../modelos/Personas';
import { catchError, map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { cDatos } from '../modelos/cDatos';
@Injectable({
  providedIn: 'root'
})

export class PersonasService {
    private Personas: Personas[];
    private mostrarPer="/api/listaPersonas/"; // direccion de la api
    private crear="/api/guardarPersona" 
    private api= "/api/"
    private _headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private httpClient:HttpClient) {
       this.Personas=[];
     }

     getPersonas(){
      const headers = this._headers.append('Authorization', localStorage.getItem('token'));
        return this.httpClient.get(this.mostrarPer,{headers:headers});
     }

     getPersonasE(estado){
      const headers = this._headers.append('Authorization', localStorage.getItem('token'));
        return this.httpClient.get(this.api+'listaPersonal/'+estado,{headers:headers});
     }
     getPersona(codp){
      const headers = this._headers.append('Authorization', localStorage.getItem('token'));
      const params = new HttpParams()
      .set('codp', codp);
      return this.httpClient.get(this.api+'viewPersona/',{params});
     }
     create(personas:Personas):Observable<Personas>{
        return this.httpClient.post<Personas>(this.crear, personas)
      }
      update(personas:Personas):Observable<any>{
        return this.httpClient.put<any>("/api/modPersona/",personas)
      }
      dellPer(codp: number, per:Personas):Observable<any>{
   
        return this.httpClient.put<any>("/api/modEstado/"+codp, per) //ELIMINA EL DATO
     }

     subirFoto(archivo:File, codp):Observable<Personas>{
       if(!archivo){
       
         archivo=null;
         console.log(archivo  )
       }
       let formData= new FormData();
       formData.append("archivo",archivo);
       formData.append("codp", codp);
       return this.httpClient.post("api/persona/upload/",formData).pipe(
        map((response:any)=>response.persona as Personas ),
        catchError(e=>{
          console.log(e);
          swal.fire("no se subio",'error');
          return throwError(e);
        })
       );
     }

     estadohab(codp:number,persona:Personas):Observable<any>{
       return this.httpClient.put<any>('/api/modEstadoH/'+codp,persona)
     }

     //// alumnos
     setAlu(codp,ru, per:Personas):Observable<any>{
      return this.httpClient.post<any>(this.api+"addAlumnos/"+codp+'/'+ru,per);
     }
     //// docntes
     setDoc(codp,cedula, per:Personas):Observable<any>{
      return this.httpClient.post<any>(this.api+"addDocentes/"+codp+'/'+cedula,per);
     }
    // modtar 
    mostrarDat(codp):Observable<any>{

      const params = new HttpParams()
      .set('codp', codp);
      return this.httpClient.get<any>(this.api+"mostrarDatosPer",{params})
    }

    addLogin(addCDatos:cDatos):Observable<any>{
      return this.httpClient.post<any>(this.api+"addCdatos",addCDatos);
    }
    moddlogin(moddCDatos:cDatos):Observable<any>{
      return this.httpClient.put<any>(this.api+"modCdatos",moddCDatos);

    }
}