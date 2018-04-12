import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private adminService:AdminService, private validateService:ValidateService,private router:Router) { }

  ngOnInit() {

  }
  email;
  password;
login(){
  if(this.validateService.validateInput(this.email) && this.validateService.validateInput(this.password)){
    var data={
      email:this.email,
      password:this.password
    }
    this.adminService.authenticate(data).subscribe(res=>{
      if(res.success === true){
        console.log(res);
        localStorage.setItem('token',res.token);
    this.router.navigate(['/home']);
      }else{
        $('#serr').html('password incorrect')
      }
    })
  }else{
    switch (false) {
      case this.validateService.validateInput(this.email):
      $('#serr').html('Enter your Email Address')
        break;
        case this.validateService.validateInput(this.password):
      $('#serr').html('Enter your password')
        break;
    
      default:
        break;
    }
  }
}
}
