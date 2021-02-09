import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { Proyectos } from '../modelos/proyectos';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private httpClient:HttpClient) { }
  private mostrarProy="/api/listaProyectos";
  private api= "/api/";

  getPro(){
    return this.httpClient.get(this.mostrarProy);
 }
 getProEstado(estado){
  return this.httpClient.get(this.mostrarProy+'/'+estado);
}


 create(proyecto:Proyectos):Observable<Proyectos>{
  return this.httpClient.post<Proyectos>(this.api+"guardarProyectos", proyecto)
}
update(proyecto:Proyectos):Observable<any>{
  return this.httpClient.put<any>( this.api+"modProy",proyecto)
}
estadohab(codpro:number,proyecto:Proyectos):Observable<any>{
  return this.httpClient.put<any>(this.api+'modEstadoHabProyec/'+codpro,proyecto)
}
dell(codpro: number, proyecto:Proyectos):Observable<any>{
   
  return this.httpClient.put<any>(this.api+"modEstadoProyectos/"+codpro, proyecto) //ELIMINA EL DATO
}
subirConDoc(archivo:File, pro):Observable<Proyectos>{
  if(!archivo){
  
    archivo=null;
    console.log(archivo  )
  }
  let formData= new FormData();
  formData.append("archivo",archivo);
  formData.append("pro",pro);
  return this.httpClient.post("/api/proyecto/uploadPro",formData).pipe(
   map((response:any)=>response.proyectos as Proyectos ),
   catchError(e=>{
     console.log(e);
     Swal.fire("no se subio",'error');
     return throwError(e);
   })
  );
}

}
