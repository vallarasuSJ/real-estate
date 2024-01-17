import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Register } from 'src/app/model/register';
import { Role } from 'src/app/model/role';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };

  username:string="";
  contact:number| null=null;
  password:string="";
  selectedRole:string="";
  confirmPassword:string="";
  error:String="";
  userError:String="";
  
  appUsers:AppUser[]=[];
  roles:Role[]=[];

  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next:(response:AppResponse)=>{
        this.appUsers=response.data;
        console.log(this.appUsers);
      }
    })
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
    this.contact=null,
    this.password="",
    this.selectedRole="",
    this.confirmPassword=""
  }

  //register form
  register(registerForm:Form):void{
    let register:Register={
      username:this.username,
      name:this.username,
      contact:this.contact!,
      password:this.password,
      role:this.selectedRole
    }
    let existingUser:Boolean=false;
    for (let user of this.appUsers) {
      if (this.username=== user.username) {
        this.userError = 'User Already Exists';
        existingUser = true;
      }
    }
    if(existingUser==false){
    this.authService.register(register).subscribe({
      next:(response:AppResponse)=>{
        console.log(response.data); 
        alert('Registration completed successfully! You can now log in.');
        this.router.navigate(['/login']);
      },
      error:(err)=>{
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      }
    }) 
  }

  }
}
