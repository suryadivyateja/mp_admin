import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import { setTimeout } from 'timers';
declare var $:any;
@Component({
  selector: 'app-admin-manage-categories',
  templateUrl: './admin-manage-categories.component.html',
  styleUrls: ['./admin-manage-categories.component.css']
})
export class AdminManageCategoriesComponent implements OnInit {

  constructor(private adminService:AdminService) { }
  categories=[];
  selected_cat;
  sub_categories=[];

  ngOnInit() {
    console.log("ip");
    this.adminService.getIpAddress().subscribe(data => {
      // console.log(data);
    });
    this.adminService.getSubCategory().subscribe(res=>{
      console.log(res)
      this.categories=res.msg;
      
    })
  }
delete_this(cat){
this.adminService.DeleteSubCategory(cat._id).subscribe(res=>{
  console.log(res)
  if(res.success===true){
    var index = this.categories.indexOf(cat);
this.categories.splice(index,1);
  $('#serr').html('<i class="fa fa-check"></i> category deleted successfully')
        .css({"padding":"8px","margin-bottom":"10px","display":"block"});

setTimeout(()=>{
  $('#serr').css('display','none')
},2000);
  }
})


  }

}
