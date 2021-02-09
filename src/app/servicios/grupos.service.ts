import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CGrupos } from '../modelos/grupos';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  private grupos: CGrupos[];
  constructor(private httpClient: HttpClient) {
    this.grupos = [];
  }
  private api = "/api/";
  getGrupos() {
    return this.httpClient.get(this.api + 'listaGrupos');
  }
  getGruposEstado(estado) {
    return this.httpClient.get(this.api + 'listaGrupos/'+estado);
  }
  create(grupo: CGrupos): Observable<CGrupos> {
    return this.httpClient.post<CGrupos>(this.api + 'guardarGrupo', grupo)
  }
  update(grupo: CGrupos): Observable<any> {
    return this.httpClient.put<any>(this.api + 'modGrupo', grupo)
  }
  dell(codg: number, grupo: CGrupos): Observable<any> {

    return this.httpClient.put<any>(this.api + 'modEstadoGrupo/' + codg, grupo) //ELIMINA EL DATO
  }
  estadohab(codg: number, grupo: CGrupos): Observable<any> {
    return this.httpClient.put<any>(this.api + 'modEstadoHabGrupo/' + codg, grupo)
  }
}
