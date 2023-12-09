import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'reset',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export default class ResetComponent implements OnInit {
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);

  resetForm!: FormGroup;
  token!: string;


  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: confirmPasswordValidator('password', 'confirmPassword') });

    this.activatedRoute.params.subscribe((val) => {
      this.token = val['token'];
      console.log(this.token);
    });
  }


  reset() {
    let resetObj = {
      token: this.token.replace('-', '.').replace('-', '.'),
      password: this.resetForm.value.password
    }

    this.authService.resetPasswordService(resetObj).subscribe({
      next: (res) => {
        alert(res.message);
        this.resetForm.reset();
        this.router.navigate(['login']);
      },
      error: (err) => alert(err.error.message)
    });


  }




}
