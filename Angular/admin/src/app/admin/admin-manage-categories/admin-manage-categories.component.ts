import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
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

  }
})


  }

}
