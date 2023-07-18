import { Injectable } from '@angular/core';
import { AppSetting } from '../constant/app-setting';
import { HttpClient } from '@angular/common/http';
import { ApiAuthen } from '../constant/apiAuthen';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = AppSetting.HostingAddress;

  constructor(
    private http: HttpClient
  ) { }

  login(loginDto: any){
    let formData = new FormData();
    formData.append('Email', loginDto.email);
    formData.append('Password', loginDto.password);
    return this.http.post<any>(this.baseUrl + ApiAuthen.Login, formData);
  }
}
