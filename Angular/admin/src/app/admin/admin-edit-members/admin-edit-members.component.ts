import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router,ActivatedRoute} from '@angular/router';
import { ValidateService } from '../../services/validate.service';
declare var $:any;
@Component({
  selector: 'app-admin-edit-members',
  templateUrl: './admin-edit-members.component.html',
  styleUrls: ['./admin-edit-members.component.css']
})
export class AdminEditMembersComponent implements OnInit {

  constructor(private validateService:ValidateService,private adminService:AdminService,private route:ActivatedRoute) { }
  ipAddress:any;
  user_id;
name:String;
last_name:String;
email:String;
pay_pal:String;
description:String;
designation:String;
date:String;
member_id;
  ngOnInit() {
    this.route.params.subscribe(d=>{
      this.user_id = d.id;
     })
    this.adminService.getIpAddress().subscribe(res=>{
      console.log(res);
      this.ipAddress=res.ip;
    console.log(this.ipAddress);
    })
    this.adminService.getUserById(this.user_id).subscribe(res=>{
      console.log(res)
      this.name=res.msg.name;
      this.last_name=res.msg.last_name;
      this.email=res.msg.email;
      this.pay_pal=res.msg.pay_pal;
      this.description=res.msg.description;
      this.designation=res.msg.designation;
      this.date=res.msg.date;
      this.member_id=res.msg._id;
    })
  }
  submit_this(){
    console.log('cnefmur')
    if(this.validateService.validateInput(this.name) && this.validateService.validateInput(this.last_name) && this.validateService.validateInput(this.email)){
    var data={
      name:this.name,
      last_name:this.last_name,
      email:this.email,
      pay_pal:this.pay_pal,
      description:this.description,
      designation:this.designation,
      date:this.date,
      id:this.user_id

    };
    this.adminService.update_user(data).subscribe(res=>{
      // console.log(res)
      if(res.success === true){
        $('#message').html('<i class="fa fa-check"></i> Edited member successfully')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});

setTimeout(()=>{
  $('#message').css('display','none')
},2000);
$('#serr').css("display","none");

      }

    })
  }else{
    switch (false) {
      case this.validateService.validateInput(this.name):
      $('#serr').html('<i class="fa fa-times-circle"></i> please enter first name')
      .css({"padding":"8px","margin-bottom":"10px","display":"block"});
        break;
        case this.validateService.validateInput(this.last_name):
      $('#serr').html('<i class="fa fa-times-circle"></i> please enter last name')
      .css({"padding":"8px","margin-bottom":"10px","display":"block"});
        break;
        case this.validateService.validateInput(this.email):
      $('#serr').html('<i class="fa fa-times-circle"></i> please enter email address')
      .css({"padding":"8px","margin-bottom":"10px","display":"block"});
        break;
      default:
        break;
    }
  }
}

}
