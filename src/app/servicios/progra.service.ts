import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Progra } from '../modelos/Progra';

@Injectable({
  providedIn: 'root'
})
export class PrograService {

  constructor(private httpClient:HttpClient) { }
  private mostrarDicta="/api/listaProgra";
  private api= "/api/";
  getProgra(){
    return this.httpClient.get(this.mostrarDicta);
 }
 getAlumnos(){
  return this.httpClient.get(this.api+'listaAlumnosAll');
 }
 getGrupos(){
  return this.httpClient.get(this.api+'listaGruposProgra');
 }
 
 getPrograGestion(gestion){

  return this.httpClient.get(this.api+'busquedaGestion/'+gestion);
}
getPrograGrupo(grupo){

  return this.httpClient.get(this.api+'busquedaGrup/'+grupo);
}
 create(progra:Progra):Observable<Progra>{
    return this.httpClient.post<Progra>(this.api+'guardarProgra', progra)
  }
  update(progra:Progra,codp, codg, gestion):Observable<any>{
    return this.httpClient.put<any>(this.api+'modProgra'+'/'+codp+'/'+codg+'/'+gestion,progra)
  }
  dell(codp: number, codg:number, gestion:number):Observable<any>{
    return this.httpClient.delete<any>(this.api+'deleteDicta/'+codp+'/'+codg+'/'+gestion) //ELIMINA EL DATO
  }
}
