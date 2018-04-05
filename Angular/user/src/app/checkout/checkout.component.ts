import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service";
import { ValidateService } from "../services/validate.service";
import * as moment from 'moment';
import promisepay from 'promisepay';
declare var $: any;
import { Http } from "@angular/http";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private title: Title,private router:Router,private activatedRoute:ActivatedRoute,private authService:AuthService,private gigService:GigService,private validate:ValidateService,private http:Http) { }

  gig_id:string;
  buyer_id:string;
  seller_id:string;
  buyer_fname:string;
  buyer_lname:string;
  seller_fname:string;
  seller_lname:string;
  name:string;
  pack:string;
  
  pac_cos_sta:string;
  gig_title:string;
  img1:string;
  sta_price:any;
  pre_price:any;
  pro_price:any;
  pac_del_sta:string;
  pac_del_pre:string;
  pac_del_pro:string;
  assigned_days:string;
  selected_price:any;
  description:string;
  ext_arr=[];
  ext_arr_all;
  selected_extras=[];
  ext_num:number;
  ext_name:string;
  finalvalue:any;
  checked:boolean;
  // gig_title:string;
  o_gig_title:string;
  cur_extras = {};
  cur_ext_obj={};
  total_ext_days:number;
  f_tot_ext_days:number;
  total_amount:number;
  seller_img:string;
  buyer_img:string;
  gig_img:string;
  jobs_done;
  raty;
  raty1:string;
  raty2:string;
  raty3:string;
  raty4:string;
  raty5:string;

  ppClient = promisepay({
    userName: 'admin@infocubesol.com.au',
    token: 'ZTkxMmVkOTlkZmFmYmQyYjRmZjg1MGY2ZDYxODFmYjg=',
    preLive: 'https://test.api.promisepay.com/',
    currency: 'AUD',
    debug: true,
    // logger: winston.info,
  });

  ngOnInit() {
    this.title.setTitle('Checkout - Market Place');

    // $(function () {
    //   $('.rrating').barrating({
    //     theme: 'css-stars',
    //     initialRating: null,
    //     readonly: true
    //   });
    // });

    // $(".extra-checks").click(function () {
    //   if ($(this).is(":checked")) {
    //     $(this).parent().parent().parent().parent().find('.be-cost').addClass('cost');
    //     var ch = parseFloat($(this).parent().parent().parent().parent().find('.price-num').text());
    //     //var tot = parseFloat($('#total_price').text());
    //     var totn = $('#total_price').text();
    //     var tot = parseFloat(totn.substring(1));
    //     var n_tot = ch + tot;
    //     $("#total_price").html('$' + n_tot);
    //     $("#total-cost-input").val(n_tot);
    //   }
    //   else if (!($(this).is(":checked"))) {
    //     $(this).parent().parent().parent().parent().find('.be-cost').removeClass('cost');
    //     var ch = parseFloat($(this).parent().parent().parent().parent().find('.price-num').text());
    //     //var tot = parseFloat($('#total_price').text());
    //     var totn = $('#total_price').text();
    //     var tot = parseFloat(totn.substring(1));
    //     var n_tot = tot - ch;
    //     $("#total_price").html('$' + n_tot);
    //     $("#total-cost-input").val(n_tot);
    //   }
    // });

    this.gig_id = this.activatedRoute.queryParams['_value'].gig_id;
    // this.seller_id = this.activatedRoute.queryParams['_value'].user_id;
    this.pack = localStorage.getItem('selected_package');

    this.authService.get_gig_det(this.gig_id).subscribe(dat => {
      console.log(dat);
      let g = dat.msg;
      this.sta_price= g.pac_cos_sta;
      this.pre_price= g.pac_cos_pre;
      this.pro_price= g.pac_cos_pro;
      this.pac_del_sta = g.pac_del_sta;
      this.pac_del_pre = g.pac_del_pre;
      this.pac_del_pro = g.pac_del_pro;
      this.gig_title = g.title.substring(0,22);
      this.o_gig_title = g.title;
      this.seller_id = g.user_id;
      this.gig_img= g.img1.replace('public','');
      this.seller_img = g.img1;
      this.img1 = g.img1;
      this.description = g.description;
        switch (this.pack) {
          case "standard":
            this.selected_price = this.sta_price;
            this.assigned_days = this.pac_del_sta;
            // this.description = this.pac_det_sta;
            break;
            case "premium":
            this.selected_price = this.pre_price;
            this.assigned_days = this.pac_del_pre;
            break;
            case "pro":
            this.selected_price = this.pro_price;
            this.assigned_days = this.pac_del_pro;
            break;
        
          default:
            break;
        }      
        this.finalvalue = this.selected_price;
        this.total_amount = parseInt(this.finalvalue) + (this.finalvalue/100)*5;
        this.authService.getUser(this.seller_id).subscribe(seller => {
      let s = seller.msg;
          this.name = s.name;
        });

        // reviews
        this.gigService.get_reviews_gigid(this.gig_id).subscribe(rev => {
          if(rev.msg.length >0){
            let score = 0;
            let avg_score;
            let j = 0;
            rev.msg.forEach(rev => {
              j++;
              score = +score + +rev.score;
            });
            avg_score = Math.round(score/j);
            if(Number.isNaN(avg_score)){
              this.raty1 = "../assets/star-off.png";
              this.raty2 = "../assets/star-off.png";
              this.raty3 = "../assets/star-off.png";
              this.raty4 = "../assets/star-off.png";
              this.raty5 = "../assets/star-off.png";
            }else{
              switch (avg_score) {
                case 5:
                  this.raty1 = "../assets/star-on.png";
                  this.raty2 = "../assets/star-on.png";
                  this.raty3 = "../assets/star-on.png";
                  this.raty4 = "../assets/star-on.png";
                  this.raty5 = "../assets/star-on.png";
                  break;
                case 4:
                  this.raty1 = "../assets/star-on.png";
                  this.raty2 = "../assets/star-on.png";
                  this.raty3 = "../assets/star-on.png";
                  this.raty4 = "../assets/star-on.png";
                  this.raty5 = "../assets/star-off.png";
                  break;
                case 3:
                  this.raty1 = "../assets/star-on.png";
                  this.raty2 = "../assets/star-on.png";
                  this.raty3 = "../assets/star-on.png";
                  this.raty4 = "../assets/star-off.png";
                  this.raty5 = "../assets/star-off.png";
                  break;
                case 2:
                  this.raty1 = "../assets/star-on.png";
                  this.raty2 = "../assets/star-on.png";
                  this.raty3 = "../assets/star-off.png";
                  this.raty4 = "../assets/star-off.png";
                  this.raty5 = "../assets/star-off.png";
                  break;
                case 1:
                  this.raty1 = "../assets/star-on.png";
                  this.raty2 = "../assets/star-off.png";
                  this.raty3 = "../assets/star-off.png";
                  this.raty4 = "../assets/star-off.png";
                  this.raty5 = "../assets/star-off.png";
                  break;
              
                default:
                  break;
              }
            }
          }else{
            this.raty1 = "../assets/star-off.png";
            this.raty2 = "../assets/star-off.png";
            this.raty3 = "../assets/star-off.png";
            this.raty4 = "../assets/star-off.png";
            this.raty5 = "../assets/star-off.png";
          }
        });
        // projects completed      
        this.gigService.get_order_gigid(this.gig_id).subscribe(order => {
          if(order.msg.length > 0){
            let temp_jobs_done = 0;
            order.msg.forEach(order => {
              if(order.order_status === 'Order Delivered'){
                temp_jobs_done++;
              }
              this.jobs_done = temp_jobs_done;
            });
          }
        });
      });
    // this.gigService.get_gig_extrs(this.gig_id).subscribe(ext => {
    //   console.log(ext);
    //   this.ext_arr_all = ext.msg;
    //   this.ext_arr = JSON.parse(localStorage.getItem('extras'));
    //   this.total_ext_days = 0;   
    //   for (var i = 0; i <this.ext_arr_all.length; i++) {
    //     var element = this.ext_arr_all[i]._id;
    //     if(element == this.ext_arr[element]){
    //       this.selected_extras.push(this.ext_arr_all[i]);
    //       this.finalvalue = parseInt(this.finalvalue)+parseInt(this.ext_arr_all[i].price);
    //       this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
    //       this.cur_extras[this.ext_arr_all[i]._id] = { extra_id: this.ext_arr_all[i]._id, 
    //         description: this.ext_arr_all[i].e_description, 
    //         price: this.ext_arr_all[i].price, 
    //         days: this.ext_arr_all[i].days };
    //     }
    //     this.total_ext_days =  this.total_ext_days + parseInt(this.cur_extras[this.ext_arr_all[i]._id].days);             
    //   }
     
    // })
    this.gigService.get_gig_extrs(this.gig_id).subscribe(ext => {
      this.ext_arr_all = ext.msg;
      this.ext_arr = JSON.parse(localStorage.getItem('extras'));
      this.total_ext_days = 0; 
       this.ext_arr_all.forEach(allext => {
         if(allext._id === this.ext_arr[allext._id]){
           this.selected_extras.push(allext);
           this.finalvalue = parseInt(this.finalvalue)+parseInt(allext.price);
           this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
           this.cur_extras[allext._id] = { 
                                           extra_id: allext._id, 
                                           description: allext.e_description, 
                                           price: allext.price, 
                                           days: allext.days 
                                          };
           this.total_ext_days =  this.total_ext_days + parseInt(allext.days);   
           this.f_tot_ext_days = this.total_ext_days;
           console.log(this.total_ext_days);
         }
       });
    });


    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    this.buyer_id = u.id;
    this.authService.getUser(this.buyer_id).subscribe(buyer => {
      let u = buyer.msg;
      this.buyer_fname = u.name;
      this.buyer_lname = u.last_name;
      this.buyer_img = u.profile_pic;
    });
    // this.gigService.get_orders_seller(this.buyer_id).subscribe(order => {
    //   //  console.log(order);

    //    let total_days = +order.msg[0].assigned_days + +order.msg[0].total_ext_days;
    //    let pro_com_date = moment(order.msg[0].date).add(total_days,'days').format("MMM Do YY");            
    //   //  console.log(pro_com_date);
    //    let i = 0;
    //    if(moment().format("MMM Do YY") > pro_com_date){                     
    //           this.jobs_done =i++;
    //     }else{
    //       this.jobs_done = i;
    //     }
    //  })
  }

  onchange(event){
          switch (event.target.checked) {
            case false:                       
              switch (event.target.value) {
                case this.selected_extras[0]._id:
                  this.finalvalue = parseInt(this.finalvalue) - parseInt(this.selected_extras[0].price);              this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
                  break;
                  case this.selected_extras[1]._id:
                  this.finalvalue = parseInt(this.finalvalue) - parseInt(this.selected_extras[1].price);
                  this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
                  break;
                  case this.selected_extras[2]._id:
                  this.finalvalue = parseInt(this.finalvalue) - parseInt(this.selected_extras[2].price);
                  this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
                  break;
                  case this.selected_extras[3]._id:
                  this.finalvalue = parseInt(this.finalvalue) - parseInt(this.selected_extras[3].price);
                  this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
                  break;
                  
                default:
                  break;                            
              }         
              this.cur_extras[event.target.value]="null";
              break;
            case true:
            for (var i = 0; i <this.ext_arr_all.length; i++) {
              var element = this.ext_arr_all[i]._id;
              if(event.target.value == element){
                this.cur_extras[this.ext_arr_all[i]._id] = { extra_id: this.ext_arr_all[i]._id, 
                  description: this.ext_arr_all[i].e_description, 
                  price: this.ext_arr_all[i].price, 
                  days: this.ext_arr_all[i].days };
              }           
            }
            this.total_ext_days = this.total_ext_days + parseInt(this.cur_extras[event.target.value].days);      
            switch (event.target.value) {
              case this.selected_extras[0]._id:
                this.finalvalue = parseInt(this.finalvalue) + parseInt(this.selected_extras[0].price);
                this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
                break;
                case this.selected_extras[1]._id:
                this.finalvalue = parseInt(this.finalvalue) + parseInt(this.selected_extras[1].price);
                this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
                break;
                case this.selected_extras[2]._id:
                this.finalvalue = parseInt(this.finalvalue) + parseInt(this.selected_extras[2].price);
                this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
                break;
                case this.selected_extras[3]._id:
                this.finalvalue = parseInt(this.finalvalue) + parseInt(this.selected_extras[3].price);
                this.total_amount = this.finalvalue + (this.finalvalue/100)*5;
                break;
            
              default:
                break;
            }
              break;      
            default:
              break;          
          }
      }

resume:any;
order_description:string;
filechange(event){
  this.resume = event.target.files[0];
}
     
// payment gateway
pay(){
  this.ppClient.users.list({ limit: 5 }).then(data => {
    console.log(data);
  });
  this.ppClient.users.getBankAccount('MPS0002').then(account => {
    console.log(account);
  });
}
tot_ext_cost={};
placeOrder(){
  
       if(this.validate.validateInput(this.resume) && this.validate.validateInput(this.order_description)){
        let formData = new FormData();
        formData.append('resume',this.resume);
        formData.append('selected_pac',this.pack);
        formData.append('gig_title',this.o_gig_title);
        formData.append('gig_img',this.img1);
        formData.append('gig_desc',this.description);
        formData.append('selected_price',this.selected_price);
        formData.append('assigned_days',this.assigned_days);
        formData.append('total_amount',JSON.stringify(this.total_amount));
        formData.append('total_ext_days',JSON.stringify(this.total_ext_days));     
        formData.append('order_description',this.order_description);
        formData.append('gig_id',this.gig_id);
        formData.append('buyer_id',this.buyer_id);
        formData.append('seller_id',this.seller_id);
        formData.append('extras',JSON.stringify(this.cur_extras));  
            
          this.gigService.post_order_det(formData).subscribe(order => {
            console.log(order);
              let or = order.msg;
              let order_id = order.msg._id;
            if(order.success){
              this.authService.getUser(or.buyer_id).subscribe(buyer => {
                let new_not_s = {
                  user_id:or.seller_id,
                  message:"your gig has been purchased by"+buyer.msg.name+" "+buyer.msg.last_name,
                  date:or.date,
                  status:"not_seen",
                  image:buyer.msg.profile_pic,
                  destination:"order-details",
                  link:order_id
                }
                this.gigService.post_notification(new_not_s).subscribe(not_s =>{
                });
              })
  
                let new_not_b = {
                  user_id:or.buyer_id,
                  message:"You have purchased a new Gig",
                  date:or.date,
                  image:this.seller_img,
                  status:"not_seen",
                  destination:"order-details",
                  link:order_id
                }
                this.gigService.post_notification(new_not_b).subscribe(not_b => {
                });
                localStorage.removeItem('extras');
                this.router.navigate(['/manage-orders'],{queryParams:{order:'neworder'}});
            }
          });          
       }else{
        $('#order-err').html('<i class="fa fa-exclamation-circle" &nbsp;style="color:red;font-size:10px;"></i>Please upload your resume and give a brief description to the author and proceed.')
       }

      }  
}
