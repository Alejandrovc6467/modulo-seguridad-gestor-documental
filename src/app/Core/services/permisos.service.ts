import { inject, Injectable } from '@angular/core';
import { PermisoDTO } from '../models/PermisoDTO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

 
  private http = inject(HttpClient);
  private urlBase = "http://gestordocumental.somee.com/api/Permiso";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion


  constructor() { }


  public obtenerCategorias(): Observable<PermisoDTO[]>{
    return this.http.get<PermisoDTO[]> (this.urlBase);
  }

  public obtenerCategoriaPorId(id:number): Observable<PermisoDTO>{
    return this.http.get<PermisoDTO>(`${this.urlBase}/${id}`);
  }
  public crearCategoria(categoria: PermisoDTO){
    return this.http.post(this.urlBase, categoria);
  }

  public actualizarCategoria(categoria: PermisoDTO){
    return this.http.put(this.urlBase, categoria);
  }

  public eliminarCategoria(id:number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }

}
