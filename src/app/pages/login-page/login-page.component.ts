import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username = '';
  password = '';
  mostrarAdmin = false;

  constructor(private router: Router) {}

  toggleAdmin() {
    this.mostrarAdmin = !this.mostrarAdmin;
  }

  login() {
    console.log('Usuário:', this.username);
    console.log('Senha:', this.password);

    // futuramente aqui validaremos
    this.router.navigate(['/home']);
  }
}
