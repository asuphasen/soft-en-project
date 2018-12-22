import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    name:string;
    address:string;
    email:string;
    password:string;

  constructor(
    private auth:AuthService
  ) { }

  ngOnInit() {
  }

  register(){
    var user={
      name:this.name,
      address:this.address,
      email:this.email,
      password:this.password
    }
    this.auth.register(user).subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
  }

}
