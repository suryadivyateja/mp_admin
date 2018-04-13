
import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {AuthService} from '../../services/auth.service';
import * as moment from 'moment';
import { ValidateService } from '../../services/validate.service';
declare var $:any;
@Component({
  selector: 'app-admin-manage-orders',
  templateUrl: './admin-manage-orders.component.html',
  styleUrls: ['./admin-manage-orders.component.css']
})
export class AdminManageOrdersComponent implements OnInit {

  constructor(private validateService:ValidateService, private adminService:AdminService,private authService:AuthService) { }
  orders=[];


  ngOnInit() {
    this.adminService.getOrders().subscribe(res=>{
      this.orders=res.msg;
      console.log(this.orders);
      this.orders.forEach(element=>{
        if(element.accepted_date !== null && element.accepted_date !== undefined){
       if(moment(element.accepted_date).add(element.assigned_days,'days').isSameOrAfter(moment())){
         element.order_status=element.order_status;
       }else{
         element.order_status = 'Late Delivery'
       }
      }
     element.formatted_date= moment(element.date).format('MMM Do, YYYY');
    })
    this.orders.reverse();
    })
}
cancel_this(o){
  console.log(o)
  if(o.order_status !== 'Order Cancelled' && o.order_status !== 'Order Delivered'){
    console.log(o._id)
    this.adminService.cancel_order({id:o._id}).subscribe(res=>{
      if(res.success === true){
        o.order_status='Order Cancelled';
        $('#serr').html('<i class="fa fa-check"></i> order cancelled successfully')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});

setTimeout(()=>{
  $('#serr').css('display','none')
},2000);
  
      }
    })
  }

}
}
