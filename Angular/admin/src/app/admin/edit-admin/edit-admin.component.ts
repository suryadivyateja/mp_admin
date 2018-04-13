import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router,ActivatedRoute} from '@angular/router';
import { ValidateService } from '../../services/validate.service';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  constructor(private validateService:ValidateService,private adminService:AdminService,private route:ActivatedRoute) { }
admin_id;
user_name;
email;
password;
  ngOnInit() {
    this.route.params.subscribe(d=>{
      this.admin_id = d.id;
     })
     this.adminService.getAdminById(this.admin_id).subscribe(res=>{
      console.log(res)
      this.user_name=res.msg.name;
      this.email=res.msg.email;
    })
  }
  edit_this(){
    if(this.validateService.validateInput(this.user_name) && this.validateService.validateInput(this.email) && this.validateService.validateInput(this.password)){
     var data={
       name:this.user_name,
       email:this.email,
       password:this.password,
       id:this.admin_id
     }
      this.adminService.update_admin(data).subscribe(res=>{
        console.log(res);
       if(res.success === true){
        $('#message').html('<i class="fa fa-check"></i> Edited administrator successfully')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});

setTimeout(()=>{
  $('#message').css('display','none')
},2000);
$('#serr').css("display","none");
       }
     }) 
    }else{
      switch (false) {
        case this.validateService.validateInput(this.user_name):
        $('#serr').html('<i class="fa fa-times-circle"></i> please enter the  name')
      .css({"padding":"8px","margin-bottom":"10px","display":"block"});
          break;
          case this.validateService.validateInput(this.email):
          $('#serr').html('<i class="fa fa-times-circle"></i> please enter email-address')
      .css({"padding":"8px","margin-bottom":"10px","display":"block"});
            break;
            case this.validateService.validateInput(this.password):
        $('#serr').html('<i class="fa fa-times-circle"></i> please enter password')
      .css({"padding":"8px","margin-bottom":"10px","display":"block"});
          break;
      
        default:
          break;
      }
    }
  }

}
