import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),

    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    street: new FormControl('', {
      validators: [Validators.required],
    }),
    number: new FormControl('', {
      validators: [Validators.required],
    }),
    postalCode: new FormControl('', {
      validators: [Validators.required],
    }),
    city: new FormControl('', {
      validators: [Validators.required],
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }),
    agree: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
  });

  constructor(private router: Router) {} // Inject Router

  onSubmit() {
    if (this.form.invalid) {
      alert('Please fill all the fields correctly.');
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some(
      (u: any) => u.email === this.form.value.email
    );

    if (userExists) {
      alert('User with this email already exists.');
      return;
    }

    const newUser = {
      email: this.form.value.email,
      password: this.form.value.password,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      street: this.form.value.street,
      number: this.form.value.number,
      postalCode: this.form.value.postalCode,
      city: this.form.value.city,
      role: this.form.value.role,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful!');
    this.router.navigate(['/login']); // Use Router to navigate
  }

  onReset() {
    this.form.reset();
  }

  navigateToLogin() {
    this.router.navigate(['/login']); // Use Router to navigate
  }
  get checkPasswordMatch() {
    return this.form.value.password !== this.form.value.confirmPassword;
  }
}
