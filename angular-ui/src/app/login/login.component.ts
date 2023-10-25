import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  login() {
    // Handle login logic here
    console.log('Logging in with username:', this.username, 'and password:', this.password);
    // You can add your authentication code here
  }
}
