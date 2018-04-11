import { Component, OnInit } from '@angular/core';
import {GigService} from '../../services/gig.service';

import {AuthService} from '../../services/auth.service';
import * as moment from 'moment';
import { AdminService } from '../../services/admin.service';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-admin-manage-gigs',
  templateUrl: './admin-manage-gigs.component.html',
  styleUrls: ['./admin-manage-gigs.component.css']
})
export class AdminManageGigsComponent implements OnInit {

  constructor(private adminService:AdminService,private gigService:GigService,private authService:AuthService) { }
gigs=[];
  ngOnInit() {
   this.adminService.get_all_gigs().subscribe(res=>{
     console.log(res);
     this.gigs=res.msg;
     this.gigs.forEach(element => {
       element.formatted_date=moment(element.data).format('MMM Do, YYYY');
     });
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
