import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '@auth0/auth0-angular'


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router:Router,public auth:AuthService) { }

  getvalid!:any
  userdata!:any
  massage!:boolean;
  avaemail!:boolean;
  islogin!:boolean;
  p:any;
  logindata:any;
  succsessful!:boolean;
  
  ngOnInit(): void {
  }
  // getreload(){
  //   window.location.reload();
  //   this.router.navigate(['/home']);
  // }

  // onlogin(loginform:NgForm){
  //   console.log(loginform.value);
  //   this.userdata=loginform.value;
  //   this.auth.passlogindata(this.userdata).subscribe(res=>{
  //     this.logindata=res;
      
      
      
      
  //     if(this.logindata[0].islogin){
  //       this.islogin=this.logindata[0].islogin;
  //       console.log("in if statement")
  //       this.router.navigate(['/profile']);
        
        
  //     }
  //     else{
  //       this.islogin=false;
  //       this.massage=true;
  //     }
      
  //   });
  //   // this.auth.islogin().subscribe(res=>{
  //   //   this.logindata=res;
  //   //   console.log(this.logindata.islogin);
  //   // })
  // }
  // onlogout(){
  //   console.log(this.logindata);
  //   this.auth.updateislogin(this.logindata).subscribe(res=>{
  //     this.logindata=res;
  //     if(this.logindata[0].islogin){
  //       this.islogin=this.logindata[0].islogin;
  //     }
  //     else{
  //       this.islogin=false;
  //       this.massage=true;
  //     }
  //   })

  // }
  // onsignup(signup:NgForm){
    
  //   this.getvalid=signup.value;
  //   if(this.getvalid.password==this.getvalid.repassword){
  //     this.massage=false;
  //     this.userdata=signup.value;
  //     console.log('password match');
  //     console.log(signup.value);
  //     this.auth.passuserdata(this.userdata).subscribe(res=>{
  //       this.avaemail=res;
  //       if(this.avaemail){
  //         this.succsessful=false;
  //       }
  //       else{
  //         this.succsessful=true;
  //       }
  //     })
  //     // this.router.navigate(['/home']);
      
      
  //   }
  //   else{
  //     this.massage=true;
  //   }
    
  // }



  onlogin():void{
    this.auth.loginWithRedirect();
  }
  
  onlogout(){
    this.auth.logout();
  }
}
