import { Component, OnInit, ElementRef } from '@angular/core';
import {AuthService} from '../services/auth.service';
declare var $:any;
@Component({
  selector: 'app-email-notifications',
  templateUrl: './email-notifications.component.html',
  styleUrls: ['./email-notifications.component.css','../settings/settings.component.css']
})
export class EmailNotificationsComponent implements OnInit {

  constructor( private authService: AuthService ) { }
  // checked:Boolean;
  // isChecked:Boolean;
  a:boolean = false;
  b:boolean = false;
  c:boolean = false;
  d:boolean = false;
  e:boolean = false;
  f:boolean = false;
  g:boolean = false;
  h:boolean = false;
  i:boolean = false;
  j:boolean = false;
  user:object;
  user_id:any;

  ngOnInit() {

    let u = localStorage.getItem('user');
      let user = JSON.parse(u);
      this.user_id = user.id;
      // console.log(this.user_id);

      this.authService.getEmailNotificationStatus(this.user_id).subscribe(dat=>{
        // console.log(dat.msg);
         let en = dat.msg;
         this.a = en[0].a;
         this.b = en[0].b;
         this.c = en[0].c;
         this.d = en[0].d;
         this.e = en[0].e;
         this.f = en[0].f;
         this.g = en[0].g;
         this.h = en[0].h;
         this.i = en[0].i;
         this.j = en[0].j;
        //  console.log(en[0].f);      
      });

   
  } 
  
  update_email(event){
    if(event.keyCode == 13){
      this.saveUser();
    }
  }
  
  saveUser(){
    let user_checks={
      user_id : this.user_id,
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f,
      g: this.g,
      h: this.h,
      i: this.i,
      j: this.j,
    }
    console.log(user_checks);
    this.authService.updateEmailNotification(user_checks).subscribe(dat => {
           if(dat.success){
                console.log(dat);
                  $('.set').css({'display':'block'});
                  setTimeout(() => {                      
                    $('.set').css({'display':'none'});
                  }, 1000);
              }else{
                console.log(dat);
              }
    })
  }

  
  handleChange(event){
  
    
    switch (event.target.value) {
      case 'a':
      this.a = event.target.checked;
      // console.log("a is"+ this.a);
        break;
        case 'b':
        this.b = event.target.checked;
        // console.log("b is"+ this.b);
        break;
        case 'c':
        this.c = event.target.checked;
        break;
        case 'd':
        this.d = event.target.checked;
        break;
        case 'e':
        this.e = event.target.checked; 
        break;
        case 'f':
        this.f = event.target.checked; 
        break;
        case 'g':
        this.g = event.target.checked; 
        break;
        case 'h':
        this.h = event.target.checked; 
        break;
        case 'i':
        this.i = event.target.checked;  
        break;
        case 'j':
        this.j = event.target.checked; 
        break;
        default:
        break;
    }
  }

  
}
