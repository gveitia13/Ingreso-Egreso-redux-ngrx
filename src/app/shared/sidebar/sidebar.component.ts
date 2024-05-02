import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private authService = inject(AuthService)
  private router = inject(Router)

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login'])
      })
  }
}
