import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
declare var $:any;
@Component({
  selector: 'app-admin-order-files',
  templateUrl: './admin-order-files.component.html',
  styleUrls: ['./admin-order-files.component.css']
})
export class AdminOrderFilesComponent implements OnInit {

  constructor(private adminService:AdminService) { }
order_files=[];
  ngOnInit() {
    this.adminService.get_all_orders().subscribe(res=>{
         res.msg.forEach(element => {
           if(element.gig_img !== 'not specified'){
             this.order_files.push(element);
           }
  
          }); 
    })
  }
  delete_this(o){
    this.adminService.delete_order_file({id:o._id}).subscribe(res=>{
      if(res.success === true){
        $('#serr').html('<i class="fa fa-check"></i> order image deleted successfully')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});

setTimeout(()=>{
  $('#serr').css('display','none')
},1000);
        var index = this.order_files.indexOf(o);
        this.order_files.splice(index,1);
      }
    })
  }

}
