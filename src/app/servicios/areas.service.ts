import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../modelos/area';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  private areas: Area[];
  constructor(private httpClient:HttpClient) { 
    this.areas=[];
  }
  private mostrarArea="/api/listaAreas";
  private api= "/api/"
  getAreas(){
    return this.httpClient.get(this.mostrarArea);
 }
 getAreasEst(estado){
  return this.httpClient.get(this.mostrarArea+'/'+estado);
}
 create(area:Area):Observable<Area>{
  return this.httpClient.post<Area>(this.api+'guardarArea', area)
}
update(area:Area):Observable<any>{
  return this.httpClient.put<any>(this.api+'modArea',area)
}
dell(coda: number, area:Area):Observable<any>{
   
  return this.httpClient.put<any>(this.api+'modEstadoArea/'+coda, area) //ELIMINA EL DATO
}
estadohab(coda:number,area:Area):Observable<any>{
  return this.httpClient.put<any>(this.api+'modEstadoHabArea/'+coda,area)
}
}
