import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'; 
import {AdminService} from '../../services/admin.service';
// import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-manage-members',
  templateUrl: './admin-manage-members.component.html',
  styleUrls: ['./admin-manage-members.component.css']
})
export class AdminManageMembersComponent implements OnInit {

  constructor(private adminService:AdminService) {
   }
  members=[];

  ngOnInit() {
    this.adminService.get_all_users().subscribe(res=>{
      this.members = res.msg;
      this.members.forEach(element=>{
        element.formatted_date= moment(element.date).format('MMM Do, YYYY');
      })
    })
  }
 
  delete_this(c){
    this.adminService.DeleteMember(c._id).subscribe(res=>{
      if(res.success===true){
        var index = this.members.indexOf(c);
    this.members.splice(index,1);
    
    }
  })
  }


}
