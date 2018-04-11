import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import { ValidateService } from '../../services/validate.service';
import { element } from 'protractor';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-admin-add-sub-category',
  templateUrl: './admin-add-sub-category.component.html',
  styleUrls: ['./admin-add-sub-category.component.css']
})
export class AdminAddSubCategoryComponent implements OnInit {

  constructor(private adminService:AdminService,private validateService:ValidateService) { }
selected_cat;
categories=[];
sub_category_name;
desc;
seo;
page_title_name;
meta_desc;
meta_key;
sub_categories=[];
  ngOnInit() {
    this.adminService.getCategory().subscribe(res=>{
      this.categories=res.msg;
    })
  }
  submit_this(){
    var data = {
      sub_category_name:this.sub_category_name,
      category_name:this.selected_cat,
      description: this.desc,
      seo_name: this.seo,
      page_title: this.page_title_name,
      meta_description: this.meta_desc,
      meta_keywords: this.meta_key
    }
 
    if(this.validateService.validateInput(this.sub_category_name) && this.validateService.validateInput(this.selected_cat) ){
      this.adminService.postSubCategory(data).subscribe(res=>{
        if(res.success === false){
          $('#serr').html('sub_category_name is already exists');
        }else if(res.success === true){
            console.log(res);
            window.location.reload();
        }
      })
    }else{
      switch(false){
        case this.validateService.validateInput(this.selected_cat):
        $('#serr').html('Please Select the category_name');
        break;
        case this.validateService.validateInput(this.sub_category_name):
        $('#serr').html('Please Enter the sub_category_name');
        break;
  
        default:
        break;
      }
    }
   
  }
  

}
