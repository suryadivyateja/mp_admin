import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute, Params} from '@angular/router';


import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service"; 
import { forEach } from '@angular/router/src/utils/collection';
import * as moment from 'moment';
import { CompileMetadataResolver } from '@angular/compiler';
declare var $: any;

@Component({
  selector: 'app-my-gigs',
  templateUrl: './my-gigs.component.html',
  styleUrls: ['./my-gigs.component.css']
})
export class MyGigsComponent implements OnInit {

  constructor(private title: Title,private authService:AuthService,private gigService:GigService,private activatedRoute: ActivatedRoute,private router: Router) { }

user_id:string;
name:string;
greeting:boolean;
gigs;
orders;
final=[];
or_num:number;
to_be_del_id;
n_gig:string;
completed=[];
inprogress=[];
cancelled=[];
all=[];

assigned_days;
total_ext_days;
project_days;
pro_com_date;
pro_pic:string;
  ngOnInit() {

    this.n_gig = this.activatedRoute.queryParams['_value'].gig;
    if(this.n_gig == 'newgig'){
      this.greeting = true;
    }else{
      this.greeting = false;
    }
    
    if(this.activatedRoute.queryParams['_value'].gig == 'newgig'){
      $('#new-gig').show();
    }else{
      $('#new-gig').hide();
    }
    if(this.activatedRoute.queryParams['_value'].gig == 'updategig'){
      $('#gig-update').show();
    }else{
      $('#gig-update').hide();
    }
    this.title.setTitle('Gig Details - Market Place');
    $('.click').click(function(){
        alert('hi')
      });
    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    this.user_id = u.id;
    this.authService.getUser(this.user_id).subscribe(user => {
        // this.name = user.msg.name;
        this.name = user.msg.name;
        this.pro_pic = user.msg.profile_pic.replace('public','');
    })
        this.gigService.get_gigsby_id(this.user_id).subscribe(gig => {
          this.gigs = gig.msg;
        
        this.gigService.get_orders_seller(this.user_id).subscribe(order => {
          this.orders = order.msg;

          this.gigs.forEach(gig => {
            console.log(gig);
            let buyer_name;
            let seller_name;
           
            this.gigService.get_reviews_gigid(gig._id).subscribe(rev => {
              let raty = [];
              rev.msg.forEach(rev => {
                switch (rev.score) {
                  case "5":
                    raty=["../assets/star-on.png","../assets/star-on.png","../assets/star-on.png","../assets/star-on.png","../assets/star-on.png",]
                    break;
                    case "4":
                    raty=["../assets/star-on.png","../assets/star-on.png","../assets/star-on.png","../assets/star-on.png","../assets/star-off.png",]               
                    break;
                  case "3":
                  raty=["../assets/star-on.png","../assets/star-on.png","../assets/star-on.png","../assets/star-off.png","../assets/star-off.png",]     
                    break;
                  case "2":
                  raty=["../assets/star-on.png","../assets/star-on.png","../assets/star-off.png","../assets/star-off.png","../assets/star-off.png",] 
                    break;
                  case "1":
                  raty=["../assets/star-on.png","../assets/star-off.png","../assets/star-off.png","../assets/star-off.png","../assets/star-off.png",] 
                    break;
                
                  default:
                    break;
                }
              });
            this.orders.forEach(order => {
              if(gig._id == order.gig_id){
                let total_days = +order.assigned_days + +order.total_ext_days;
                let pro_com_date = moment(order.date).add(total_days , 'days').format("MMM Do YY");
                    this.authService.getUser(order.seller_id).subscribe(seller => {
                      seller_name = seller.msg.name;
                      this.authService.getUser(order.buyer_id).subscribe(buyer => {
                        buyer_name = buyer.msg.name;
                        console.log(buyer_name);                                   
                        if(pro_com_date > moment().format("MMM Do YY")){
                          this.inprogress.push({
                              gig_id:order.gig_id,
                              gig_title:order.gig_title,
                              gig_des:gig.description.substring(0,35),
                              pause:gig.pause,
                              gig_img:order.gig_img.replace('public',''),                    
                              gig_cost:order.selected_price,
                              seller_name:seller_name.substring(0,8),      
                              buyer_name:buyer_name.substring(0,8),
                              buyer_pic:buyer.msg.profile_pic.replace('public',''),
                              raty:raty,
                          })
                        }
                        if(pro_com_date < moment().format("MMM Do YY")){
                          this.completed.push({
                            gig_id:order.gig_id,
                            gig_title:order.gig_title,                          
                            gig_des:gig.description.substring(0,35),
                            pause:gig.pause,
                            gig_img:order.gig_img.replace('public',''),
                            gig_cost:order.selected_price,
                            seller_name:seller_name.substring(0,8),             
                            buyer_name:buyer_name.substring(0,8),
                            buyer_pic:buyer.msg.profile_pic.replace('public',''),
                            raty:raty,
                          })
                        }
                        if(order.order_status === "Order Cancelled"){
                          this.cancelled.push({
                            gig_id:order.gig_id,
                            gig_title:order.gig_title,
                            gig_des:gig.description.substring(0,35),
                            pause:gig.pause,
                            gig_img:order.gig_img.replace('public',''),
                            gig_cost:order.selected_price,
                            seller_name:seller_name.substring(0,8),             
                            buyer_name:buyer_name.substring(0,8),
                            buyer_pic:buyer.msg.profile_pic.replace('public',''),
                            raty:raty,
                          })
                        }
                      })                   
                  })
                   
              }
            });
            this.all.push({
              gig_id:gig._id,
              gig_title:gig.title,
              gig_des:gig.description.substring(0,35),
              pause:gig.pause,
              gig_img:gig.img1.replace('public',''),
              buyer_name:this.name.substring(0,8),
              buyer_pic:this.pro_pic,
              gig_cost:gig.pac_cos_sta,
              raty:raty,
            })
            this.final.push({
              gig_id:gig._id,
              gig_title:gig.title,
              gig_des:gig.description.substring(0,35),
              pause:gig.pause,
              gig_img:gig.img1.replace('public',''),
              buyer_name:this.name.substring(0,8),
              buyer_pic:this.pro_pic,
              gig_cost:gig.pac_cos_sta,
              raty:raty,
            })
          });
        });
      });
        });
        console.log(this.final);
        console.log(this.inprogress);
        console.log(this.completed);
        console.log(this.cancelled);
}
d=1;
open_drop(event){
//  this.d++;
//  if(this.d%2 === 0){
//    $(event.target).parent().find('.sales-drop').css({'display':'block'});
//   }else{    
//     $(event.target).parent().find('.sales-drop').css({'display':'none'});
//  }
  $('.sales-drop').css({'display':'none'});
  $(event.target).parent().find('.sales-drop').css({'display':'block'});
}

// pause gig
pause_gig(gig){
 console.log(gig);
 let g = {
   gig_id:gig.gig_id
 }
 this.gigService.pause_gig(g).subscribe(res => {
   console.log(res);
   if(res.pause){
     gig.pause = true;
   }else{
     gig.pause = false;
   }
 });
}
  go_to_gig(cat){
    switch (cat) {
      case "completed":
        this.final = this.completed;
        $('#comp').addClass('border1');
        $('#progress').removeClass('border1');
        $('#cancelled').removeClass('border1');
        $('#all').removeClass('border1');
        break;
      case "inprogress":
        this.final = this.inprogress;
        $('#progress').addClass('border1');
        $('#comp').removeClass('border1');
        $('#cancelled').removeClass('border1');
        $('#all').removeClass('border1');
        break;
      case "cancelled":
        this.final = [];
        $('#cancelled').addClass('border1');
        $('#progress').removeClass('border1');
        $('#comp').removeClass('border1');
        $('#all').removeClass('border1');
        break;
      case "all":
        this.final = this.all;
        $('#all').addClass('border1');
        $('#progress').removeClass('border1');
        $('#cancelled').removeClass('border1');
        $('#comp').removeClass('border1');
        break;
    
      default:
        break;
    }
  }
  hide_greeting(){
    $('.custom-order-div-back').hide();
  }

  goto_gig_det(gig_id){
    this.router.navigate(["/gig"],{queryParams:{id:gig_id}});
    // alert(gig_id);
  }

  goto_edit_gig(gig_id){
    this.router.navigate(["/edit-gig"],{queryParams:{id:gig_id}});
  }
  temp_obj = {};
  delete_gig(gig){
    $('.gig-pop-div-back').css({'display':'block'});
    $('.pop-up').show();
   
    this.to_be_del_id = gig.gig_id;
    this.temp_obj = gig;
  }
  close_pop(){
    $('.gig-pop-div-back').css({'display':'none'});
    $('.pop-up').hide();

  }

  fin_delete_gig(){
      let gig_id = this.to_be_del_id;
     this.gigService.delete_gig(gig_id).subscribe(res => {
      console.log(res);
      if(res.success){
        let index_num = this.final.indexOf(this.temp_obj);
        this.final.splice(index_num,1);
        this.all.splice(index_num,1);
        $('.gig-pop-div-back').css({'display':'none'});
        $('.pop-up').hide();
      }
    })
  }
}
