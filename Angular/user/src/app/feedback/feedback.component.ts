import { Component, OnInit } from '@angular/core';
import { GigService } from "../services/gig.service";
import { AppComponent } from "../app.component";
import { AuthService } from "../services/auth.service";
import * as moment from 'moment';
import { scheduleMicroTask } from '@angular/core/src/util';
declare var $:any;
declare var require:any;
require('raty-js');
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private gigService:GigService , private app:AppComponent , private authService:AuthService) { }

  user_id:string;
  feedbacks = [];
  temp_obj = {};
  seller_id:string;
  order_id:string;
  gig_id:string;
  review:string;
  score:string;
  gig_title:string;
  gig_img:string;
  raty1:string;
  raty2:string;
  raty3:string;
  raty4:string;
  raty5:string;
  ngOnInit() {
    let user = localStorage.getItem('user');
    if(user == '' || user == null || user == undefined){
      this.user_id = '';
    }else{
      let u = JSON.parse(user);
      this.user_id = u.id;
    }
    this.postDisplay();
    
    console.log(this.feedbacks);
  }

  postDisplay(){
    this.feedbacks = [];
    this.gigService.get_orders_buyer(this.user_id).subscribe(orders => {
      console.log(orders)
      orders.msg.forEach(order => {
        this.authService.getUser(order.seller_id).subscribe(seller => {
          order['seller_pic'] = seller.msg.profile_pic;
          order['seller_name'] = seller.msg.name +" "+seller.msg.last_name;
        });
        if(order.order_status == "Order Delivered"){
          this.gigService.get_my_feedbacks(order._id).subscribe(review => {
           let rev = [];
           if(review.msg.length > 0){
             order['review'] = review.msg[0].review;
             order['score'] = review.msg[0].score;
            switch (review.msg[0].score) {
              case "5":
              order['raty1'] = '../assets/star-on.png';
              order['raty2'] = '../assets/star-on.png';
              order['raty3'] = '../assets/star-on.png';
              order['raty4'] = '../assets/star-on.png';
              order['raty5'] = '../assets/star-on.png';
              break;
              case "4":
              order['raty1'] = '../assets/star-on.png';
              order['raty2'] = '../assets/star-on.png';
              order['raty3'] = '../assets/star-on.png';
              order['raty4'] = '../assets/star-on.png';
              order['raty5'] = '../assets/star-off.png';
              break;
              case "3":
              order['raty1'] = '../assets/star-on.png';
              order['raty2'] = '../assets/star-on.png';
              order['raty3'] = '../assets/star-on.png';
              order['raty4'] = '../assets/star-off.png';
              order['raty5'] = '../assets/star-off.png';
              break;
              case "2":
              order['raty1'] = '../assets/star-on.png';
              order['raty2'] = '../assets/star-on.png';
              order['raty3'] = '../assets/star-off.png';
              order['raty4'] = '../assets/star-off.png';
              order['raty5'] = '../assets/star-off.png';
              break;
              case "1":
              order['raty1'] = '../assets/star-on.png';
              order['raty2'] = '../assets/star-off.png';
              order['raty3'] = '../assets/star-off.png';
              order['raty4']= '../assets/star-off.png';
              order['raty5'] = '../assets/star-off.png';
              break;
                        
              default:
              break;
            }
            this.feedbacks.push(order);
           }else{
            order['raty1'] = '../assets/star-off.png';
            order['raty2'] = '../assets/star-off.png';
            order['raty3'] = '../assets/star-off.png';
            order['raty4'] = '../assets/star-off.png';
            order['raty5'] = '../assets/star-off.png';
            order['review'] = "";
            order['score'] = "0";
            order['not_reviewed'] = true;
            this.feedbacks.push(order);
           }
          });
        }
        console.log(this.feedbacks)
      });
  });
  }
  
  // edit feedback
  edit_feedback(obj){
    this.temp_obj = obj;
    $('.main').css({'display':'block'});
    $('.one').css({'display':'block'});
    this.review = obj.review;
    this.score = obj.score;
    this.order_id = obj._id;
    this.seller_id = obj.seller_id;
    this.gig_id = obj.gig_id;
    this.gig_title = obj.gig_title;
    this.gig_img = obj.gig_img.replace('public','');
    if(obj.score === undefined || obj.score === null || obj.score == '0'){
      localStorage.setItem('rev_score', '0');
    }else{
      localStorage.setItem('rev_score',obj.score);
    }
    $('#raty').raty({
      starOn:'../assets/star-on1.png', 
    starOff:'../assets/star-off1.png',
    readOnly:false,
    number:5,
    score:this.score , 
    click: function(score){     
      localStorage.setItem('rev_score',score);
    }
    });
  }
  submit(com){
    if(com === 'update'){
      let score = localStorage.getItem('rev_score');
      console.log(score);
      console.log(typeof(this.review));
      if(score !== "0"){
        let rev = {
          score:localStorage.getItem('rev_score'),
          buyer_id:this.user_id,
          seller_id:this.seller_id,
          review:this.review,
          order_id:this.order_id,
          gig_id:this.gig_id,
          date:moment()
        }
       this.gigService.post_review(rev).subscribe(rev => {
        if (rev.success) {
          this.postDisplay();
          this.temp_obj['review'] = rev.msg.review;
          this.temp_obj['score'] = rev.msg.score;
          $('.main').css({'display':'block'});
          $('.one').css({'display':'none'});
          $('.two').css({'display':'block'});
          this.authService.getUser(this.user_id).subscribe(buyer => {
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
        }
       });
      }else{
       $('#rev-err').html('Please rate a star and leave a comment !');
      }

      
    }
    if(com === 'edit'){
      $('.two').css({'display':'none'});
      $('.one').css({'display':'block'});
    }
    if(com === 'close'){
      $('.main').css({'display':'none'});
      $('.one').css({'display':'none'});
    }
    if(com === 'close-two'){
      $('.main').css({'display':'none'});
      $('.one').css({'display':'none'});
      $('.two').css({'display':'none'});

    }
  }
}
