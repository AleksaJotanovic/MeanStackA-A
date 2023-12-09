import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder)
  authService = inject(AuthService);
  router = inject(Router);

  loginForm!: FormGroup;


  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required],
      }
    );
  }


  login() {
    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        alert("Login is successfull!");
        localStorage.setItem("user_id", res.data._id);
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(["home"]);
        this.loginForm.reset();
      },
      error: (err) => console.log(err)
    })
  }

}
