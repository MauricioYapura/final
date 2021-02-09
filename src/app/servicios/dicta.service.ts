import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dicta } from '../modelos/Dicta';

@Injectable({
  providedIn: 'root'
})
export class DictaService {

  constructor(private httpClient:HttpClient) { }
  private mostrarDicta="/api/listaDicta";
  private api= "/api/";
  getDict(){
    return this.httpClient.get(this.mostrarDicta);
 }
 getDocentes(){
  return this.httpClient.get(this.api+'listaDocentesAll');
 }
 getGrupos(){
  return this.httpClient.get(this.api+'listaGruposDicta');
 }
 getDictaGestion(gestion){
  return this.httpClient.get(this.api+'busquedaGesDicta/'+gestion);
}
  create(dicta:Dicta):Observable<Dicta>{
    return this.httpClient.post<Dicta>(this.api+'guardarDicta', dicta)
  }
  update(dicta:Dicta,codp, codg, gestion):Observable<any>{
    return this.httpClient.put<any>(this.api+'modDicta'+'/'+codp+'/'+codg+'/'+gestion,dicta)
  }
  dell(codp: number, codg:number, gestion:number):Observable<any>{
    return this.httpClient.delete<any>(this.api+'deleteDicta/'+codp+'/'+codg+'/'+gestion) //ELIMINA EL DATO
  }
}
