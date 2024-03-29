import { Routes } from "@angular/router";
import { NbAuthComponent, NbRegisterComponent } from "@nebular/auth";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const AuthRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: NbAuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
]
