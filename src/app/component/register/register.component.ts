import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Register } from 'src/app/model/register';
import { Role } from 'src/app/model/role';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };

  username:string="";
  contact:number=0;
  password:string="";
  selectedRole:string="";
  confirmPassword:string="";
  error:String="";


  roles:Role[]=[];

  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.getRole().subscribe({
      next:(response)=>{
        this.roles=response.data;
      },
      error:(err)=>{
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      }
    })
    this.username="",
    this.contact=0,
    this.password="",
    this.selectedRole="",
    this.confirmPassword=""
  }

  register(registerForm:Form):void{
    let register:Register={
      username:this.username,
      name:this.username,
      contact:this.contact,
      password:this.password,
      role:this.selectedRole
    }
    this.authService.register(register).subscribe({
      next:(response)=>{
        console.log(response.data); 
      },
      error:(err)=>{
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      }
    }) 
    this.ngOnInit();
  }
}
