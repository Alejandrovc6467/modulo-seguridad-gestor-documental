
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
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OficinaGestorIdsDTO, OficinaGestorIdsExtendidaDTO } from '../../Core/models/OficinaGestorIdsDTO';
import { OficinaDTO } from '../../Core/models/OficinaDTO';
import { OficinaGestorDTO } from '../../Core/models/OficinaGestorDTO';
import { OficinasgestorasService } from '../../Core/services/oficinasgestoras.service';
import { OficinasgestoridsService } from '../../Core/services/oficinasgestorids.service';

@Component({
  selector: 'app-oficinasgestor',
  standalone: true,
  imports: [CommonModule,MatButtonModule,  MatFormFieldModule, MatSelectModule,ReactiveFormsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, FormsModule],
  templateUrl: './oficinasgestor.component.html',
  styleUrl: './oficinasgestor.component.css'
})
export class OficinasgestorComponent {

  
  permisoOficinaService = inject(PermisooficinaService);
  oficinasgestorasService = inject(OficinasgestorasService);
  oficinasgestoridsService = inject(OficinasgestoridsService);
  oficinaService = inject(OficinasService);
  permisoService = inject(PermisosService);
  listaOficinasGestores! : OficinaGestorIdsDTO[];
  oficinas!: OficinaDTO[];
  permisos!: PermisoDTO[];
  oficinasGestoras!: OficinaGestorDTO[];


  listaOficinasGestoresDataSource = new MatTableDataSource<OficinaGestorIdsExtendidaDTO>([]);
  displayedColumns: string[] = [ 'acciones', 'oficina', 'gestor'];
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
    oficinaID: [0, [Validators.required]],
    gestorID: [0, [Validators.required]],
  });

  obtenerOficinas() {
    this.oficinaService.obtenerOficinas().subscribe(response => {
        this.oficinas = response.filter((oficina: OficinaDTO) => !oficina.gestor);
    });
  }

  obtenerOficinasGestoras(){
    this.oficinasgestorasService.obtenerOficinasGestoras().subscribe(response => {
      this.oficinasGestoras = response;
  })};


 


  //CRUD ***************************************************************************************



  obtenerUsuarios(){
    this.oficinasgestoridsService.obtenerOficinasGestoresIds().subscribe(response => {
      this.listaOficinasGestores = response;
    });
  }



  crearUsuario(){
    
    if(this.formulario.invalid){
      alert("Formulario invalido");
    }else{

      const oficinaGestorIdsDTO = this.formulario.value as OficinaGestorIdsDTO; 
      
      // Asegurarse de que clasificacionId sea un número válido
      // permisoOficina.clasificacionID = Number(permisoOficina.clasificacionID);

      console.log(oficinaGestorIdsDTO);
  
      this.oficinasgestoridsService.crearOficinaGestor(oficinaGestorIdsDTO).subscribe(response => {

        console.log(response);
        if(response){
          this.obtenerOficinasGestoresCargarTabla();
          this.formulario.reset();
          this.limpiarErroresFormulario();
          Swal.fire('Creado!', 'Se ha asignado la oficina a una oficina gestor correctamente.', 'success');
        }else{
          Swal.fire('Error!', 'No se ha asignado la oficina a una oficina gestor correctamente.', 'error');
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
                this.permisoOficinaService.eliminarPermisoOficina(element).subscribe({
                    next: (response) => {
                        this.obtenerOficinasGestoresCargarTabla();
                        this.formulario.reset();
                        this.limpiarErroresFormulario();
                        Swal.fire('Listo!', 'Se ha eliminado el oficina permiso correctamente.', 'success');
                    },
                    error: (err) => {
                        console.error('Error al eliminar el permiso:', err);
                        Swal.fire('Error!', 'Ocurrió un error al intentar eliminar el oficina permiso.', 'error');
                    }
                });
            } catch (error) {
                console.error('Error en la operación de eliminación:', error);
                Swal.fire('Error!', 'Se produjo un error inesperado.', 'error');
            }
        } else {
            Swal.fire('Error!', 'El oficina permiso no ha sido eliminado.', 'error');
        }
    });
  }

    


  

  // Otros **********************************************************

  obtenerOficinasGestoresCargarTabla(){
    this.oficinasgestoridsService.obtenerOficinasGestoresIds().subscribe(response => {
      this.listaOficinasGestores = response;
      this.setTable(this.listaOficinasGestores);
    });
  }

  setTable(data:OficinaGestorIdsDTO[]){

    //voy simular una espera con este setTime
    setTimeout(() => {

      // Mapear los datos para agregar el nombre de la clasificación
      const dataConClasificacionNombre: OficinaGestorIdsExtendidaDTO[] = data.map(oficinaGestorLista => {

        const oficina = this.oficinas.find(oficina => oficina.id === oficinaGestorLista.oficinaID);
        const oficinaGestor = this.oficinasGestoras.find(oficinaGestor => oficinaGestor.id === oficinaGestorLista.gestorID);
        return {
          ...oficinaGestorLista,
         
          oficinaNombre: oficina ? oficina.nombre : 'Sin nombre',
          gestorNombre: oficinaGestor ? oficinaGestor.nombre : 'Sin nombre'

        
        };
      });
      // Configurar el DataSource con los datos modificados
      this.listaOficinasGestoresDataSource = new MatTableDataSource<OficinaGestorIdsExtendidaDTO>(dataConClasificacionNombre);
      this.listaOficinasGestoresDataSource.paginator = this.paginator;

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
    const filterValue = event.target.value?.trim().toLowerCase() || '';
    if (!filterValue) {
      // Si esta vacio, mostrar toda la lista
      this.setTable(this.listaOficinasGestores);
      return;
    }
    //pude haber hecho todo el filtro aqui, pero se requeria la necesidad del boton buscar
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
