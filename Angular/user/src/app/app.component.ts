import { Component,OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
// Importing services
import { AuthService } from "./services/auth.service";
import { ValidateService } from "./services/validate.service";
import { GigService } from "./services/gig.service";
import { AdminService } from "./services/admin.service";
// import * as moment from "moment"
import { PLATFORM_SERVER_ID } from '@angular/common/src/platform_id';
declare var $:any;

// declare const gapi : any;
import gapi from 'gapi-client';
import * as moment from "moment";
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { element } from 'protractor';
// import { setInterval } from 'timers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private adminService:AdminService,private router:Router, private authService:AuthService, private validateService:ValidateService,private gigService:GigService) {

  }

  title = 'app';
  user_id:string;
  showDarkBack = false;
  showLoginDiv = false;
  showLogin = false;
  showSignUp = false;
  showFpSent = false;
  showFpDiv = false;
  showAuthorSignUp = false;

  // Registration values
  regRole:string;
  regName:string;
  regEmail:string;
  regPassword:string;
  regLastName:string;
  referral_code:string;
  referred_code:string;
  //Login values
  loginEmail:string;
  loginPassword:string;

  public user:object;
  public uName:string;
  profile_pic:string;
  all:string;
  rc:any;
  or:any;
  vr:any;
  lp:any;
  forgot_email:string;
  not_arr = [];
  f_not_arr = [];
  not_num = [];
  f_not_num = [];
  unread_num:number = 0;
  new_not_arr = [];
  inb_num = 0;
  inb_msg=[];
  not_ids = [];
ip:any;
  ngOnInit(){
  this.adminService.getIpAddress().subscribe(res=>{
    this.ip=res.ip
  })
// google login
    gapi.load('auth2', function () {
    
   });
   let user = localStorage.getItem('user');
   if(user == null||user==undefined||user==''){
     this.user_id='';
   }else{
     let u = JSON.parse(user);
     this.user_id = u.id;
            this.authService.getUser(this.user_id).subscribe(user => {
              console.log(user);
              this.profile_pic = user.msg.profile_pic;
              this.name = user.msg.name;
            });
        this.gigService.get_notifications(this.user_id).subscribe(not => {
           this.not_arr = not.msg;
           this.not_arr.forEach(element => {
              this.not_ids.push(element.notification_id);
             if(element.status === "not_seen"){
               this.not_num.push({
                image:element.image.replace('public',''),
                message:element.message,
                date:moment(element.date).fromNow(),
                dest:element.destination,
                status:element.status,
                link:element.link,
                not_id:element._id
               });
               this.f_not_num = this.not_num.reverse();
               this.unread_num = this.f_not_num.length;
             }       
           });          
        });

        // inbox msgs
        this.gigService.get_not_msgs(this.user_id).subscribe(inbox => {
          if(inbox.success === true){
            if(inbox.msg.length > 0){
              inbox.msg.sort((a,b) => {
                if(a.updatedon !== null && a.updatedon !== undefined && b.updatedon !== null && b.updatedon !== undefined){
                  return JSON.parse(b.updatedon) - JSON.parse(a.updatedon)
                }
              });
              inbox.msg.forEach(conv => {
                if(conv.status === 'notSeen'){
                  conv.users.forEach(user => {
                    if(user !== this.user_id){
                      this.authService.getUser(user).subscribe(sender => {
                        if(sender.success === true && sender.msg !== null){
                          let s = sender.msg;
                          let msgs = conv.msg;
                          msgs.reverse();
                          if(msgs[0].from !== this.user_id){
                            this.inb_msg.push({
                              profile_pic:s.profile_pic.replace('public',''),
                              name:s.name+" "+s.last_name,
                              msg:msgs[0].msg,
                              previous_msgs_length:msgs.length,
                              time:moment(msgs[0].time).calendar(),
                              conv_id:conv.conv_id
                            });
                            this.inb_num = this.inb_msg.length;
                          }
                        }
                      });
                    }
                  });
                }
              });
            }
          }
          this.not_trigger();
        });
      }
    }

  role(cat){
    switch (cat) {
      case 'author':
        $('#author').html('<i class="fa fa-check"></i> I am Author');
        $('#author').css({'background-color':'#8977DE'});
        $('#client').html('I am Client');
        $('#client').css({'background-color':'#999'});
        this.regRole="author";
        break;
      case 'client':
        $('#client').html('<i class="fa fa-check"></i> I am Client');
        $('#client').css({'background-color':'#8977DE'});
        $('#author').html('I am Author');
        $('#author').css({'background-color':'#999'});
        this.regRole="client";
        break;
    
      default:
        break;
    }
  }

not_trigger(){
  setInterval(()=>{
          this.gigService.get_notifications(this.user_id).subscribe(not => {
            this.not_arr = not.msg;
            this.not_arr.forEach(element => {
              if(element.status === "not_seen"){
                if(this.not_ids.includes(element.notification_id) === false){
                  this.not_ids.push(element.notification_id);
                  this.f_not_num.push({
                  image:element.image.replace('public',''),
                  message:element.message,
                  date:moment(element.date).fromNow(),
                  dest:element.destination,
                  status:element.status,
                  link:element.link,
                  not_id:element._id
                 });
                 this.f_not_num.reverse();
                 this.unread_num = this.f_not_num.length;
                }
              }else{
                if(this.not_ids.includes(element.notification_id) === true){
                  this.f_not_num.splice(element);
                  this.not_ids.splice(element.notification_id);
                  this.unread_num = this.f_not_num.length;
                }
              }       
            });          
         });
// inbox msgs 

         this.gigService.get_not_msgs(this.user_id).subscribe(inbox => {
           console.log(inbox);
           if(inbox.success === true){
             if(inbox.msg.length >0){
               inbox.msg.sort((a,b) => {
                if(a.updatedon !== null && a.updatedon !== undefined && b.updatedon !== null && b.updatedon !== undefined){
                  return JSON.parse(b.updatedon) - JSON.parse(a.updatedon)
                }
              });
              let inb_convid = [];
              this.inb_msg.forEach(inb => {
                inb_convid.push(inb.conv_id);
              });
                inbox.msg.forEach(conv => {
                  if(conv.status === 'notSeen'){
                    console.log(conv);
                   conv.users.forEach(user => {
                     if(user !== this.user_id){
                       this.authService.getUser(user).subscribe(sender => {
                         if(sender.success === true && sender.msg !== null){
                           let s = sender.msg;
                           let msgs = conv.msg;
                           msgs.reverse();
                           this.inb_msg.forEach(prev_inb_msg => {
                             if(conv.conv_id === prev_inb_msg.conv_id){
                               if(prev_inb_msg.previous_msgs_length < msgs.length){
                                 if(msgs[0].from !== this.user_id){
                                   inb_convid.push(conv.conv_id);
                                   prev_inb_msg.msg = msgs[0].msg;
                                   prev_inb_msg.time = moment(msgs[0].time).calendar();
                                 }
                               }
                             }
                           });
                           setTimeout(() => {
                             if(inb_convid.includes(conv.conv_id) === false){
                               if(msgs[0].from !== this.user_id){
                                 this.inb_msg.push({
                                  profile_pic:s.profile_pic.replace('public',''),
                                  name:s.name+" "+s.last_name,
                                  msg:msgs[0].msg,
                                  previous_msgs_length:msgs.length,
                                  time:moment(msgs[0].time).calendar(),
                                  conv_id:conv.conv_id
                                 });
                                 this.inb_num = this.inb_msg.length;
                               }
                             }
                           },0);
                         }
                       });
                     }
                   });
                 }else{
                   if(inb_convid.includes(conv.conv_id)){
                    this.inb_msg.forEach(inb => {
                      if(inb.conv_id === conv.conv_id){
                        this.inb_msg.splice(this.inb_msg.indexOf(inb),1);
                        inb_convid.splice(conv.conv_id,1);
                        this.inb_num = this.inb_msg.length;
                      }
                    })
                   }
                 }
               });
             }
           }
         });
         },8000);
    }
 error_pop(msg){
  $('.app-pop').css({'display':'block'});
  $('.app-msg').html('<i class="fa fa-exclamation-circle" style="color:red;"></i>'+'&nbsp;'+msg.text);
    setTimeout(() => {
      $('.app-pop').css({'display':'none'});
    },1000);
 }
activate_enter(event){
  if(event.keyCode == 13){
    this.LoginSubmit();
  }
}
activate_signup(event){
  if(event.keyCode == 13){
    this.SignUp();
  }
}
  showBackLogin(bool){ 
    this.showDarkBack = bool;
    this.showLoginDiv = bool;
    this.showSignUp = !bool;
    this.showFpSent = !bool;
    this.showFpDiv = !bool;
    this.showLogin = bool;
  }
  showBackSignUp(bool){
    this.showDarkBack = bool;
    this.showLoginDiv = bool;
    this.showLogin = !bool;
    this.showFpSent = !bool;
    this.showFpDiv = !bool;
    this.showSignUp = bool;
  }
  showFp(bool){
    this.showDarkBack = bool;
    this.showLoginDiv = bool;
    this.showLogin = !bool;
    this.showFpSent = !bool;
    this.showFpDiv = bool;
    this.showSignUp = !bool;
  }
  showSentfp(bool){
    if(this.validateService.validateInput(this.forgot_email)){
      if(this.validateService.validateEmail(this.forgot_email)){
                this.authService.forgot({email:this.forgot_email}).subscribe(data => {
                  console.log(data.email);
                })
              }
            }
              }
  closeShowBack(bool){
    this.showDarkBack = !bool;
    this.showLoginDiv = !bool;
    this.showLogin = !bool;
    this.showSignUp = !bool;
    this.showFpSent = !bool;
    this.showFpDiv = !bool;
    this.showAuthorSignUp = !bool;
  }
name;
  googleSignup() {
    let googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.then(() => {
       googleAuth.signIn({scope: 'profile email'}).then(googleUser => {
        var profile = googleUser.getBasicProfile();
        // console.log('ID: ' + profile.getId()); 
        // console.log('Name: ' + profile.getName().split(" "));
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail()); 
          this.name = profile.getName().split(" ");         
          this.regName = this.name[0];       
          this.regEmail = profile.getEmail()               
       });
    });
 }

  SignUp(){
    let newUser = {
      name:this.regName,
      last_name:this.regLastName,
      email : this.regEmail,
      pay_pal : this.regEmail,
      password : this.regPassword,
      date:moment(),
      referred_code:this.referral_code,
      referral_code:this.regName.substr(0,5) +'-'+ Math.floor(Math.random() * 10000),
      ipAddress:this.ip,
    };
    
    // Validate
    if(this.validateService.validateInput(this.regName) &&  this.validateService.validateInput(this.regLastName) && this.validateService.validateInput(this.regEmail) && this.validateService.validateInput(this.regPassword)){
      
      if(this.validateService.validateEmail(this.regEmail)){

        this.authService.authenticateEmail(this.regEmail).subscribe(res => {
           if(res.success == true){
             $('#serr').html('Email alredy exists');
           }else{
             // send the above values to backed for registration
             this.authService.registerUser(newUser).subscribe(res=>{
               console.log(res);
               if(res.success){
                   this.loginEmail = this.regEmail;
                   this.loginPassword = this.regPassword;
     
                   this.LoginSubmit();
                   window.location.reload();
                 }else{
                   console.log(res.msg);
                  $('#serr').html('Registration Failed !!');
               }
             });
           }
        })        
      }else{
          $('#serr').html('Please enter a valid email');
      }

    }else{
      switch (false) {
        case this.validateService.validateInput(this.regName):         
          $('#serr').html('Name required');
          break;         
          case this.validateService.validateInput(this.regEmail):         
          $('#serr').html('Email required');
          break;
          case this.validateService.validateInput(this.regPassword):         
          $('#serr').html('Password required');
          break;
      
        default:
          break;
      }      
    }
       
  }

  
  googleLogin() {
    let googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.then(() => {
       googleAuth.signIn({scope: 'profile email'}).then(googleUser => {
        var profile = googleUser.getBasicProfile();
        // console.log('ID: ' + profile.getId()); 
        // console.log('Name: ' + profile.getName().split(" "));
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail()); 
          // this.name = profile.getName().split(" ");         
          // this.regFirstName = this.name[0];
          // this.regLastName = this.name[1];
          this.loginEmail = profile.getEmail()               
       });
    });
 }
  LoginSubmit(){
    if(this.validateService.validateInput(this.loginEmail) && this.validateService.validateInput(this.loginPassword)){

      if(this.validateService.validateEmail(this.loginEmail)){
        // email verification
        this.authService.authenticateEmail(this.loginEmail).subscribe(data =>{
          if (data.success){
            let user = {
              email :this.loginEmail,
              password: this.loginPassword
            }
            this.authService.authenticateUser(user).subscribe(dat =>{
              console.log(dat);
              if (dat.success){
                this.uName = dat.user.name;

                this.authService.storeUserData(dat.token, dat.user);
                this.closeShowBack(true);
                window.location.reload();
              }else{
                $('#login-err').html('Incorrect Password !')
              }
            })
          }else{
            $('#login-err').html('Email not found !')
            }
        })
      }else{
        switch(false){
          case this.validateService.validateEmail(this.loginEmail):
          $('#login-err').html('Please enter a valid email id')
        }
      }
    }else{
        switch(false){
          case this.validateService.validateInput(this.loginEmail):
          $('#login-err').html('Email Id cannot be left blank');
          break;
          case this.validateService.validateInput(this.loginPassword):
          $('#login-err').html('Password cannot be left blank')
          default:
          break;

        }
    }
    // if (this.validateService.validateEmail(this))
  }
Logout(){
  this.authService.logout();
  this.router.navigate(['/home']);
  window.location.reload();
  return false;
  }
  
  gotoseller(){

    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    this.user_id = u.id;
    this.router.navigate(['/seller'], { queryParams: {id:this.user_id}});
  }

  get_gigs(cat){
    switch (cat) {
      case "all":
      // this.all = 'all';
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
        case "rc":
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
        case "or":
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
        case "vr":
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
        case "lp":
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
    
      default:
        break;
    }
  }
order_id:string;
not_id:string;
destination:string;
goto_order_det(destination,order_id,not_id){
    
    this.destination = destination;
    this.not_id = not_id;
    this.order_id = order_id;
    let not = {
      not_id:this.not_id
    }
    this.gigService.change_not_status(not).subscribe(not => {
      console.log(not);
    });
    // this.unread_num--;
      switch (this.destination) {
        case "order-details":
        this.router.navigate(['/order-details'],{queryParams:{order_id:this.order_id}});
          break;
          case "gig":
          this.router.navigate(['/gig'],{queryParams:{id:this.order_id}});
        default:
          break;
      }
    
  }
  // toZero(){
  //     this.unread_num = 0;
  //     // alert("hii");
  // }
  go_to_not(){
    // alert('not');
    this.router.navigate(['/notifications']);
  }
go_to_inbox(to_id,conv_id){
  // alert(to_id+""+conv_id);
  this.router.navigate(['/inbox'],{queryParams:{seller_id:to_id,conv_id:conv_id}});
}

}