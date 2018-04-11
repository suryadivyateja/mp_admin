import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import { ValidateService } from '../../services/validate.service';


declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  constructor(private adminService:AdminService,private validateService:ValidateService) { }
  category_name:String;
  sub_category_name:String;
  desc:String;
  seo:String;
  page_title_name:String;
  meta_desc:String;
  meta_key:String;

  ngOnInit() {
  }

submit_this(){
  
  var data={
    category_name: this.category_name,
    description: this.desc,
    seo_name: this.seo,
    page_title: this.page_title_name,
    meta_description: this.meta_desc,
    meta_keywords: this.meta_key
  }
  if(this.validateService.validateInput(this.category_name)){
    this.adminService.postCategory(data).subscribe(res=>{
      if(res.success === false){
        $('#serr').html('category_name is already exists');
      }else if(res.success === true){
          console.log(res);
          window.location.reload();
      }
    })
  }else{
    switch(false){
      case this.validateService.validateInput(this.category_name):
      $('#serr').html('Please Enter the category_name');
      break;

      default:
      break;
    }
  }
  }
  
}
