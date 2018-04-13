import { Component, OnInit } from '@angular/core';
import {GigService} from '../../services/gig.service';
import {AuthService} from '../../services/auth.service';
import {AdminService} from '../../services/admin.service';
import * as moment from 'moment';
import { ValidateService } from '../../services/validate.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-admin-fake-feedback',
  templateUrl: './admin-fake-feedback.component.html',
  styleUrls: ['./admin-fake-feedback.component.css']
})
export class AdminFakeFeedbackComponent implements OnInit {

  constructor(private validateService:ValidateService,private authService:AuthService,private adminService:AdminService,private gigService:GigService) { }
users=[];
gigs=[];
selected_user;
selected_gig;
selected_rating;
user_id;
gig_id;
selected_review;
  ngOnInit() {
    this.adminService.get_all_users().subscribe(res=>{
      this.users =res.msg;
    });
    this.adminService.get_all_gigs().subscribe(res=>{
      this.gigs = res.msg;
    })
  }
  edit_this(){
    if(this.validateService.validateInput(this.selected_gig) && this.validateService.validateInput(this.selected_rating) && this.validateService.validateInput(this.selected_review) && this.validateService.validateInput(this.selected_user)){
    this.adminService.getUserByName(this.selected_user).subscribe(user=>{
      console.log(user);
    this.user_id=user.msg[0]._id;
      console.log(this.user_id);
      
    
    this.adminService.getGigByTitle(this.selected_gig).subscribe(gig=>{
      console.log(gig);
      this.gig_id=gig.msg[0]._id;
      console.log(this.gig_id);

    var data={
      buyer_id:this.user_id,
      gig_id:this.gig_id,
      score:this.selected_rating,
      review:this.selected_review
    };
    console.log(data);
    this.gigService.post_review(data).subscribe(re=>{
      if(re.success === true){
        $('#message').html('<i class="fa fa-check"></i> feedback added successfully')
          .css({"padding":"8px","margin-bottom":"10px","display":"block"});
  
  setTimeout(()=>{
    $('#message').css('display','none')
  },2000);
  $('#serr').css("display","none");
            this.selected_gig='';
            this.selected_user='';
            this.selected_rating='';
            this.selected_review='';
      }
})
    })
})
  }else{
    switch(false){
      case this.validateService.validateInput(this.selected_gig):
      $('#serr').html('<i class="fa fa-times-circle"></i> please select gig')
      .css({"padding":"8px","margin-bottom":"10px","display":"block"});
      break;
      case this.validateService.validateInput(this.selected_user):
      $('#serr').html('<i class="fa fa-times-circle"></i> please select user')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});
      break;
     case this.validateService.validateInput(this.selected_rating):
     $('#serr').html('<i class="fa fa-times-circle"></i> please select rating')
     .css({"padding":"8px","margin-bottom":"10px","display":"block"});
      break;
      case this.validateService.validateInput(this.selected_review):
      $('#serr').html('<i class="fa fa-times-circle"></i> please enter review')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});
      break;
    }
  }
}
}
