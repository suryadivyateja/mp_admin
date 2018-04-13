import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
declare var $:any;
@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css']
})
export class ManageAdminComponent implements OnInit {

  constructor(private adminService:AdminService) { }
admins=[];
  ngOnInit() {
    this.adminService.get_all_admins().subscribe(res=>{
      this.admins=res.msg;
    })
  }
delete_this(a){
  this.adminService.removeAdmin(a._id).subscribe(res=>{
    if(res.success===true){
      var index = this.admins.indexOf(a);
  this.admins.splice(index,1);
  $('#serr').html('<i class="fa fa-check"></i> administrator deleted successfully')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});

setTimeout(()=>{
  $('#serr').css('display','none')
},2000);
  
  }
})

}
}
