
import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {AuthService} from '../../services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-manage-orders',
  templateUrl: './admin-manage-orders.component.html',
  styleUrls: ['./admin-manage-orders.component.css']
})
export class AdminManageOrdersComponent implements OnInit {

  constructor(private adminService:AdminService,private authService:AuthService) { }
  orders=[];


  ngOnInit() {
    this.adminService.getOrders().subscribe(res=>{
      this.orders=res.msg;
      console.log(this.orders);
      this.orders.forEach(element=>{
     element.formatted_date= moment(element.date).format('MMM Do, YYYY');
     this.authService.getUser(element.buyer_id).subscribe(user_det=>{
      console.log(user_det) 
      if(user_det.success===true){
      element.buyer_name=user_det.msg.name;
      }
    })
     })
    })
}
}
