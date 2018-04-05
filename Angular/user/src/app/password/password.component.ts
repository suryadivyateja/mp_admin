import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { setTimeout } from 'timers';
declare var $:any;
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css','../settings/settings.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private authService:AuthService, private validate:ValidateService) { }

  currentPassword:any;
  newPassword:any;
  conformPassword:any;
  user_id:any;
  email:String;
  ngOnInit() {


  }
  update_pass(event){
    if(event.keyCode == 13){
      this.changePassword();
    }
  }
  
  changePassword(){
    let u = localStorage.getItem('user');
    let user = JSON.parse(u);
    this.user_id = user.id;
    this.email = user.email;

    if(this.validate.validateInput(this.currentPassword) && this.validate.validateInput(this.newPassword) && this.validate.validateInput(this.conformPassword)){
      if(this.newPassword == this.conformPassword){
            let user_det = {
              user_id:this.user_id,
              password:this.currentPassword,
              newPassword:this.newPassword
            }    
            // console.log(user_det);
                this.authService.authPassword(user_det).subscribe(res =>{
                  console.log(res);
                  if(res.success){
                    $('.set').css({'display':'block'});
                    setTimeout(() => {                      
                      $('.set').css({'display':'none'});
                    }, 1000);
                  }
                });
            }else{
            alert("new password must match with conform password");
          }
        }else{ 
          alert("cannot be left blank");
        }
      }
}
