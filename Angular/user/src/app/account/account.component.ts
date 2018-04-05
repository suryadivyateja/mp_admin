import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SettingsComponent } from "../settings/settings.component";
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css','../settings/settings.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private authService: AuthService,private router:Router,private settings:SettingsComponent) { }

  UserReason:String;
  user_id:any;
  first_name:String;
  last_name:String;
  email:String;
  reason:String;

  ngOnInit() {
  }
  // open pop
  open_pop(com){
    // alert(this.UserReason);
    if(com == 'open' && this.UserReason !== '' && this.UserReason !== null && this.UserReason !== undefined){
     this.settings.open_pop(this.UserReason);
    }
    // if(com == 'close'){
    //   // $('.custom-order-div-back').css({'display':'none'});
    // }
  }
  saveUser(){
    let u = localStorage.getItem('user');
    let user = JSON.parse(u);
    this.user_id = user.id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.reason = this.UserReason;

    let user_del ={
      UserReason:this.UserReason,
      user_id:this.user_id,
      first_name:this.first_name,
      last_name:this.last_name,
      email:this.email
    }
    //  console.log(user_del);
   
    this.authService.deleteUserAcc(user_del).subscribe(res =>{
      // console.log(res);
      if(res){   
        localStorage.removeItem('user');
        localStorage.removeItem('id_token');
        this.router.navigate(['/account-deleted']);
      }
    });
  }
}
