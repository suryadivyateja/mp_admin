import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router , ActivatedRoute , Params } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { GigService } from "../services/gig.service";
import { ComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  constructor(private title: Title,private authService:AuthService,private gigService:GigService,private router:Router) { }
  user_id:string;
  alert:boolean;
  profile_pic:string;
  country:string;
  first_name:string;
  last_name:string;
  description:string;
  designation:string;
  name:string;
  new_not=[];
not_num:number;
  ngOnInit() {
    this.title.setTitle('Dashboard - Market Place');
    $("#dia-btn").click(function () {
      $(".diamond-dashboard").animate().show();
    });
    $("#diamond-close").click(function () {
      $(".diamond-dashboard").css({ "display": "none" });
    });

    let user = localStorage.getItem('user');
    
    let u = JSON.parse(user);
    this.user_id = u.id;


    this.authService.getUser(this.user_id).subscribe(dat => {
      console.log(dat);
      let us = dat.msg;
      if(us.country=="" || us.country==null || us.description =="" || us.description ==null || us.designation == "" || us.designation == null){
                     this.alert = true;                     
      }else{
                    this.alert = false;
      }
        this.name = us.name;
        this.country = us.country;
        this.description = us.description;
        this.designation = us.designation;
        this.profile_pic = us.profile_pic.replace('public','');
        // console.log(this.country);
    })
    this.gigService.get_notifications(this.user_id).subscribe(not=> {
      console.log(not);
      not.msg.forEach(element => {
        if(element.status =="not_seen"){
            this.new_not.push(element);
        }
      });
      this.new_not = this.new_not.reverse();
      let num = this.new_not.length;
      if(num == null || num == undefined){
        this.not_num = 0;
      }else{
        this.not_num = num;
      }
    })
  }
  go_to_order(obj){
    console.log(obj);
      switch (obj.destination) {
        case 'order-details':
        this.router.navigate(['/order-details'],{queryParams:{order_id:obj.link}});
          break;
        case 'gig':
        this.router.navigate(['/gig'],{queryParams:{id:obj.link}});
          break;
      
        default:
          break;
      }
      let not = {
        not_id:obj._id
      }
      this.gigService.change_not_status(not).subscribe(not => {
        console.log(not);
      });
  }
}
