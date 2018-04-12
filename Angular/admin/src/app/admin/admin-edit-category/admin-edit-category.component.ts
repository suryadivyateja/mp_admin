import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import{Router,ActivatedRoute} from '@angular/router';
import { ValidateService } from '../../services/validate.service';

declare var $:any;
@Component({
  selector: 'app-admin-edit-category',
  templateUrl: './admin-edit-category.component.html',
  styleUrls: ['./admin-edit-category.component.css']
})
export class AdminEditCategoryComponent implements OnInit {

  constructor(private validateService:ValidateService,private adminService:AdminService,private route:ActivatedRoute ) { }
  category:String;
  sub_category_name:String;
  desc:String;
  seo:String;
  page_title_name:String;
  meta_desc:String;
  meta_key:String;
  category_id:any;
  categories=[];
  selected_cat;
  cat=[];


  ngOnInit() {
    this.route.params.subscribe(d=>{
      this.category_id = d.id;
     })
     this.adminService.getCategory().subscribe(res=>{
       this.cat=res.msg;
     })

    this.adminService.getSubCategoryById(this.category_id).subscribe(res=>{
      console.log(res);
     this.sub_category_name=res.msg[0].sub_category_name;
     this.selected_cat=res.msg[0].category_name;
      this.desc=res.msg[0].description;
      this.seo=res.msg[0].seo_name;
      this.page_title_name=res.msg[0].page_title;
      this.meta_desc=res.msg[0].meta_description;
      this.meta_key=res.msg[0].meta_keywords;
    })
    

    this.adminService.getSubCategory().subscribe(res=>{
      console.log(res);
      this.categories=res.msg;
    })
  }
    edit_this(){
      if(this.validateService.validateInput(this.sub_category_name)){
      var obj={
        category_name: this.selected_cat,
        sub_category_name: this.sub_category_name,
        description: this.desc,
        seo_name: this.seo,
        page_title: this.page_title_name,
        meta_description: this.meta_desc,
        meta_keywords: this.meta_key,
        id:this.category_id
      }
      this.adminService.editSubCategory(obj).subscribe(res=>{
        console.log(res);
      })
      window.location.reload();

    }else{
      $('#serr').html('please enter sub_category name');
    }
  }


}
