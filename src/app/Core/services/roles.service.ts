import { inject, Injectable } from '@angular/core';
import { RolDTO } from '../models/RolDTO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  
  private http = inject(HttpClient);
  private urlBase = "http://gestordocumental.somee.com/api/Rol";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion


  constructor() { }


  public obtenerCategorias(): Observable<RolDTO[]>{
    return this.http.get<RolDTO[]> (this.urlBase);
  }

  public obtenerCategoriaPorId(id:number): Observable<RolDTO>{
    return this.http.get<RolDTO>(`${this.urlBase}/${id}`);
  }
  public crearCategoria(categoria: RolDTO){
    return this.http.post(this.urlBase, categoria);
  }

  public actualizarCategoria(categoria: RolDTO){
    return this.http.put(this.urlBase, categoria);
  }

  public eliminarCategoria(id:number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }

}
