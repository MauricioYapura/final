import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsurolService {

  constructor(private httpClient:HttpClient) { }
  private api= "/api/";
  getLogin(estado){
    return this.httpClient.get(this.api+'listaLogin/'+estado);
 }

 getRol(login){
  return this.httpClient.get(this.api+'listaUsuRolSolo/'+login);
}
getRolesAsig(login,asi){
  return this.httpClient.get(this.api+'listaRolesAsig/'+login+'/'+asi);
}
createUsurol(login,codr):Observable<any>{
  let menu1:Object;
   return this.httpClient.post<any>(this.api+'guardarUsurol/'+login+'/'+codr,menu1)
 }
 dellUsurol(login,codr):Observable<any>{ 
   return this.httpClient.delete<any>(this.api+'deleteUsurol/'+login+'/'+codr) //ELIMINA EL DATO
 }
}
