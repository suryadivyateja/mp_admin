import { Component, OnInit } from '@angular/core';
import {GigService} from '../../services/gig.service';
import {AuthService} from '../../services/auth.service';
import * as moment from 'moment';
@Component({
  selector: 'app-admin-manage-gigs',
  templateUrl: './admin-manage-gigs.component.html',
  styleUrls: ['./admin-manage-gigs.component.css']
})
export class AdminManageGigsComponent implements OnInit {

  constructor(private gigService:GigService,private authService:AuthService) { }
gigs=[];
  ngOnInit() {
    this.gigService.get_all_gigs().subscribe(res=>{
      this.gigs=res.msg;
      this.gigs.forEach(element=>{
        element.formatted_date= moment(element.date).format('MMM Do, YYYY');
        this.authService.getUser(element.user_id).subscribe(user_det=>{
          console.log(user_det) 
          if(user_det.success===true){
          element.buyer_name=user_det.msg.name;
          }
      })
    })
  })
  }
  delete_this(g){
    this.gigService.delete_gig(g._id).subscribe(res=>{
      console.log(res);
      if(res.success===true){
        var index = this.gigs.indexOf(g);
    this.gigs.splice(index,1);
      }

    })
  }


}
