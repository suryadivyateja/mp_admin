import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
declare var $:any;
@Component({
  selector: 'app-admin-edit-requests',
  templateUrl: './admin-edit-requests.component.html',
  styleUrls: ['./admin-edit-requests.component.css']
})
export class AdminEditRequestsComponent implements OnInit {

  constructor(private validateService:ValidateService,private adminService:AdminService,private route:ActivatedRoute) { }
request_id;
categories =[];
users=[];
selected_user;
description;
selected_user_id;
selected_cat;
  ngOnInit() {
    this.route.params.subscribe(d=>{
      this.request_id = d.id;
     })
     this.adminService.getCategory().subscribe(res=>{
       this.categories = res.msg;
     })
     this.adminService.get_all_users().subscribe(res=>{
       this.users = res.msg;
     })
     this.adminService.getRequestById(this.request_id).subscribe(res=>{
       console.log(res);
       this.selected_user = res.msg.buyer.name;
       this.description = res.msg.order_description;

     })
  }
  submit_this(){
    this.adminService.getUserByName(this.selected_user).subscribe(res=>{
      console.log(this.selected_user);
      this.selected_user_id=res.msg[0]._id;
      console.log(this.selected_user_id);
      if(this.validateService.validateInput(this.description)){
      var data = {
        buyer_id:this.selected_user_id,
        order_description:this.description,
        category_name:this.selected_cat,
        id :this.request_id
      }
      this.adminService.editRequest(data).subscribe(res=>{
          if(res.success === true){
            $('#message').html('<i class="fa fa-check"></i> Edited request successfully')
            .css({"padding":"8px","margin-bottom":"10px","display":"block"});
    
    setTimeout(()=>{
      $('#message').css('display','none')
    },2000);
    $('#serr').css("display","none");
          }
      })
    }else{
      $('#serr').html('<i class="fa fa-times-circle"></i> please enter order description')
      .css({"padding":"8px","margin-bottom":"10px","display":"block"});
    }

    })
  }

}
