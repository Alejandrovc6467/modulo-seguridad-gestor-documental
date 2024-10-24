import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EtapaDTO } from '../models/EtapaDTO';


@Injectable({
  providedIn: 'root'
})
export class EtapasService {

  private http = inject(HttpClient);
  private urlBase = "http://gestordocumental.somee.com/api/Etapa";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion
  constructor() { }

  public obtenerEtapas(): Observable<EtapaDTO[]>{
    return this.http.get<EtapaDTO[]> (this.urlBase);
  }

  public obtenerEtapasPorId(id:number): Observable<EtapaDTO>{
    return this.http.get<EtapaDTO>(`${this.urlBase}/${id}`);
  }
  public crearEtapa(etapa: EtapaDTO){
    return this.http.post(this.urlBase, etapa);
  }

  public actualizarEtapa(etapa: EtapaDTO){
    return this.http.put(this.urlBase, etapa);
  }

  public eliminarEtapa(id:number){
    return this.http.delete(`${this.urlBase}?id=${id}`);
  }
}
