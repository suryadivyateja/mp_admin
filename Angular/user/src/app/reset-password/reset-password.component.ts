import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd,ActivatedRoute} from "@angular/router";

// Importing services
import { AuthService } from "../services/auth.service";
import { ValidateService } from "../services/validate.service";
declare var $:any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService:AuthService,private route:ActivatedRoute) { }
  token:string;
  newPassword:String;
  conformPassword:String;

  ngOnInit() {
    this.route.params.subscribe(url=>{
      console.log(url.token);
      this.token = url.token;
    });
  }
reset(){
  console.log(this.newPassword)
  var reset = {
    password:this.newPassword,
    token:this.token
  }
  if(this.newPassword===this.conformPassword){
  this.authService.reset(reset).subscribe(data=>{
  console.log(data);

  })
}
}
}
