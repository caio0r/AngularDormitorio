import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { LoginPageComponent } from './pages/login-page/login-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HomeComponent, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dormitorioSirio';
}
