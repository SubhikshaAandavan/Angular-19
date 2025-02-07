import { Component } from '@angular/core';

import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(private router: Router) {} // Inject Router

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.email === enteredEmail && u.password === enteredPassword
    );

    if (user) {
      alert('Login successful!');
      // Navigate to some other page if needed
    } else {
      alert('Invalid credentials!');
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']); // Use Router to navigate
  }
}
