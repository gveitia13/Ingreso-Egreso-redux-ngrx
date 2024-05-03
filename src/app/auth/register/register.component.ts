import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {Subscription} from "rxjs";
import * as ui from "../../shared/ui.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup
  cargando = false
  uiSubscription: Subscription | undefined

  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router, private store: Store<AppState>) {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading)
  }

  crearUsuario() {
    if (this.registroForm.invalid) return
    /*Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      }
    })*/
    this.store.dispatch(ui.isLoading())

    const {nombre, correo, password} = this.registroForm.value
    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales)
        // Swal.close()
        this.store.dispatch(ui.stopLoading())

        this.router.navigate(['/'])
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'Ooops',
          text: err.message,
        })
      })
  }
}
