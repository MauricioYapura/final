import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menus="/api/listaRolme/"; // direccion de la api
  private roles="/api/listaroles"
  
  constructor(private httpClient:HttpClient) { }
  

 
  getRoles(usuario:string){
    const httpHeaders = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
    return this.httpClient.get(this.roles+'/'+usuario,{headers:httpHeaders});
  }
  getMenus(codr:number){
    const httpHeaders = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
    return this.httpClient.get(this.menus+codr,{headers:httpHeaders});
  }
  getLogin(xuser:string, password:string): Observable<any>{
    
    const body= new HttpParams()
    .set('user', xuser)
    .set('password', password);
    return this.httpClient.post("/api/login",body.toString(),
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }
    )
  }
}
