import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-admin-manage-custom-request',
  templateUrl: './admin-manage-custom-request.component.html',
  styleUrls: ['./admin-manage-custom-request.component.css']
})
export class AdminManageCustomRequestComponent implements OnInit {

  constructor(private adminService:AdminService) { }
custom_orders=[];
  ngOnInit() {
    this.adminService.getCustomOrders().subscribe(res=>{
      this.custom_orders=res.msg;
      console.log(this.custom_orders);
      this.custom_orders.forEach(element=>{
        this.adminService.getUserById(element.buyer_id).subscribe(user=>{
          element.username=user.msg.name;
    })
  })
})
}
    delete_this(cat){
      this.adminService.DeleteCustomOrder(cat._id).subscribe(res=>{
        console.log(res)
        if(res.success===true){
          var index = this.custom_orders.indexOf(cat);
      this.custom_orders.splice(index,1);
      
        }
      })
      
      
        }

}
