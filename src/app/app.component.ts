import {Component, inject} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '04-ingreso-egreso-app';

  constructor(private authService: AuthService) {
    this.authService.initAuthListener()
  }
}
