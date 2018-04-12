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
    if(this.validateService.validateInput(this.user_name) && this.validateService.validateInput(this.email)){
     var data={
       name:this.user_name,
       email:this.email,
       id:this.admin_id
     }
      this.adminService.update_admin(data).subscribe(res=>{
       if(res.success === true){
         window.location.reload();
       }
     }) 
    }else{
      switch (false) {
        case this.validateService.validateInput(this.user_name):
        $('#serr').html('please enter the name')
          break;
          case this.validateService.validateInput(this.email):
          $('#serr').html('please enter the email')
            break;
      
        default:
          break;
      }
    }
  }

}
