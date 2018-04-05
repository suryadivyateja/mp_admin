import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-admin-edit-members',
  templateUrl: './admin-edit-members.component.html',
  styleUrls: ['./admin-edit-members.component.css']
})
export class AdminEditMembersComponent implements OnInit {

  constructor(private adminService:AdminService,private route:ActivatedRoute) { }
  ipAddress:any;
  user_id;
name:String;
last_name:String;
email:String;
pay_pal:String;
description:String;
designation:String;
date:String;
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
    })
  }
  submit_this(){
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
      console.log(res);

    })
  }

}
