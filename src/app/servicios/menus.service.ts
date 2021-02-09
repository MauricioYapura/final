import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menus } from '../modelos/menus';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(private httpClient:HttpClient) { }
  private api= "/api/";
  getMenu(){
    return this.httpClient.get(this.api+'listaMenusM/');
 }
 getMenuEst(estado){
  return this.httpClient.get(this.api+'listaMenusM/'+estado);
}
getMenuAsig(codm,as){
  return this.httpClient.get(this.api+'listaProcesosA/'+codm+'/'+as);
}
getProces(codm){
  return this.httpClient.get(this.api+'listaProcesos/'+codm);
}
 create(menu:Menus):Observable<Menus>{
  return this.httpClient.post<Menus>(this.api+'guardarMenu', menu)
}
update(menu:Menus):Observable<any>{
  return this.httpClient.put<any>(this.api+'modMenu',menu)
}
dell(codm: number, menu:Menus):Observable<any>{ 
  return this.httpClient.put<any>(this.api+'modEstadoMenu/'+codm, menu) //ELIMINA EL DATO
}
estadohab(codm:number,menu:Menus):Observable<any>{
  return this.httpClient.put<any>(this.api+'modEstadoHabMenu/'+codm,menu)
}
createMepro(codm,codp):Observable<any>{
 let menu1:Object;
  return this.httpClient.post<any>(this.api+'guardarMepro/'+codm+'/'+codp,menu1)
}
dellMepro(codm,codp):Observable<any>{ 
  return this.httpClient.delete<any>(this.api+'deleteMepro/'+codm+'/'+codp) //ELIMINA EL DATO
}
}
