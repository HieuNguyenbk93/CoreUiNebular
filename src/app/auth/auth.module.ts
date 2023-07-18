import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbSpinnerModule, NbToastrModule } from '@nebular/theme';
import { AuthRoutes } from './auth.routing';
import { NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { AppSetting } from '../constant/app-setting';
import { ApiAuthen } from '../constant/apiAuthen';
import { RegisterComponent } from './register/register.component';

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbCardModule,
    NbToastrModule.forRoot(),

    RouterModule.forChild(AuthRoutes),
    // NbAuthModule.forRoot({
    //   strategies: [
    //     NbPasswordAuthStrategy.setup({
    //       name: 'email',
    //     }),
    //   ],
    //   forms: {
    //     login: formSetting,
    //   },
    // }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: AppSetting.HostingAddress,
          login:{
            endpoint: ApiAuthen.Login,
            method: 'post'
          },
          register: {
            endpoint: ApiAuthen.Register,
            method: 'post'
          }
        }),
      ],
      forms: {
        login: formSetting,
      }
    }),
  ]
})
export class AuthModule { }
