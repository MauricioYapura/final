import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etapas } from '../modelos/Etapas';

@Injectable({
  providedIn: 'root'
})
export class EtapasService {
  private etapas: Etapas[];
  constructor(private httpClient:HttpClient) { }
  private mostrarEtapa="/api/listaEtapas";
  private api= "/api/";
  getEtapas(){
    return this.httpClient.get(this.mostrarEtapa);
 }
 getEtapasEst(estado){
  return this.httpClient.get(this.mostrarEtapa+'/'+estado);
}
 create(etapa:Etapas):Observable<Etapas>{
  return this.httpClient.post<Etapas>(this.api+'guardarEtapa', etapa)
}
update(etapa:Etapas):Observable<any>{
  return this.httpClient.put<any>(this.api+'modEtapa',etapa)
}
dell(coda: number, etapa:Etapas):Observable<any>{
   
  return this.httpClient.put<any>(this.api+'modEstadoEtapa/'+coda, etapa) //ELIMINA EL DATO
}
estadohab(coda:number,etapa:Etapas):Observable<any>{
  return this.httpClient.put<any>(this.api+'modEstadoHabEtapa/'+coda,etapa)
}
}
