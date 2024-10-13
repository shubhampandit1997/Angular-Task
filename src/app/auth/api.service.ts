import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

private BaseUrl="http://localhost:3000"

  constructor(private http:HttpClient) { }

  loginAPI(){
    return this.http.get(`${this.BaseUrl}/login`)
  }

  userListAPI(){
    return this.http.get(`${this.BaseUrl}/userlist`)
  }

  userAddAPI(data:any){
    return this.http.post(`${this.BaseUrl}/userlist`, data)
  }

  userUpdateAPI(data:any,id:any){
    return this.http.put(`${this.BaseUrl}/userlist/${id}`, data)
  }

  userDeleteAPI(id:any){
    return this.http.delete(`${this.BaseUrl}/userlist/${id}`,)
  }
}
