import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciosesionprincipal',
  standalone: true,
  imports: [MatButtonModule,  MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, FormsModule],
  templateUrl: './iniciosesionprincipal.component.html',
  styleUrl: './iniciosesionprincipal.component.css'
})
export class IniciosesionprincipalComponent {



  private formbuilder = inject(FormBuilder);
  formulario = this.formbuilder.group({
    correo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required]]
  });



  loggin(){

    console.log(this.formulario.value.correo);
    console.log(this.formulario.value.password);
  }



  


}
