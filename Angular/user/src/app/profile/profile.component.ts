import { Component, OnInit, ElementRef } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ValidateService} from '../services/validate.service';
declare var $:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css','../settings/settings.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private validateService: ValidateService,private element:ElementRef){}

 user_name:string;
 user_last_name:string;
  user_email:string;
  user_designation:string;
  user_skills:string;
  user_address:string;
  user_city:string;
  user_country:string;
  user_description:string;
  user_img: string;
  user:object;
  user_id:any;
  files:any;
  file:any;
  profile_pic:string;
  // profile-pic:any;
  // user_image:any;

  ngOnInit() {

    $('#change-p-p-temp').hide();
    // // this.first_name = 'Bhargav';
    let u = localStorage.getItem('user');

    let user = JSON.parse(u);
    // console.log(user);
  let user_id = user.id;
  this.user_id = user_id;
  // alert(user_id);
    this.authService.getUser(user_id).subscribe(data => {
      if(data.success){
        console.log(data);
        let us = data.msg;
        this.user_name = us.name;
        this.user_last_name = us.last_name;
        this.user_email = us.email;
        if(us.designation === undefined || us.designation === null){
          this.user_designation = '';
        }else{
          this.user_designation = us.designation;
        }
        if(us.skills === undefined || us.skills === null){
          this.user_skills = '';
        }else{
          this.user_skills = us.skills;
        }
        if(us.address === undefined || us.address === null){
          this.user_address = '';
        }else{
          this.user_address = us.address;
        }
        if(us.city === undefined || us.city === null){
          this.user_city = '';
        }else{
          this.user_city = us.city;
        }
        if(us.country === undefined || us.country === null){
          this.user_country = '';
        }else{
          this.user_country = us.country;
        }
        if(us.description === undefined || us.description === null){
          this.user_description ='';
        }else{
          this.user_description = us.description;
        }
        this.profile_pic = us.profile_pic;
        this.user_img = us.profile_pic;
      }
    });
  }

  
    url:any;   
    fileChange(input) {

     this.files = input.target.files[0];
     console.log(this.files);
      if (input.target.files && input.target.files['0']) {
          var reader = new FileReader();
          reader.onload = function (e) {
              $('#change-p-p').attr('src', e.target['result']);
          };
          reader.readAsDataURL(input.target.files['0']);
      }
  }

  saveUser(){     

    let formData = new FormData();  
    if(this.files == undefined || this.files == null || this.files ==''){
      this.files = this.profile_pic;
    }else{
      this.files = this.files;      
    }
    console.log(this.files);
  let user_id = this.user_id;
  let name = this.user_name;
  let last_name = this.user_last_name;
  let user_email = this.user_email;
  let user_country = this.user_country;
  let user_description = this.user_description;

  formData.append('file',this.files);
  formData.append('user_id',user_id);
  formData.append('name',name);
  formData.append('last_name',last_name);
  formData.append('user_email',user_email);
  formData.append('user_designation',this.user_designation);
  formData.append('user_country',user_country);
  formData.append('user_description',user_description);

  if(this.validateService.validateEmail(this.user_email) && this.validateService.validateInput(this.user_name)){
    if(this.authService.authenticateEmail(this.user_email)){

      this.authService.authUpdateUser(formData).subscribe(dat => {
        console.log(dat);
        this.profile_pic = dat.msg.profile_pic;
        if(dat.success){
          $('.set').css({'display':'block'});
          setTimeout(() => {                      
            $('.set').css({'display':'none'});
          }, 1000);
        }

          })
    }else{
      alert('one');
    }
  }else{
    alert('two');
  }
}

}


