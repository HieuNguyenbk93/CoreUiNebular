import { Routes } from "@angular/router";
import { NbAuthComponent } from "@nebular/auth";
import { LoginComponent } from "./login/login.component";

export const AuthRoutes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  }
]
