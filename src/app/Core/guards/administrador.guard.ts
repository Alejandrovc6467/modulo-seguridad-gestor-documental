import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from '../services/seguridad.service';

export const administradorGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const seguridadService = inject(SeguridadService);


  if(seguridadService.obtenerRol() === "administrador"){
    return true;
  }

  router.navigate(['/iniciosesionprincipal']);
  return true;
  
};
