import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ValidateService } from '../../services/validate.service';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  constructor(private adminService:AdminService,private validateService:ValidateService) { }
email;
password;
user_name;
  ngOnInit() {
  }
  signup(){
    if(this.validateService.validateInput(this.user_name) && this.validateService.validateInput(this.email) && this.validateService.validateInput(this.password)){
      var data={
        name:this.user_name,
        email:this.email,
        password:this.password
      }
      this.adminService.add_admin(data).subscribe(res=>{
        if(res.success === true){
          window.location.reload();
        }
      })
    }else{
      switch (false) {
        case this.validateService.validateInput(this.user_name):
        $('#serr').html('Enter user_name')
          break;
        case this.validateService.validateInput(this.email):
        $('#serr').html('Enter your Email Address')
          break;
          case this.validateService.validateInput(this.password):
        $('#serr').html('Enter password')
          break;
      
        default:
          break;
      }
    }
  
  }

}
