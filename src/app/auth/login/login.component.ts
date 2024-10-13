import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  submitted = false
  constructor(private router: Router, private api: ApiService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required], [Validators.email]],
      Password: ['', [Validators.required]]
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  ngOnInit() {

  }

  onSubmit() :void{
    this.submitted = true
    if (this.loginForm.invalid) {
      return
    }

    this.api.loginAPI().subscribe((res: any) => {
      const loginData = res.find((a: any) => {
        return a.Username === this.loginForm.value.Username && this.loginForm.value.Password
      })
      if (loginData) {        
        alert("Login Succesfull")
        localStorage.setItem("isLoggedIn", "true")
        this.loginForm.reset()
        this.router.navigate(['/mangeuser'])
      } else {
        alert('user not found')
        localStorage.setItem("isLoggedIn", "false")
      }
    }, err => {
      alert(" Something went wrong")
    })
  }
}
