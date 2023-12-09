import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  forgetForm!: FormGroup


  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }


  submit() {
    this.authService.sendEmailService(this.forgetForm.value.email).subscribe({
      next: (res) => {
        alert(res.message);
        this.forgetForm.reset();
      },
      error: (err) => alert(err.error.message)
    });

  }




}
