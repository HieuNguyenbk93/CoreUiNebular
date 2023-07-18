import { Component } from '@angular/core';
import { NbAuthSocialLink, NbLoginComponent } from '@nebular/auth';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  submitted: boolean = false;
  user: any = {};
  errors: string[] = [];
  rememberMe = true;
  loading = false;
  showMessages: any = {};
  messages: string[] = [];

  socialLinks: NbAuthSocialLink[] = [];

  constructor(
    private authService: AuthService,
    private toastrService: NbToastrService
  ){}

  login(){
    this.loading = true;
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.authService.login(this.user).subscribe(
      next => {
        this.loading = false;
        this.toastrService.show('Success', 'Hooray!', {status: 'success', duration: 2000, destroyByClick: true, })
        console.log(next);
      },
      error => {
        this.submitted = false;
        this.loading = false;
        this.toastrService.show('Some error', 'Oh snap!', {status: 'danger', duration: 2000, destroyByClick: true, })
        console.error(error);
      }
    );

    interval(1000).subscribe(next => console.log(next));
  }
}
