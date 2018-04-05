import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { GigService } from '../../services/gig.service';

@Component({
  selector: 'app-admin-manage-feedback',
  templateUrl: './admin-manage-feedback.component.html',
  styleUrls: ['./admin-manage-feedback.component.css']
})
export class AdminManageFeedbackComponent implements OnInit {

  constructor(private adminService:AdminService,private gigService:GigService) { }
reviews=[];
username;
gigTitle;
  ngOnInit() {
    this.adminService.getAllReviews().subscribe(res=>{
      this.reviews=res.msg;
      this.reviews.forEach(element=>{
        this.adminService.getUserById(element.buyer_id).subscribe(user=>{
          element.username=user.msg.name;
          console.log(element.gig_id)
          this.gigService.get_gig_byId(element.gig_id).subscribe(gig=>{
            console.log(gig)
            element.title=gig.msg.title;
            
        })
        })
      })
      console.log(this.reviews);
    })

  }
  delete_this(r){
    this.adminService.deleteReviews(r._id).subscribe(res=>{
      console.log(res);
      if(res.success===true){
        var index = this.reviews.indexOf(r);
    this.reviews.splice(index,1);
      }

    })
  }

}
