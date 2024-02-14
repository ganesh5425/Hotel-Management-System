import { Component, inject } from '@angular/core';
import { SignUpService } from '../service/sign-up.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotel-booking';

  signupService = inject(SignUpService);
  showSignup:any = this.signupService.getIsLoggedIn();
  
  
}
