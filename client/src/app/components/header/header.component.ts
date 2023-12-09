import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);

  isLoggeedIn: boolean = false;


  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((res) => {
      this.isLoggeedIn = this.authService.isLoggedIn();
    });
  }


  logout() {
    localStorage.removeItem("user_id");
    this.authService.isLoggedIn$.next(false);
  }

}
