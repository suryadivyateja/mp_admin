import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor( private adminService:AdminService) { }
  total_gigs:any=[];
  total_users:any=[];
  total_orders:any=[];
  total_orders_delivered:any=[];
  total_categories:any=[];
  custom_orders=[];


  ngOnInit() {
    //all-gigs
    this.adminService.get_all_gigs().subscribe(res=>{
     this.total_gigs=res.msg;
     console.log(this.total_gigs)
    })
    this.adminService.get_all_users().subscribe(res=>{
      this.total_users=res.msg;
      this.total_users.reverse().slice(0,10);
    })
    this.adminService.getCustomOrders().subscribe(res=>{
      this.custom_orders=res.msg;
    })
    this.adminService.get_all_orders().subscribe(res=>{
      this.total_orders=res.msg;
      this.total_orders.forEach(element => {
        if(element.order_status === 'Order Delivered'){
          this.total_orders_delivered.push(element);

        }
        console.log(this.total_orders_delivered);
        
      });
      
    })
    this.adminService.getCategory().subscribe(res=>{
      this.total_categories=res.msg;

    })

  }

}
