import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service";
import { ValidateService } from "../services/validate.service";
import * as moment from 'moment';
declare var $: any;
declare var require:any;
require('raty-js');
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private title: Title,private router:Router,private activatedRoute:ActivatedRoute,private authService:AuthService,private gigService:GigService,private validate:ValidateService) { }

order_id:string;
gig_id:string;
order_arr;
img:string;
seller_name:string;
buyer_name:string;
gig_title:string;
total_days:number;
total_amount:string;
date:string;
description:string;
actual_amount:number;
process_fee:number;
f_process_fee:string;
f_actual_amount:string;
user_id:string;
order_status:string;
buyer_id:string;
seller_id:string;
css_width;
accept:boolean;
deliver:boolean;
days_left;
review:string;
post_time:string;
div_one:any;
div_two:any;
div_three:any;
missed:string;
  ngOnInit() {

    let user = localStorage.getItem('user');
    if(user == ''||user == null || user == undefined){
      this.user_id = '';
    }else{
      let u = JSON.parse(user);
      this.user_id = u.id;
    }

    this.order_id = this.activatedRoute.queryParams['_value'].order_id;
    this.gigService.get_orderby_id(this.order_id).subscribe(order => {
      console.log(order);
      let or = order.msg[0];
      this.gig_id = or.gig_id;

      this.gigService.get_gig_byId(this.gig_id).subscribe(gig => {
            // console.log(gig);
             this.img = gig.msg.img1.replace('public',''),
             this.seller_id = gig.msg.user_id;
           this.authService.getUser(this.seller_id).subscribe(seller => {
             this.seller_name = seller.msg.name;
           });
            this.buyer_id = or.buyer_id;
            this.authService.getUser(this.buyer_id).subscribe(buyer => {
              this.buyer_name = buyer.msg.name;
            });
            this.order_id=or._id;
            this.gig_title = gig.msg.title;
            if(or.total_ext_days === "null" || or.total_ext_days === null){
              or.total_ext_days = 0;
            }
            console.log(or.total_ext_days);
            console.log(or.assigned_days);
            this.total_days = +parseInt(or.total_ext_days) + +parseInt(or.assigned_days);            
            this.total_amount = or.total_amount.toFixed(2);
            this.date = moment(or.date).add(this.total_days,'days').format("MMM Do YYYY");
            this.description = or.description;
           
            var a = moment(or.accepted_date).add(this.total_days,'days');
            var b = moment();
            // this.days_left = a.diff(b,'days');
            if(or.order_status === "Order Accepted"){
              if(a.diff(b,'days') < 0){
                this.missed = "Missed Delivery Date"
              }
            }
            if(this.days_left == 0){
              this.order_status = "Missed Delivery date";
            }
            console.log(moment(or.accepted_date).add(this.total_days,'days').format('MMM Do YYYY'));
            this.actual_amount = or.total_amount/1.05;
            this.f_actual_amount = this.actual_amount.toFixed(2);
            this.process_fee = or.total_amount-(or.total_amount/1.05);
            this.f_process_fee = this.process_fee.toFixed(2);
            this.gig_id = this.gig_id;
            // this.days_left = 

                if(this.user_id == or.buyer_id){                 
                  this.order_status = or.order_status;
                  $('#accept-btn').hide();  
                  if(or.order_status === 'Order PLaced'){ 
                    this.div_one = 33.3333+'%';
                    this.div_two = 0+'%';
                    this.div_three = 0+'%';
                    }
                    if(or.order_status === 'Order Delivered'){
                      $('.buyer-div').css({'display':'block'});
                      $('#days-left').css({'display':'block'});
                      this.days_left = "Delivered";
                      this.div_one = 33.3333+'%';
                    this.div_two = 33.3333+'%';
                    this.div_three = 33.3333+'%';
                    }                  
                    if(or.order_status === 'Order Accepted'){
                      $('#days-left').css({'display':'block'});
                      this.days_left = a.diff(b,'days')+" "+"days left";
                      this.div_one = 33.3333+'%';
                      this.div_two = 33.3333+'%';
                      this.div_three = 0+'%';
                    }              
                    $('.buyer-name').hide();
                    
                }

                $('#raty').raty({
                  starOn:'../assets/star-on1.png', 
                starOff:'../assets/star-off1.png',
                starHalf:'../assets/star-half.png',
                half: true ,
                readOnly:true,
                number:5,
                score:0, 
                });
                $('#rating').raty({
                  starOn:'../assets/star-on1.png', 
                starOff:'../assets/star-off1.png',
                starHalf:'../assets/star-half.png',
                half: false ,
                readOnly:false,
                number:5,
                click: function(score){
                  localStorage.setItem('rev_score',score);
                }
                });
                
                if(this.user_id == or.seller_id){
                  this.order_status = or.order_status;
                  if(or.order_status == 'Order PLaced'){
                    this.accept = true;
                    this.div_one = 33.3333+'%';
                    this.div_two = 0+'%';
                    this.div_three = 0+'%';

                  }
                  if(or.order_status == 'Order Accepted'){                 
                    $('#days-left').css({'display':'block'});
                    $('#days-left').css({'display':'block'});
                    this.days_left = a.diff(b,'days')+" "+"days left";
                    this.deliver = true;
                    this.div_one = 33.3333+'%';
                    this.div_two = 33.3333+'%';
                    this.div_three = 0+'%';
                 }    
                 if(or.order_status === 'Order Delivered'){     
                  $('#days-left').css({'display':'block'});
                  this.days_left = "Delivered";                          
                  this.accept = false;
                  this.deliver = false;
                  this.div_one = 33.3333+'%';
                  this.div_two = 33.3333+'%';
                  this.div_three = 33.3333+'%';
                  this.gigService.get_reviews_order_id(this.order_id).subscribe(rev => {
                    if(rev.success && rev.msg.length >0){
                      $('.seller-div').css({'display':'block'});
                      $('#raty').raty({
                        starOn:'../assets/star-on1.png', 
                      starOff:'../assets/star-off1.png',
                      starHalf:'../assets/star-half.png',
                      half: true ,
                      readOnly:true,
                      number:5,
                      score:rev.msg[0].score, 
                      });
                    }
                    this.review = rev.msg[0].review;
                    this.post_time = moment(rev.msg[0].date).fromNow(); 
                  })
                }             
                 $('.seller-name').hide();
                //  if(b > a){
                //    $('.seller-div').show();
                //   }else{
                //     $('.seller-div').hide();
                //  }
                 }
                  if(or.order_status == 'Order Accepted'){
                    if(moment().format('MMM Do YY') > this.date){
                      $('#or-del-miss').css({'display':'block'});
                    }
                  }
      })
    })
  }
  rated:boolean
  clicked(){
    this.rated = true;
  }
  go_to_inbox(seller_id){

    let new_conv = {
      from:this.buyer_id,
      to:this.user_id,
    }
    // console.log(new_conv);
    this.gigService.check_conversation(new_conv).subscribe(res =>{
    console.log(res);
    if(res.success){
      if(res.msg[0] !== null && res.msg[0] !== undefined){
        this.router.navigate(['/inbox'],{queryParams:{seller_id:this.user_id,conv_id:res.msg[0].conv_id}});
    }else{
      this.router.navigate(['/inbox'],{queryParams:{seller_id:this.user_id,conv_id:res.msg.conv_id}});
    }
      }
    });
  }
  
  accept_order(){
    // console.log("order");
    let order = {
      order_id : this.order_id,
      order_status:"Order Accepted",
      accepted_date:moment()
    }
    this.gigService.update_order_status(order).subscribe( or_sta => {
      console.log(or_sta);
      if(or_sta.success){
       this.accept = false;
       this.deliver = true;
      this.div_two = 33.3333+'%';
      $('#days-left').css({'display':'block'});
      var a = moment(or_sta.msg.accepted_date).add(this.total_days,'days');
      var b = moment();
      this.days_left = a.diff(b,'days')+" "+"days left";
      }
    })
  }
  deliver_order(){
    let order = {
      order_id : this.order_id,
      order_status:"Order Delivered"
    }
    // console.log("order");
    this.gigService.update_order_status(order).subscribe( or_sta => {
      console.log(or_sta);
      if(or_sta.success){
       this.accept = false;
       this.deliver = false;
       this.div_three = 33.3333+'%';
       this.order_status = "Order Delivered";
       this.days_left = "Delivered"
      //  notification
      this.authService.getUser(this.buyer_id).subscribe(buyer => {
        if(buyer.success){
          let new_not_s = {
            user_id:this.seller_id,
            message:"Order delivered to"+ buyer.msg.name+buyer.msg.last_name,
            date:moment(),
            status:"not_seen",
            image:buyer.msg.profile_pic,
            destination:"order-details",
            link:this.order_id
          }
          this.gigService.post_notification(new_not_s).subscribe(not_s =>{
            console.log(not_s);
          });
        }   
      });
      this.authService.getUser(this.seller_id).subscribe(seller => {
        if(seller.success){
          let new_not_b = {
            user_id:this.buyer_id,
            message:"Your order was delivered by"+ seller.msg.name+seller.msg.last_name,
            date:moment(),
            image:seller.msg.profile_pic,
            status:"not_seen",
            destination:"order-details",
            link:this.order_id
          }
          this.gigService.post_notification(new_not_b).subscribe(not_b => {
            console.log(not_b);
          });
        }
      });
      }
    });
  }

  goto_buyer(buyer_id){
    this.router.navigate(['/seller'],{queryParams:{id:buyer_id}});
  }

  goto_gig_det(gig_id){
    this.router.navigate(['/gig'],{queryParams:{id:gig_id}});
  }

  close_pop(){
  $('.feedback-background').css({'display':'none'});
  }

  submit_review(){
    let score = localStorage.getItem('rev_score');
    let review = $('.text-area').val();
    if(this.validate.validateInput(score) && this.validate.validateInput(review)){
      if(this.rated){
        let rev = {
          score:localStorage.getItem('rev_score'),
          review:$('.text-area').val(),
          gig_id:this.gig_id,
          buyer_id:this.buyer_id,
          seller_id:this.seller_id,
          order_id:this.order_id,
          date:moment()
        }
       this.gigService.post_review(rev).subscribe(rev => {
         console.log(rev);
         $('.feedback-background').css({'display':'block'});
         localStorage.removeItem('rev_score');
         this.authService.getUser(this.buyer_id).subscribe(buyer => {
          if(buyer.success){
            let new_not_s = {
              user_id:this.seller_id,
              message:buyer.msg.name+buyer.msg.last_name +" "+"Rated Your Order",
              date:moment(),
              status:"not_seen",
              image:buyer.msg.profile_pic,
              destination:"gig",
              link:this.gig_id
            }
            this.gigService.post_notification(new_not_s).subscribe(not_s =>{
              console.log(not_s);
            });
          }   
        });    
       });
      }else{
        $('#review-err').html('<i class="fa fa-exclamation-circle" style="color:red"></i> Please rate a star and leave a comment on authors work' )
      }
    }else{
      $('#review-err').html('<i class="fa fa-exclamation-circle" style="color:red"></i> Please rate a star and leave a comment on authors work' )
    }
  }
}
