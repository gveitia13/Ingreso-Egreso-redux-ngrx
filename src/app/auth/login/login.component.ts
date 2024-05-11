import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import * as ui from "../../shared/ui.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup
  cargando = false
  uiSubscription: Subscription | undefined

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading
    })
  }

  login() {
    if (this.loginForm.invalid) return

    this.store.dispatch(ui.isLoading())

    const {email, password} = this.loginForm.value
    this.authService.loginUsuario(email, password)
      .then(credenciales => {
        console.log(credenciales)
        // Swal.close()
        this.store.dispatch(ui.stopLoading())
        this.router.navigate(['/'])
      })
      .catch(err => {
        this.store.dispatch(ui.isLoading())
        Swal.fire({
          icon: 'error',
          title: 'Ooops',
          text: err.message,
        })
      })
  }
}
