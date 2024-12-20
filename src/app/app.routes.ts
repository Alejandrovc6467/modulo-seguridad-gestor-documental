import { Routes } from '@angular/router';


import { OficinasComponent } from './pages/oficinas/oficinas.component';

import { IniciosesionprincipalComponent } from './pages/iniciosesionprincipal/iniciosesionprincipal.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RolesComponent } from './pages/roles/roles.component';
import { UsuarionormaComponent } from './pages/usuarionorma/usuarionorma.component';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { RolespermisosComponent } from './pages/rolespermisos/rolespermisos.component';
import { OficinaspermiososComponent } from './pages/oficinaspermiosos/oficinaspermiosos.component';
import { OficinasgestorComponent } from './pages/oficinasgestor/oficinasgestor.component';
import { UsuariooficinaComponent } from './pages/usuariooficina/usuariooficina.component';
import { administradorGuard } from './Core/guards/administrador.guard';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { autenticaionGuard } from './Core/guards/autenticaion.guard';




export const routes: Routes = [

    {
        path: '',
        component: SidebarComponent,
        children: [
          { path: 'oficinas', component: OficinasComponent, canActivate:[administradorGuard]},
          { path: 'oficinaspermisos', component: OficinaspermiososComponent, canActivate:[administradorGuard]},
          { path: 'oficinasgestor', component: OficinasgestorComponent, canActivate:[administradorGuard] },
          { path: 'usuarios', component: UsuariosComponent, canActivate:[administradorGuard] },
          { path: 'usuariOficina', component: UsuariooficinaComponent, canActivate:[administradorGuard]},
          { path: 'roles', component: RolesComponent, canActivate:[administradorGuard] },
          { path: 'rolespermisos', component: RolespermisosComponent, canActivate:[administradorGuard] },
          { path: 'permisos', component: PermisosComponent, canActivate:[administradorGuard] },
          { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
        ]
    },


    {path: 'iniciosesionprincipal', component:IniciosesionprincipalComponent, canActivate:[autenticaionGuard]},


    //si la ruta  no existe redirecciona a usuarios, obvio si no esta autenticado pues nunca entra aqui y lo manda al loggin
    {path: '**', redirectTo:'usuarios'},
  


];

// el path ** siempre debe de ir al final, ya que si va al principio pues no importa la ruta que pongas siempre entrara en **, porque lee desde arriba
// enotnces por eso hay que ponerla al fondo, porque si no encuentra nada entre al **
// con {path '**', redirecTo: ''} lo redireccion a la raiz, como lo tengo pues lo envio a un componente, podria crearme uno de 404 no fount, pero mas adelante
