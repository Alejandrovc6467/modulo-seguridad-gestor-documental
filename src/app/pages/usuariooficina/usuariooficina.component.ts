
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioDTO } from '../../Core/models/UsuarioDTO';
import { PermisoDTO } from '../../Core/models/PermisoDTO';
import { PermisooficinaService } from '../../Core/services/permisooficina.service';
import { OficinasService } from '../../Core/services/oficinas.service';
import { PermisosService } from '../../Core/services/permisos.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OficinaGestorIdsDTO, OficinaGestorIdsExtendidaDTO } from '../../Core/models/OficinaGestorIdsDTO';
import { OficinaDTO } from '../../Core/models/OficinaDTO';
import { OficinaGestorDTO } from '../../Core/models/OficinaGestorDTO';
import { UsuariosService } from '../../Core/services/usuarios.service';
import { OficinasgestoridsService } from '../../Core/services/oficinasgestorids.service';
import { UsuariooficinaService } from '../../Core/services/usuariooficina.service';
import { usuarioOficinaDTO, usuarioOficinaDTOExtendidaDTO } from '../../Core/models/UsuarioOficinaDTO';
import { CustomMatPaginatorIntlComponent } from '../../Core/Componentes/custom-mat-paginator-intl/custom-mat-paginator-intl.component';


@Component({
  selector: 'app-usuariooficina',
  standalone: true,
  imports: [CommonModule,MatButtonModule,  MatFormFieldModule, MatSelectModule,ReactiveFormsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, FormsModule],
  templateUrl: './usuariooficina.component.html',
  styleUrl: './usuariooficina.component.css',
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntlComponent }
  ]
})
export class UsuariooficinaComponent {

  usuariooficinaService = inject(UsuariooficinaService)
  usuariosService = inject(UsuariosService);
  oficinaService = inject(OficinasService);

  listaUsuariosOficinas! : usuarioOficinaDTO[];
  oficinas!: OficinaDTO[];
  usuarios!: UsuarioDTO[];


  listaUsuariosOficinasDataSource = new MatTableDataSource<usuarioOficinaDTOExtendidaDTO>([]);
  displayedColumns: string[] = [ 'acciones', 'usuario', 'oficina'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  textoBuscar: string = "";
  estaEditando: boolean = false;
  usuarioSeleccinado!: UsuarioDTO | null;


  ngOnInit(): void {
    this.obtenerOficinas();
    this.obtenerOficinasGestoras();
    this.obtenerOficinasGestoresCargarTabla();
    this.formulario.updateValueAndValidity();
  }
  
  constructor(){}

  private formbuilder = inject(FormBuilder);
  formulario = this.formbuilder.group({
    usuarioID: [0, [Validators.required]],
    oficinaID: [0, [Validators.required]],
  });

  obtenerOficinas() {
    this.oficinaService.obtenerOficinas().subscribe(response => {
        this.oficinas = response;
    });
  }

  obtenerOficinasGestoras(){
    this.usuariosService.obtenerUsuarios().subscribe(response => {
      this.usuarios = response;
  })};


 


  //CRUD ***************************************************************************************



  obtenerUsuarios(){
    this.usuariooficinaService.obtenerUsuariosOficinas().subscribe(response => {
      this.listaUsuariosOficinas = response;
    });
  }



  crearUsuario(){
    
    
    if(this.formulario.invalid){
      alert("Formulario invalido");
    }else{

      const usuarioOficinaDTO = this.formulario.value as usuarioOficinaDTO; 
 
      console.log(usuarioOficinaDTO);
  
      this.usuariooficinaService.crearUsuarioOficina(usuarioOficinaDTO).subscribe(response => {

        console.log(response);
        if(response){
          this.obtenerOficinasGestoresCargarTabla();
          this.formulario.reset();
          this.limpiarErroresFormulario();
          Swal.fire('Creado!', 'Se ha asignado el usuario a la oficina correctamente.', 'success');
        }else{
          Swal.fire('Error!', 'No se ha asignado el usuario a la oficina correctamente.', 'error');
        }
       
      
      });

    }
      
  
  }
  

 

  
  eliminarUsuario(element: any) {
    
    // Mostrar el SweetAlert para confirmar la eliminación
    Swal.fire({
        title: '¿Desea eliminar el oficina permiso?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, proceder con la eliminación
            try {
                this.usuariooficinaService.eliminarUsuarioOficina(element).subscribe({
                    next: (response) => {
                        this.obtenerOficinasGestoresCargarTabla();
                        this.formulario.reset();
                        this.limpiarErroresFormulario();
                        Swal.fire('Listo!', 'Se ha eliminado correctamente.', 'success');
                    },
                    error: (err) => {
                        console.error('Error al eliminar el permiso:', err);
                        Swal.fire('Error!', 'Ocurrió un error al intentar eliminar.', 'error');
                    }
                });
            } catch (error) {
                console.error('Error en la operación de eliminación:', error);
                Swal.fire('Error!', 'Se produjo un error inesperado.', 'error');
            }
        } else {
            Swal.fire('Error!', 'No ha sido eliminado.', 'error');
        }
    });
    
  }

    


  

  // Otros **********************************************************

  obtenerOficinasGestoresCargarTabla(){
    this.usuariooficinaService.obtenerUsuariosOficinas().subscribe(response => {
      this.listaUsuariosOficinas = response;
      this.setTable(this.listaUsuariosOficinas);
    });
  }

  setTable(data:usuarioOficinaDTO[]){


    setTimeout(() => {

      const dataConClasificacionNombre: usuarioOficinaDTOExtendidaDTO[] = data.map(usuarioOficina => {
      const oficina = this.oficinas.find(oficina => oficina.id === usuarioOficina.oficinaID);
      const usuario = this.usuarios.find(usuario => usuario.id === usuarioOficina.usuarioID);
      return {
        ...usuarioOficina,
        nombreUsuario: usuario ? usuario.nombre : 'Sin nombre',
        nombreOficina: oficina ? oficina.nombre : 'Sin nombre'
      };
      });

  
      this.listaUsuariosOficinasDataSource = new MatTableDataSource<usuarioOficinaDTOExtendidaDTO>(dataConClasificacionNombre);
      this.listaUsuariosOficinasDataSource.paginator = this.paginator;

    }, 3000);
  }
  
  realizarBusqueda() {
    this.filtrarData();
  }

  filtrarData(){

    /*
    const data = this.listaOficinasGestores.slice();
    if(!this.textoBuscar){
     this.setTable(data);
      return;
    }

    const dataFiltrada = data.filter(item => {
      return item.oficinaID.includes(this.textoBuscar);
    })

    this.setTable(dataFiltrada);
    */
    
  }

  limpiarFormulario() {
    this.formulario.reset(); // Resetea los campos del formulario
    this.formulario.markAsPristine();  // Marcar como 'pristino'
    this.formulario.markAsUntouched(); // Marcar como 'intacto'
    this.formulario.updateValueAndValidity(); // Recalcular estado de validez
    this.limpiarErroresFormulario(); // Eliminar los errores
  }
 
  onSearchChange(event: any) {
    /*
    const filterValue = event.target.value?.trim().toLowerCase() || '';
    if (!filterValue) {
      // Si esta vacio, mostrar toda la lista
      this.setTable(this.listaOficinasGestores);
      return;
    }
    //pude haber hecho todo el filtro aqui, pero se requeria la necesidad del boton buscar
    */
  }


  // validaciones **********************************************************
  obtenerErrorDescripcion() {
    /*
    const descripcion = this.formulario.controls.descripcion;
    if (descripcion.hasError('required')) {
      return 'El campo descripción es obligatorio';
    }
    return '';
    */
  }

  obtenerErrorNombre(){
    /*
    const nombre = this.formulario.controls.nombre;
   
    if (nombre.hasError('required')) {
      return 'El campo nombre es obligatorio';
    }

    
    if (nombre.hasError('pattern')) {
      return 'El campo nombre solo puede contener letras';
    }
    
    return ''; 
    */
  }

  limpiarErroresFormulario() {
    Object.keys(this.formulario.controls).forEach(key => {
      this.formulario.get(key)?.setErrors(null); // Eliminar los errores de cada control
    });
  }

  obtenerErrorClasificacionId() {
    /*
    const clasificacionId = this.formulario.controls.clasificacionID;
  
    if (clasificacionId.hasError('required')) {
      return 'El campo clasificación es obligatorio';
    }
  
    return '';
    */
  }

}
