import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from '../services/seguridad.service';

export const administradorGuard: CanActivateFn = (route, state) => {

  /** hacer un guard nuevo (un archivo) para cada rol, y hacerlo similar a este */


  const router = inject(Router);
  const seguridadService = inject(SeguridadService);


  if(seguridadService.obtenerRol() === "administrador"){
    return true;
  }

  router.navigate(['/iniciosesionprincipal']);
  return true;
  
};
