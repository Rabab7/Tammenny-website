import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { ThemeService } from '../../../../core/services/theme/theme-service';


@Component({
  selector: 'app-nav-main',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-main.html',
  styleUrl: './nav-main.css',
})
export class NavMain {

  _AuthService = inject(AuthService)
  _Router = inject(Router)
  themeService = inject(ThemeService);

  
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  toggleTheme() {
    this.themeService.toggleTheme();
  }

    handleLogout(): void {
    this._AuthService.logout();
    this._Router.navigate(['/auth/login']);
  }
  
 
  get isAuthenticated(): boolean {
      return this._AuthService.isLoggedIn();
  }


}
