import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import * as moment from 'moment';

import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service";
import { AlertPromise } from 'selenium-webdriver';
declare var $: any;

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  constructor(private title: Title , private router:Router, private activatedRoute:ActivatedRoute, private authService:AuthService,private gigServie:GigService) { }

order:string;
all_orders;
f_all_orders =[];
total_cost:number;
date:string;
dis_date=[];
gig_id:string;
user_id:string;
selected_pac:string;
first_name:string;
last_name:string;
assigned_days:number;
selected_extras:string;
total_days:number;
total_ext_days:number;
project_days:number;
pro_com_date:string;
order_date:string;
css_width:number;
f_css_width:string;
gig_title:string;
buyer_name:string;
seller_name:string;
completed=[];
inprogress =[];
cancelled=[];
all=[];
  ngOnInit() {
    this.title.setTitle('Manage Orders - Market Place');

    $("#t-close").click(function () {
      $("#thanks-div").css({ "display": "none" });
    });
    $("#completed-btn").click(function () {
      $('.index-item').removeClass('selected-index');
      $(this).addClass('selected-index');
    });
    $("#progress-btn").click(function () {
      $('.index-item').removeClass('selected-index');
      $(this).addClass('selected-index');
    });
    $("#cancelled-btn").click(function () {
      $('.index-item').removeClass('selected-index');
      $(this).addClass('selected-index');
    });
    $("#all-btn").click(function () {
      $('.index-item').removeClass('selected-index');
      $(this).addClass('selected-index');
    });

    this.order = this.activatedRoute.queryParams['_value'].order;
    
    if(this.order == 'neworder'){
      $('#thanks-div').show();
    }else{
      $('#thanks-div').hide();
    }
    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    let buyer_id = u.id;
    // console.log(buyer_id);
    this.gigServie.get_orders_buyer(buyer_id).subscribe(order => {
      this.all_orders = order.msg;
     console.log(order.msg);
    let f_css_width;
    let bar_one;
    let bar_two;
    let bar_three;

      this.all_orders.forEach(element => {    
                  
            let verf = false;
            let today = moment();
            let orderdDate = moment(element.date);
            
            if(element.order_status === "Order PLaced"){
              // f_css_width = 30+'%';
              bar_one = 100+'%';
              bar_two = 0+'%';
              bar_three = 0+'%';
              verf = true;
            }else if(element.order_status === "Order Accepted"){
              // f_css_width = 65+'%';
              bar_one = 100+'%';
              bar_two = 100+'%';
              bar_three = 0+'%';
              verf = true;
            }else if(element.order_status === "Order Delivered"){
              // f_css_width = 100+'%';
              bar_one = 100+'%';
              bar_two = 100+'%';
              bar_three = 100+'%';
              verf = true;
            }else{
              // f_css_width = 0+'%';
              bar_one = 0+'%';
              bar_two = 0+'%';
              bar_three = 0+'%';
              verf = true;
            }
            if(verf){
              console.log(element.order_status);
              console.log(bar_one,bar_two,bar_three);
              let css_width = f_css_width;
              this.authService.getUser(element.seller_id).subscribe(seller => {
                let seller_name = seller.msg.name;
                let assigned_days= element.assigned_days;
                let total_ext_days = element.total_ext_days;
                let project_days = +element.assigned_days + +element.total_ext_days;     let today = moment();
                let pro_com_date = moment(element.date).add(project_days, 'day');
                let order_date = moment(element.date);  
                            
              if(element.order_status === 'Order Accepted'){
                // alert('hi');
                this.inprogress.push({
                  seller_id:element.buyer_id,
                  seller_name:seller_name.substring(0,7),
                  order_id:element._id,
                  order_num:element.order_id,
                  gig_img:element.gig_img,
                  gig_id:element.gig_id,
                  title:element.gig_title.substring(0,90),
                  pro_com_date:pro_com_date,
                  order_date:moment(order_date).format("MMM Do YY"),
                  // f_css_width:css_width,
                  div_one:33.3333+'%',
                  div_two:33.3333+'%',
                  div_three:0+'%',
                  total_amount:element.total_amount
                })
                this.all.push({
                  seller_id:element.buyer_id,
                  seller_name:seller_name.substring(0,7),
                  order_id:element._id,
                  order_num:element.order_id,
                  gig_img:element.gig_img,
                  gig_id:element.gig_id,
                  title:element.gig_title.substring(0,90),
                  pro_com_date:pro_com_date,
                  order_date:moment(order_date).format("MMM Do YY"),
                  // f_css_width:css_width,
                  div_one:33.3333+'%',
                  div_two:33.3333+'%',
                  div_three:0+'%',
                  total_amount:element.total_amount
                })
                this.f_all_orders.push({
                  seller_id:element.buyer_id,
                  seller_name:seller_name.substring(0,7),
                  order_id:element._id,
                  order_num:element.order_id,
                  gig_img:element.gig_img,
                  gig_id:element.gig_id,
                  title:element.gig_title.substring(0,90),
                  pro_com_date:pro_com_date,
                  order_date:moment(order_date).format("MMM Do YY"),
                  // f_css_width:css_width,
                  div_one:33.3333+'%',
                  div_two:33.3333+'%',
                  div_three:0+'%',
                  total_amount:element.total_amount
                })
              } 
              if(element.order_status === 'Order Delivered'){
                this.completed.push({
                  seller_id:element.buyer_id,
                  seller_name:seller_name.substring(0,7),
                  order_id:element._id,
                  order_num:element.order_id,
                  gig_img:element.gig_img,
                  gig_id:element.gig_id,
                  title:element.gig_title.substring(0,90),
                  pro_com_date:pro_com_date,
                  order_date:moment(order_date).format("MMM Do YY"),
                  // f_css_width:css_width,
                  div_one:33.3333+'%',
                  div_two:33.3333+'%',
                  div_three:33.3333+'%',
                  total_amount:element.total_amount
                })
                this.all.push({
                  seller_id:element.buyer_id,
                  seller_name:seller_name.substring(0,7),
                  order_id:element._id,
                  order_num:element.order_id,
                  gig_img:element.gig_img,
                  gig_id:element.gig_id,
                  title:element.gig_title.substring(0,90),
                  pro_com_date:pro_com_date,
                  order_date:moment(order_date).format("MMM Do YY"),
                  // f_css_width:css_width,
                  div_one:33.3333+'%',
                  div_two:33.3333+'%',
                  div_three:33.3333+'%',
                  total_amount:element.total_amount
                })
                this.f_all_orders.push({
                  seller_id:element.buyer_id,
                  seller_name:seller_name.substring(0,7),
                  order_id:element._id,
                  order_num:element.order_id,
                  gig_img:element.gig_img,
                  gig_id:element.gig_id,
                  title:element.gig_title.substring(0,90),
                  pro_com_date:pro_com_date,
                  order_date:moment(order_date).format("MMM Do YY"),
                  // f_css_width:css_width,
                  div_one:33.3333+'%',
                  div_two:33.3333+'%',
                  div_three:33.3333+'%',
                  total_amount:element.total_amount
                })
              }
              if(element.order_status === 'Order PLaced'){
                this.cancelled.push({
                  seller_id:element.buyer_id,
                  seller_name:seller_name.substring(0,7),
                  order_id:element._id,
                  order_num:element.order_id,
                  gig_img:element.gig_img,
                  gig_id:element.gig_id,
                  title:element.gig_title.substring(0,90),
                  pro_com_date:pro_com_date,
                  order_date:moment(order_date).format("MMM Do YY"),
                  // f_css_width:css_width,
                  div_one:33.3333+'%',
                  div_two:0+'%',
                  div_three:0+'%',
                  total_amount:element.total_amount
                })
                this.all.push({
                  seller_id:element.buyer_id,
                  seller_name:seller_name.substring(0,7),
                  order_id:element._id,
                  order_num:element.order_id,
                  gig_img:element.gig_img,
                  gig_id:element.gig_id,
                  title:element.gig_title.substring(0,90),
                  pro_com_date:pro_com_date,
                  order_date:moment(order_date).format("MMM Do YY"),
                  // f_css_width:css_width,
                  div_one:33.3333+'%',
                  div_two:0+'%',
                  div_three:0+'%',
                  total_amount:element.total_amount
                })
                this.f_all_orders.push({
                  seller_id:element.buyer_id,
                  seller_name:seller_name.substring(0,7),
                  order_id:element._id,
                  order_num:element.order_id,
                  gig_img:element.gig_img,
                  gig_id:element.gig_id,
                  title:element.gig_title.substring(0,90),
                  pro_com_date:pro_com_date,
                  order_date:moment(order_date).format("MMM Do YY"),
                  // f_css_width:css_width,
                  div_one:33.3333+'%',
                  div_two:0+'%',
                  div_three:0+'%',
                  total_amount:element.total_amount
                })
              }
              // this.all.push({
              //   seller_id:element.seller_id,
              //   seller_name:seller_name.substring(0,7),
              //   order_id:element._id,
              //   order_num:element.order_id,
              //   gig_id:element.gig_id,
              //   gig_img:"http://localhost:3000"+element.gig_img.replace('public',''),
              //   title:element.gig_title.substring(0,25),
              //   pro_com_date:pro_com_date,
              //   order_date:moment(order_date).format("MMM Do YY"),
              //   // f_css_width:css_width,
              //   div_one:bar_one,
              //   div_two:bar_two,
              //   div_three:bar_three,
              //   total_amount:element.total_amount
              // })
  
              // this.f_all_orders.push({
              //   seller_id:element.seller_id,
              //   seller_name:seller_name.substring(0,7),
              //   order_id:element._id,
              //   order_num:element.order_id,
              //   gig_id:element.gig_id,
              //   gig_img:"http://localhost:3000"+element.gig_img.replace('public',''),
              //   title:element.gig_title.substring(0,25),
              //   pro_com_date:pro_com_date,
              //   order_date:moment(order_date).format("MMM Do YY"),
              //   // f_css_width:css_width,
              //   div_one:bar_one,
              //   div_two:bar_two,
              //   div_three:bar_three,
              //   total_amount:element.total_amount
              // })
              this.f_all_orders = this.f_all_orders.reverse();
              console.log(this.f_all_orders);            
            })
            }
        });
    })       
  }

  gotoseller(seller_id){
    this.router.navigate(['/seller'],{queryParams:{id:seller_id[0]}});
      // console.log(seller_id);
  }
  get_orders(cat){
    // alert(cat);
    switch (cat) {
      case "completed":
      this.f_all_orders = this.completed.reverse();       
        break;
      case "inprogress":
        this.f_all_orders = this.inprogress.reverse();      
        break;
      case "cancelled":
        this.f_all_orders = this.cancelled.reverse();      
        break;
      case "all":
        this.f_all_orders = this.all.reverse();        
        break;
    
      default:
        break;
    }
  }
  go_to_orderDet(order_id){
    // alert(order_id);
    this.router.navigate(['/order-details'],{queryParams:{order_id:order_id}});
  }
  go_to_gigDet(gig_id){
    // alert(gig_id);
    this.router.navigate(['/gig'],{queryParams:{id:gig_id}});
  }
}
