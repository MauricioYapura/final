import { Injectable } from '@angular/core';
import { materias } from '../modelos/materias';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private materias: materias[];
  private url="/api/listaMaterias/"; // direccion de la api
  private crear="/api/guardarMateria" 
  constructor(private httpClient:HttpClient) {
    this.materias = [];
   }

  addMateria(mat : materias) {
    this.materias.push(mat);
  }

  getMaterias(){
    return this.materias;
  }
  
  getMatlista(){
    return this.httpClient.get(this.url);
  }

  create(materia:materias):Observable<materias>{
    return this.httpClient.post<materias>(this.crear, materia)
  }
  update(materia:materias):Observable<any>{
    return this.httpClient.put<any>("/api/modMateria",materia)
  }

  dellMat(posIndex: string, mat:materias):Observable<any>{
   
     return this.httpClient.put<any>("/api/modEstado/"+posIndex, mat) //ELIMINA EL DATO
  }

}
