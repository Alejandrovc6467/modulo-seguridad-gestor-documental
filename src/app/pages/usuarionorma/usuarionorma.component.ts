
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
import { UsuariosService } from '../../Core/services/usuarios.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OficinaGestorIdsDTO, OficinaGestorIdsExtendidaDTO } from '../../Core/models/OficinaGestorIdsDTO';
import { OficinaDTO } from '../../Core/models/OficinaDTO';
import { OficinaGestorDTO } from '../../Core/models/OficinaGestorDTO';
import { OficinasgestorasService } from '../../Core/services/oficinasgestoras.service';
import { OficinasgestoridsService } from '../../Core/services/oficinasgestorids.service';
import { UsuarionormaService } from '../../Core/services/usuarionorma.service';
import { NormasService } from '../../Core/services/normas.service';
import { NormaDTO } from '../../Core/models/NormaDTO';
import { UsuarioNormaDTO, UsuarioNormaExtendidaDTO } from '../../Core/models/UsuarioNormaDTO';
import { CustomMatPaginatorIntlComponent } from '../../Core/Componentes/custom-mat-paginator-intl/custom-mat-paginator-intl.component';


@Component({
  selector: 'app-usuarionorma',
  standalone: true,
  imports: [CommonModule,MatButtonModule,  MatFormFieldModule, MatSelectModule,ReactiveFormsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, FormsModule],
  templateUrl: './usuarionorma.component.html',
  styleUrl: './usuarionorma.component.css',
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntlComponent }
  ]
})
export class UsuarionormaComponent {

  usuarionormaService = inject(UsuarionormaService);
  normaService = inject(NormasService);
  usuarioService = inject(UsuariosService);
  oficinaService = inject(OficinasService);

  oficinas!: OficinaDTO[];
  normas!: NormaDTO[];
  usuarios!: UsuarioDTO[];

  listaUsuariosNormas! : UsuarioNormaDTO[];
 

 
  usuariosParaTabla!: UsuarioDTO[];


  listaUsuariosNormasDataSource = new MatTableDataSource<UsuarioNormaExtendidaDTO>([]);
  displayedColumns: string[] = [ 'acciones', 'norma', 'usuario'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  textoBuscar: string = "";
  estaEditando: boolean = false;
  usuarioSeleccinado!: UsuarioDTO | null;


  ngOnInit(): void {
    this.obtenerOficinas();
    this.obtenerNormas();
    this.obtenerUsuariosParaCargarTabla();
    this.obtenerUsuariosNormasCargarTabla();
    this.formulario.updateValueAndValidity();

    // Suscribirse a los cambios del select de oficina
    this.formulario.get('oficinaID')?.valueChanges.subscribe(oficinaID => {
      this.obtenerUsuariosPorOficina(oficinaID ?? 0); // Asume 0 o un valor predeterminado si es null
    });
    
    
  }
  
  constructor(){}

  private formbuilder = inject(FormBuilder);
  formulario = this.formbuilder.group({
    oficinaID: [0, [Validators.required]],
    normaID: [0, [Validators.required]],
    usuarioID: [0, [Validators.required]]
  });

  obtenerOficinas() {
    this.oficinaService.obtenerOficinas().subscribe(response => {
        this.oficinas = response.filter((oficina: OficinaDTO) => !oficina.gestor);
    });
  }

  obtenerUsuariosParaCargarTabla(){
    this.usuarioService.obtenerUsuarios().subscribe(response => {
      this.usuariosParaTabla = response;
    });
  }


  obtenerNormas(){
    this.normaService.obtenerNormas().subscribe(response => {
      this.normas = response;
  })};


  obtenerUsuariosPorOficina(oficinaID: number) {
    if (oficinaID) {
      this.usuarioService.obtenerUsuariosPorOficina(oficinaID).subscribe(usuarios => {
        this.usuarios = usuarios;
      });
    } else {
      this.usuarios = [];
    }
  }



 


  //CRUD ***************************************************************************************



  obtenerUsuarios(){
    this.usuarionormaService.obtenerUsuariosNormas().subscribe(response => {
      this.listaUsuariosNormas = response;
    });
  }



  crearUsuario(){

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas crear la norma usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

         
      if(this.formulario.value.normaID != 0  && this.formulario.value.oficinaID != 0  &&  this.formulario.value.usuarioID != 0  ){
        
        const usuarioNormaDTO = {
          normaID: this.formulario.value.normaID || 0,
          usuarioID: this.formulario.value.usuarioID || 0
        }
        console.log(usuarioNormaDTO);
    
        this.usuarionormaService.crearUsuarioNorma(usuarioNormaDTO).subscribe(response => {

          console.log(response);
          if(response){
            this.obtenerUsuariosNormasCargarTabla();
            this.formulario.reset();
            this.limpiarErroresFormulario();
            Swal.fire('Creado!', 'Se ha asignado el usuario a una norma correctamente.', 'success');
          }else{
            Swal.fire('Error!', 'No se ha asignado el usuario a una norma correctamente.', 'error');
          }
        
        
        });

      }else{
        Swal.fire('Error!', 'Todos los campos son requeridos.', 'error');
      }

      }
    });
  

    
   

  }
      
  
  
  

 

  
  eliminarUsuario(element: any) {
    
    // Mostrar el SweetAlert para confirmar la eliminación
    Swal.fire({
        title: '¿Desea eliminar la norma usuario?',
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
                this.usuarionormaService.eliminarUsuarioNorma(element).subscribe({
                    next: (response) => {
                        this.obtenerUsuariosNormasCargarTabla();
                        this.formulario.reset();
                        this.limpiarErroresFormulario();
                        Swal.fire('Listo!', 'Se ha eliminado correctamente.', 'success');
                    },
                    error: (err) => {
                        console.error('Error al eliminar:', err);
                        Swal.fire('Error!', 'Ocurrió un error al intentar eliminar.', 'error');
                    }
                });
            } catch (error) {
                console.error('Error en la operación de eliminación:', error);
                Swal.fire('Error!', 'Se produjo un error inesperado.', 'error');
            }
        }
    });
    
  }

    


  

  // Otros **********************************************************

  obtenerUsuariosNormasCargarTabla(){
    this.usuarionormaService.obtenerUsuariosNormas().subscribe(response => {
      this.listaUsuariosNormas = response;
      this.setTable(this.listaUsuariosNormas);
    });
  }

  setTable(data:UsuarioNormaDTO[]){

    //voy simular una espera con este setTime
    setTimeout(() => {

      // Mapear los datos para agregar el nombre de la clasificación
      const dataConClasificacionNombre: UsuarioNormaExtendidaDTO[] = data.map(usuariosNormas => {

        const usuario = this.usuariosParaTabla.find(usuario => usuario.id === usuariosNormas.usuarioID);
        const norma = this.normas.find(norma => norma.id === usuariosNormas.normaID);
        return {
          ...usuariosNormas,
          nombreUsuario: usuario ? usuario.nombre : 'Sin nombre',
          nombreNorma: norma ? norma.nombre : 'Sin nombre'
        
        };
      });
      // Configurar el DataSource con los datos modificados
      this.listaUsuariosNormasDataSource = new MatTableDataSource<UsuarioNormaExtendidaDTO>(dataConClasificacionNombre);
      this.listaUsuariosNormasDataSource.paginator = this.paginator;

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
