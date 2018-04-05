import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute, Params} from '@angular/router';

import * as moment from 'moment';

import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service";
declare var $: any;

@Component({
  selector: 'app-manage-sales',
  templateUrl: './manage-sales.component.html',
  styleUrls: ['./manage-sales.component.css']
})
export class ManageSalesComponent implements OnInit {

  constructor(private title: Title,private authService:AuthService,private gigService:GigService,private router:Router) { }

  all_orders;
  buyer_id=[];
  assigned_days:string;
  pro_com_date:string;
  order_date:string;
  project_days:number;
  total_ext_days:string;
  total_orders:number;
  this_month_orders = [];
  this_month_orders_len:number = 0;
  total_sales:number;
  total_earnings:number;
  f_t_sales:string = "0";
  f_t_earnings:string = "0";
  css_width:number;
  buyer_name:string;
  f_all_orders = [];
  completed =[];
  inprogress=[];
  cancelled=[];
  all=[];
  ngOnInit() {

    this.title.setTitle('Manage Sales - Market Place');

    $("#t-close").click(function () {
      $("#thanks-div").css({ "display": "none" });
    });
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
    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    let user_id = u.id;
    let total_sales = 0; 
    let this_month_orders = [];
    var pro_com_date;
    var order_date;
    this.gigService.get_orders_seller(user_id).subscribe(order => {
      this.all_orders  = order.msg;
        this.all_orders.forEach(element => {
          var a = 0;
          if(element.order_status === 'Order Delivered'){
            this.total_orders = a++;

            if(moment(element.date).format("MMM YY") == moment().format("MMM YY")){            
              this_month_orders.push(element);
              this.this_month_orders_len = this_month_orders.length;
            }else{
              this.this_month_orders_len = 0;
            }
  
          let f_css_width;
          let accept;
          let deliver;
          let cancel;
          let assigned_days = element.assigned_days;
          let total_ext_days = element.total_ext_days;
          let project_days = +element.assigned_days + +element.total_ext_days;
          pro_com_date = moment(element.date).add(project_days, 'day'); 
          order_date = moment(element.date).format("MMM Do YY");
          let today = moment();
          total_sales = total_sales + element.total_amount;
          this.f_t_sales = total_sales.toFixed(2)
          this.total_earnings = +this.f_t_sales - (+this.f_t_sales*5)/100;
          this.f_t_earnings = this.total_earnings.toFixed(2);
          }else{
            this.total_orders = a;
          }

          this.authService.getUser(element.buyer_id).subscribe(buyer => {
          let buyer_name = buyer.msg.name+" "+buyer.msg.last_name;
           if(element.order_status === 'Order Accepted'){
            this.inprogress.push({
              title:element.gig_title.substring(0,22),
              buyer_name:buyer_name,  
              order_id:element._id,
              accept:false,
              deliver:true,
              cancel:false,
              order_num:element.order_id,
              gig_id:element.gig_id,
              gig_img:element.gig_img.replace('public',''),
              pro_com_date:pro_com_date,
              order_date:order_date,
              div_one:33.3333+'%',
              div_two:33.3333+'%',
              div_three:0+'%',
              buyer_id:element.buyer_id,
              seller_id:element.seller_id,
              total_amount:element.total_amount
            })
            this.all.push({
              title:element.gig_title.substring(0,22),
              buyer_name:buyer_name,  
              order_id:element._id,
              accept:false,
              deliver:true,
              cancel:false,
              order_num:element.order_id,
              gig_id:element.gig_id,
              gig_img:element.gig_img.replace('public',''),
              pro_com_date:pro_com_date,
              order_date:order_date,
              div_one:33.3333+'%',
              div_two:33.3333+'%',
              div_three:0+'%',
              buyer_id:element.buyer_id,
              seller_id:element.seller_id,
              total_amount:element.total_amount
            })
            this.f_all_orders.push({
              title:element.gig_title.substring(0,22),
              buyer_name:buyer_name,  
              order_id:element._id,
              accept:false,
              deliver:true,
              cancel:false,
              order_num:element.order_id,
              gig_id:element.gig_id,
              gig_img:element.gig_img.replace('public',''),
              pro_com_date:pro_com_date,
              order_date:order_date,
              div_one:33.3333+'%',
              div_two:33.3333+'%',
              div_three:0+'%',
              buyer_id:element.buyer_id,
              seller_id:element.seller_id,
              total_amount:element.total_amount
            })
          }
          if(element.order_status === 'Order Delivered'){
            this.completed.push({
              title:element.gig_title.substring(0,22),
              buyer_name:buyer_name,
              order_id:element._id,
              order_num:element.order_id,
              accept:false,
              deliver:false,
              cancel:false,
              gig_id:element.gig_id,
              gig_img:element.gig_img.replace('public',''),
              pro_com_date:pro_com_date,
              order_date:order_date,
              // f_css_width:f_css_width,
              div_one:33.3333+'%',
              div_two:33.3333+'%',
              div_three:33.3333+'%',
              buyer_id:element.buyer_id,
              seller_id:element.seller_id,
              total_amount:element.total_amount
            })
            this.all.push({
              title:element.gig_title.substring(0,22),
              buyer_name:buyer_name,
              order_id:element._id,
              order_num:element.order_id,
              accept:false,
              deliver:false,
              cancel:false,
              gig_id:element.gig_id,
              gig_img:element.gig_img.replace('public',''),
              pro_com_date:pro_com_date,
              order_date:order_date,
              // f_css_width:f_css_width,
              div_one:33.3333+'%',
              div_two:33.3333+'%',
              div_three:33.3333+'%',
              buyer_id:element.buyer_id,
              seller_id:element.seller_id,
              total_amount:element.total_amount
            })
            this.f_all_orders.push({
              title:element.gig_title.substring(0,22),
              buyer_name:buyer_name,
              order_id:element._id,
              order_num:element.order_id,
              accept:false,
              deliver:false,
              cancel:false,
              gig_id:element.gig_id,
              gig_img:element.gig_img.replace('public',''),
              pro_com_date:pro_com_date,
              order_date:order_date,
              // f_css_width:f_css_width,
              div_one:33.3333+'%',
              div_two:33.3333+'%',
              div_three:33.3333+'%',
              buyer_id:element.buyer_id,
              seller_id:element.seller_id,
              total_amount:element.total_amount
            })
          }else if(element.order_status === 'Order PLaced'){
            this.cancelled.push({
              title:element.gig_title.substring(0,22),
              buyer_name:buyer_name,
              order_id:element._id,
              accept:true,
              deliver:false,
              cancel:true,
              order_num:element.order_id,
              gig_img:element.gig_img.replace('public',''),
              gig_id:element.gig_id,
              pro_com_date:pro_com_date,
              order_date:order_date,
              // f_css_width:f_css_width,
              div_one:33.3333+'%',
              div_two:0+'%',
              div_three:0+'%',
              buyer_id:element.buyer_id,
              seller_id:element.seller_id,
              total_amount:element.total_amount
            })
            this.all.push({
              title:element.gig_title.substring(0,22),
              buyer_name:buyer_name,
              order_id:element._id,
              accept:true,
              deliver:false,
              cancel:true,
              order_num:element.order_id,
              gig_img:element.gig_img.replace('public',''),
              gig_id:element.gig_id,
              pro_com_date:pro_com_date,
              order_date:order_date,
              // f_css_width:f_css_width,
              div_one:33.3333+'%',
              div_two:0+'%',
              div_three:0+'%',
              buyer_id:element.buyer_id,
              seller_id:element.seller_id,
              total_amount:element.total_amount
            })
            this.f_all_orders.push({
              title:element.gig_title.substring(0,22),
              buyer_name:buyer_name,
              order_id:element._id,
              accept:true,
              deliver:false,
              cancel:true,
              order_num:element.order_id,
              gig_img:element.gig_img.replace('public',''),
              gig_id:element.gig_id,
              pro_com_date:pro_com_date,
              order_date:order_date,
              // f_css_width:f_css_width,
              div_one:33.3333+'%',
              div_two:0+'%',
              div_three:0+'%',
              buyer_id:element.buyer_id,
              seller_id:element.seller_id,
              total_amount:element.total_amount
            })
          }         
           this.f_all_orders = this.f_all_orders.reverse();  
           console.log(this.all);
          });
        })                      
    })
  }
  i=1;
  open_drop(event){
    this.i++;   
    if(this.i%2 === 0){
      $(event.target).parent().find('.sales-drop').css({'display':'block'});
    }else{
      $(event.target).parent().find('.sales-drop').css({'display':'none'});
   }
  }
  accept_order(order_id,event,x){
    let order = {
      order_id : order_id,
      order_status:"Order Accepted",
      accepted_date:moment()
    }
    this.gigService.update_order_status(order).subscribe( or_sta => {
      if(or_sta.success){
        x.accept=false;
        x.cancel = false;
        x.deliver = true;
        x.div_two = 33.3333+'%';
      }
    })
  }
  cancel_order(order_id,event,x){
    let order = {
      order_id : order_id,
      order_status:"Order Cancelled"
    }
    this.gigService.update_order_status(order).subscribe( or_sta => {
      if(or_sta.success){
        x.cancel = false;
        x.accept=false;
        x.deliver = true;
      //  $(event.target).parent().find('.accept').hide();
      //  $(event.target).parent().find('.cancel').hide();
      }
    })
  }
  deliver_order(order,event){
    let or = {
      order_id : order.order_id,
      order_status:"Order Delivered"
    }
    console.log(order);
    this.gigService.update_order_status(or).subscribe( or_sta => {
        if(or_sta.msg){
          order.deliver = false;
          order.div_three = 33.3333+"%";
          // notification
          this.authService.getUser(order.buyer_id).subscribe(buyer => {
            if(buyer.success){
              let new_not_s = {
                user_id:order.seller_id,
                message:"Order delivered to"+ buyer.msg.name+buyer.msg.last_name,
                date:moment(),
                status:"not_seen",
                image:buyer.msg.profile_pic,
                destination:"order-details",
                link:order.order_id
              }
              this.gigService.post_notification(new_not_s).subscribe(not_s =>{
                console.log(not_s);
              });
            }   
          });
          this.authService.getUser(order.seller_id).subscribe(seller => {
            if(seller.success){
              let new_not_b = {
                user_id:order.buyer_id,
                message:"Your order was delivered by"+ seller.msg.name+seller.msg.last_name,
                date:moment(),
                image:seller.msg.profile_pic,
                status:"not_seen",
                destination:"order-details",
                link:order.order_id
              }
              this.gigService.post_notification(new_not_b).subscribe(not_b => {
                console.log(not_b);
              });
            }
          })
          
        }
      });
  }
  gotoseller(buyer_id){
    this.router.navigate(['/seller'],{queryParams:{id:buyer_id[0]}});
  }

  get_orders(cat){
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
    this.router.navigate(['/order-details'],{queryParams:{order_id:order_id}});
  }
  go_to_gigDet(gig_id){
    this.router.navigate(['/gig'],{queryParams:{id:gig_id}});
  }
}
