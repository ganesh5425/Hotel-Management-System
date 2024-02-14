import { Component, inject } from '@angular/core';
import { SignUpService } from '../../../service/sign-up.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  showLogin=inject(SignUpService);
  
}
