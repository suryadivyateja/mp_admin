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
