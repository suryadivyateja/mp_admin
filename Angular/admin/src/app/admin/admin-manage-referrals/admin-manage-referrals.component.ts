import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AdminService } from "../../services/admin.service";
import * as moment from 'moment';

@Component({
  selector: 'app-admin-manage-referrals',
  templateUrl: './admin-manage-referrals.component.html',
  styleUrls: ['./admin-manage-referrals.component.css']
})

export class AdminManageReferralsComponent implements OnInit {

  constructor(private adminService:AdminService,private authService:AuthService) { }
users=[];
  ngOnInit() {
    this.adminService.get_all_users().subscribe(res=>{
      res.msg.forEach(element=>{
        if(element.referred_code !== undefined){
          element.username=element.name;
        element.formatted_date= moment(element.date).format('MMM Do, YYYY');
        console.log(element.referred_code)
        this.authService.getReferredCode(element.referred_code).subscribe(data=>{
          element.referred=data.msg.name;
        });
        this.users.push(element);
        console.log(this.users);
      }
      })
      this.users.reverse();
    })
    
  }
  // delete_this(u){
  //   this.adminService.DeleteMember(u._id).subscribe(res=>{
  //     if(res.success === true){
  //       var index = this.users.indexOf(u);
  //       this.users.splice(index,1);
  //     } 
  //   })
  // }

}