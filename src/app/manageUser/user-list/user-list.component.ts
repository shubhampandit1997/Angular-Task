import { Component } from '@angular/core';
import { ApiService } from '../../auth/api.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  userAddFrom: FormGroup
  userUpdateFrom!: FormGroup;
  data: any;
  submitted = false
  editId: any;
  searchTerm:string=""
  constructor(private api: ApiService, private fb: FormBuilder, private router:Router) {
    this.userAddFrom = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      number: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      image: ['', [Validators.required]]

    })
    this.userUpdateFrom = this.fb.group({
      id: '',
      name: [''],
      email: [''],
      number: [''],
      gender: [''],
      address: [''],
      image: ['']

    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userAddFrom.controls;
  }

  "gender" = [{
    name: "male",
  }, {
    name: "female"
  }
  ]
  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this.api.userListAPI().subscribe((res: any) => {
      this.data = res
    })
  }

  submit() {
    this.submitted = true
    if (this.userAddFrom.invalid) {
      return
    }
    this.userAddFrom.value.image = this.img
    this.api.userAddAPI(this.userAddFrom.value).subscribe((res: any) => {
      window.location.reload()

    })
  }

  updateUser(data: any) {
    this.userUpdateFrom.value.id = this.editId
    this.api.userUpdateAPI(this.userUpdateFrom.value, data.id).subscribe((res: any) => {
      window.location.reload()
    })
  }

  deleteUser(data: any) {
    this.api.userDeleteAPI(data.id).subscribe((res: any) => {

    })
  }

  img: any

  uploadImage(event: any) {
    let file = event.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.img = reader.result
      console.log(this.img);
      

    }
  }

  edit(data: any) {
    debugger
    this.editId = data.id
    this.userUpdateFrom.get('name')?.setValue(data.name);
    this.userUpdateFrom.get('email')?.setValue(data.email);
    this.userUpdateFrom.get('number')?.setValue(data.number);
    this.userUpdateFrom.get('gender')?.setValue(data.gender);
    this.userUpdateFrom.get('address')?.setValue(data.address);
    this.userUpdateFrom.get('image')?.setValue(data.image);

  }

  get filteredItems() {
    return this.data.filter((item:any) => 
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}


