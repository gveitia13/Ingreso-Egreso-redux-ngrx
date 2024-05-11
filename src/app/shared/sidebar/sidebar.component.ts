import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AppState} from "../../app.reducer";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {

  private authService = inject(AuthService)
  private router = inject(Router)
  private store = inject(Store<AppState>)
  nombre = ''
  userSubscription: Subscription | undefined

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .subscribe(auth => this.nombre = auth.user?.nombre)
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login'])
      })
  }
}
