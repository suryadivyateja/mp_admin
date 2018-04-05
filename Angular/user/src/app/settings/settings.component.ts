import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private title: Title ,private authService:AuthService,private router:Router) {}
user_id:string;
name:string;
last_name:string;
email:string;
designation:string;
profile_pic:string;
reason:string;
  ngOnInit() {
    this.title.setTitle('Settings - Market Place');
    $("#s-ab-you").keydown(updateChar);
    $("#s-ab-you").keyup(updateChar);
    function updateChar() {
      var cl = $("#s-ab-you").val().length;
      $("#char-now").html(cl);
    }
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          // $('#change-p-p').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
      }
    }

    $("#c-p-p").change(function () {
      readURL(this);
    });

    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    this.user_id = u.id;
    // alert(this.user_id);
    this.authService.getUser(this.user_id).subscribe(user => {
        console.log(user);
        let u = user.msg;
        this.name = u.name;
        this.last_name = u.last_name;
        this.email = u.email;
        this.designation = u.designation;
        this.profile_pic = u.profile_pic;
    })
    
  }
  open_pop(reason){
    $('.custom-order-div-back').css({'display':'block'});
    this.reason = reason;
  }
  close_pop(){
    $('.custom-order-div-back').css({'display':'none'});
  }
  delete_user(){
    let user_del ={
      UserReason:this.reason,
      user_id:this.user_id,
      first_name:this.name,
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
