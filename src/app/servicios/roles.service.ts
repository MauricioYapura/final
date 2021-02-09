import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from '../modelos/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private httpClient:HttpClient) { }
  private api= "/api/";
  getRol(){
    return this.httpClient.get(this.api+'listaRolesM/');
 }
 getRolEst(estado){
  return this.httpClient.get(this.api+'listaRolesM/'+estado);
}
 create(rol:Roles):Observable<Roles>{
  return this.httpClient.post<Roles>(this.api+'guardarRol', rol)
}
update(rol:Roles):Observable<any>{
  return this.httpClient.put<any>(this.api+'modRol',rol)
}
dell(codr: number, rol:Roles):Observable<any>{
   
  return this.httpClient.put<any>(this.api+'modEstadoRol/'+codr, rol) //ELIMINA EL DATO
}
estadohab(codr:number,rol:Roles):Observable<any>{
  return this.httpClient.put<any>(this.api+'modEstadoHabRol/'+codr,rol)
}
/// rlme
getMenu(codr){
  return this.httpClient.get(this.api+'listaMenuRolme/'+codr);
}
getMenuAsig(codr,asi){
  return this.httpClient.get(this.api+'listaMenuRolmeA/'+codr+'/'+asi);
}
createRolme(codr,codm):Observable<any>{
  let menu1:Object;
   return this.httpClient.post<any>(this.api+'guardarRolme/'+codr+'/'+codm,menu1)
 }
 dellRolme(codr,codm):Observable<any>{ 
   return this.httpClient.delete<any>(this.api+'deleteRolme/'+codr+'/'+codm) //ELIMINA EL DATO
 }
}
