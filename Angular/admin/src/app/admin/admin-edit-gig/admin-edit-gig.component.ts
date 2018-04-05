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
  ngOnInit() {
    this.route.params.subscribe(g=>{
      this.gig_id=g.id;

    })
    this.gigService.get_gig_byId(this.gig_id).subscribe(data=>{
    this.title=data.msg.title;
      this.description=data.msg.description;
      this.price=data.msg.pac_cos_sta;
      this.date=data.msg.time;
      this.user_id=data.msg.user_id;
    this.adminService.getUserById(this.user_id).subscribe(res=>{
     
      this.user_name=res.msg.name;
    })
  })
     
  

  }

}
