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
    if(this.validateService.validateInput(this.user_name) && this.validateService.validateInput(this.password) && this.validateService.validateInput(this.email)){
      var data={
        name:this.user_name,
        email:this.email,
        password:this.password
      }
      this.adminService.add_admin(data).subscribe(res=>{
         if(res.success === true){
          $('#message').html('<i class="fa fa-check"></i> administrator added successfully')
          .css({"padding":"8px","margin-bottom":"10px","display":"block"});
  setTimeout(()=>{
    $('#message').css('display','none')
  },2000);
  $('#serr').css("display","none");
            console.log(res);
            this.email='';
            this.password='';
            this.user_name='';
        }
      })
    }else{
      switch (false) {
        case this.validateService.validateInput(this.user_name):
        $('#serr').html('<i class="fa fa-times-circle"></i> please enter user name')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});
          break;
          case this.validateService.validateInput(this.password):
          $('#serr').html('<i class="fa fa-times-circle"></i> please enter password')
          .css({"padding":"8px","margin-bottom":"10px","display":"block"});
          break;
        case this.validateService.validateInput(this.email):
        $('#serr').html('<i class="fa fa-times-circle"></i> please enter email-address')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});
          break;
          
      
        default:
          break;
      }
    }
  
  }

}
