import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AdminService } from "../../services/admin.service";
import * as moment from 'moment';

@Component({
  selector: 'app-admin-validate-referrals',
  templateUrl: './admin-validate-referrals.component.html',
  styleUrls: ['./admin-validate-referrals.component.css']
})

export class AdminValidateReferralsComponent implements OnInit {

  constructor(private adminService:AdminService,private authService:AuthService) { }
users=[];
ipAddress:any;
  ngOnInit() {
    this.adminService.get_all_users().subscribe(res=>{
      console.log(res)
      res.msg.forEach(element=>{
        if(element.referred_code !== undefined && element.referral_balance === undefined && element.referral_status === 'Awaiting Approval' ){
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
  add(u){
    var user_id={
      user_id:u._id
    }
    this.adminService.addReferralBalance(user_id).subscribe(res=>{
      if(res.success === true){
        var index = this.users.indexOf(u);
    this.users.splice(index,1);
      }
    })
  }
  delete_this(u){
    var user_id={
      user_id:u._id
    }
    this.adminService.deleteReferral(user_id).subscribe(res=>{
      if(res.success === true){
        var index = this.users.indexOf(u);
    this.users.splice(index,1);
      }
    })
  }

}

