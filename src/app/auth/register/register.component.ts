import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swall from "sweetalert2";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {

  }

  crearUsuario() {
    if (this.registroForm.invalid) return
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      }
    })
    const {nombre, correo, password} = this.registroForm.value
    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales)
        Swal.close()
        this.router.navigate(['/'])
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops',
          text: err.message,
        })
      })
  }
}
