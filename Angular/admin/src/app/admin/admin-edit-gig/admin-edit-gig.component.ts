import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {GigService} from '../../services/gig.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-edit-gig',
  templateUrl: './admin-edit-gig.component.html',
  styleUrls: ['./admin-edit-gig.component.css']
})
export class AdminEditGigComponent implements OnInit {

  constructor(private route:ActivatedRoute,private adminService:AdminService,private gigService:GigService) { }
gig_id;
title;
description;
price;
user_id;
date;
user_name;
users=[];
selected_user
categories=[];
selected_cat;
selected_user_id;
rating;
selected_days;
image1;
  ngOnInit() {
    this.route.params.subscribe(g=>{
      this.gig_id=g.id;

    })
    this.adminService.getCategory().subscribe(res=>{
      this.categories=res.msg;
    })
    this.adminService.get_all_users().subscribe(res=>{
      this.users=res.msg;
    })
    this.gigService.get_gig_byId(this.gig_id).subscribe(data=>{
      console.log(data);
    this.title=data.msg.title;
      this.description=data.msg.description;
      this.price=data.msg.pac_cos_sta;
      this.date=data.msg.time;
      this.rating=data.msg.rating,
      this.selected_user=data.msg.members.name;
      this.selected_user_id=data.msg.members._id;
      this.selected_cat=data.msg.category;
      this.selected_days=data.msg.pac_del_sta;
      this.image1=data.msg.img1;
      console.log(this.selected_days)
  })
  }

  edit_this(){
    this.adminService.getUserByName(this.selected_user).subscribe(res=>{
      console.log(this.selected_user);
      this.selected_user_id=res.msg[0]._id;
      console.log(this.selected_user_id);
    
    var data={
      user_id:this.selected_user_id,
      gig_id:this.gig_id,
      category:this.selected_cat,
      title:this.title,
      description:this.description,
      pac_cos_sta:this.price,
      pac_del_sta:this.selected_days,
      rating:this.rating
    }
    this.adminService.edit_gig(data).subscribe(res=>{
      console.log(res);
    })
  })
  }


}
