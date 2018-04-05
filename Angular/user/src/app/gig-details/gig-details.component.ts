import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GigService } from "../services/gig.service";   
import { AppComponent } from "../app.component";
import * as moment from 'moment';
declare var require: any;
require ('raty-js');
declare var $: any;

@Component({
  selector: 'app-gig-details',
  templateUrl: './gig-details.component.html',
  styleUrls: ['./gig-details.component.css']
})
export class GigDetailsComponent implements OnInit {

  constructor(private title: Title,private activatedRoute: ActivatedRoute,private router: Router,private authService:AuthService,private gigService:GigService , private app:AppComponent) { 
  }

  selectedId:any;
  pac_cos_sta:string;
  pac_title:string;
  pac_cos_pre:string;
  pac_cos_pro:string;
  pac_det_sta:string;
  pac_det_pre:string;
  pac_det_pro:string;
  sf_sta:boolean;
  sf_pre:boolean;
  sf_pro:boolean;
  hq_sta:boolean;
  hq_pre:boolean;
  hq_pro:boolean;
  words_sta:string;
  words_pre:string;
  words_pro:string;
  rev_sta:string;
  rev_pre:string;
  rev_pro:string;
  pac_del_sta:string;
  pac_del_pre:string;
  pac_del_pro:string;
  description:string;
  days1:string;
  check1:string;
  doller1:string;
  description2:string;
  days2:string;
  doller2:string;
  img1:string;
  rat_num:number=0;
  user_id:string;
  first_name:string;
  last_name:string;
  pro_pic:string;
  selected_pack = 'standard';
  amount:any;
  id:any;
  gig_id:string;
  ext = [];
  country:string;
  category:string;
  score = 0;
  seller_id:string;
  review:string;
  reviews=[];
  items= [];
  seller_fname:string;
  seller_lname:string;
  fav_status;
  user:boolean;
  avg_rating:number;
  f_avg_rating:number;
  author_work:string;
  total_rev =[];
  five=[];
  four=[];
  three=[];
  two=[];
  one=[];
  five_rat;
  four_rat;
  three_rat;
  two_rat;
  dis_faq:boolean = false;
  dis_ext:boolean = false;
  one_rat;
  reviews_length;
  faq = [];
  days;
  revisions;
  pac_det;
  hq_file;
  sf_file;
  del_days;
  star_one:string;
  star_two:string;
  star_three:string;
  star_four:string;
  star_five:string;
  ngOnInit() {             
    this.gig_id = this.activatedRoute.queryParams['_value'].id;
    console.log(this.gig_id);
    // $('#av-op-btn').click(function() {
    //   $('body,html').animate({scrollTop:$('.packages-div').offset().top-180},1000);
    // });
    this.authService.get_gig_det(this.gig_id).subscribe(res => {
      console.log(res);
      let g = res.msg;
      this.pac_cos_sta = g.pac_cos_sta;
      this.pac_title = g.title;
      this.amount = g.pac_cos_sta;
      this.del_days = g.pac_del_sta;
      this.selected_pack = 'standard';
      this.pac_det = g.pac_det_sta;
      this.revisions = g.rev_sta;
      this.days = g.pac_del_sta;
      this.hq_file = g.hq_sta;
      this.sf_file = g.sf_sta;

      switch (g.category) {
        case "or":
          this.category = 'Cover Letters';
          break;
        case "rc":
          this.category = 'Resume/CV';
          break;
        case "vr":
          this.category = 'LinkedIn Makeover';
          break;
        case "lp":
          this.category = 'Selection Criteria';
          break;
        case "rl":
          this.category = 'Reference Letter';
          break;
      
        default:
          break;
      }
      // this.category = g.category;
      this.pac_cos_pre = g.pac_cos_pre;
      this.pac_cos_pro = g.pac_cos_pro;
      this.pac_det_sta = g.pac_det_sta;
      this.pac_det_pre = g.pac_det_pre;
      this.pac_det_pro = g.pac_det_pro;
      this.sf_sta = g.sf_sta;
      this.sf_pre = g.sf_pre;
      this.sf_pro = g.sf_pro;
      this.hq_sta = g.hq_sta;
      this.hq_pre = g.hq_pre;
      this.hq_pro = g.hq_pro;
      this.words_sta = g.words_sta;
      this.words_pre = g.words_pre;
      this.words_pro = g.words_pro;
      this.rev_sta = g.rev_sta;
      this.rev_pre = g.rev_pre;
      this.rev_pro = g.rev_pro;
      this.pac_del_sta = g.pac_del_sta;
      this.pac_del_pre = g.pac_del_pre;
      this.pac_del_pro = g.pac_del_pro;
      this.description = g.description;
      this.author_work = g.author_work;
      // tables display manipulation   
      if(g.dont_show_pre === "false" && g.dont_show_pro === "false"){
        $('#sta-pre-pro').css({'display':'block'});
        $('#side-main').css({'display':'block'});
      }
      if(g.dont_show_pre === "true" && g.dont_show_pro === "false"){
          $('#sta-pro').css({'display':'block'});
          $('#side-two').css({'display':'block'});
      }
      if(g.dont_show_pre === "false" && g.dont_show_pro === "true"){
          $('#sta-pre').css({'display':'block'});
          $('#side-three').css({'display':'block'});
      }
      if(g.dont_show_pre === "true" && g.dont_show_pro === "true"){
        $('.single-pack').css({'display':'block'});
        $('#side-main').css({'display':'none'});
        $('#side-one').css({'display':'block'});
      }
      let temp_faq = JSON.parse(g.faq);
      temp_faq.forEach(ele => {
        if(ele.question !== 'undefined' && ele.answer !== 'undefined'){
          this.faq.push(ele);
          this.dis_faq = true;
        }
      })
      this.amount = this.pac_cos_sta;
      this.img1 = g.img1.replace('public','');
      this.items = [
        {name:g.img1.replace('public','')},
        {name:g.img2.replace('public','')},
        {name:g.img3.replace('public','')},
        {name:g.img1.replace('public','')},
        {name:g.img2.replace('public','')},
        {name:g.img3.replace('public','')}
]
      // console.log(this.items);
      this.seller_id = g.user_id;
       
      let user = localStorage.getItem('user');
      if(user == null||user==undefined||user==''){
        this.user_id='';
      }else{
        let u = JSON.parse(user);
        this.user_id = u.id;
      }
      if(this.user_id === g.user_id){
        this.user = false;
      }else{
        this.user = true;
      }
      this.authService.getUser(this.seller_id).subscribe(dat => {
        // console.log(dat);
        let mu = dat.msg;
        this.seller_fname = mu.name;
        this.seller_lname = mu.last_name;
        this.country = mu.country;
        this.pro_pic = mu.profile_pic.replace('public','');
      });

        this.gigService.get_gig_extrs(this.gig_id).subscribe(gig_ext => {
          console.log(gig_ext.msg);
          gig_ext.msg.forEach(extr => {
            if(extr.e_description !== 'undefined' && extr.price !== 'undefined' && extr.e_description !== '' && extr.price !== ''){
              this.ext.push(extr);
              this.dis_ext = true;
            }
          });
        });
          // console.log(this.gig_id);
        this.gigService.get_reviews_gigid(this.gig_id).subscribe(rev => {
          console.log(rev);
          let one =[];
          let two = [];
          let three = [];
          let four = [];
          let five= [];
          let total_rev = [];
          if(rev.msg.length>0){
            rev.msg.buyer_id;
            let avg_rating:number = 0;
            // let score = 0;
            let z = 0;
            let y =0;
            rev.msg.forEach(element => {
              console.log(element.gig_id);
              console.log(this.gig_id);
              if(element.gig_id === this.gig_id){
                // console.log(element);

                let raty = [];
                // score = score + parseInt(element.score);
                avg_rating += parseInt(element.score);
                total_rev.push(element.score);
                y++;
                switch (element.score) {
                  case "5":
                    five.push(element.score);
                    raty = ["../assets/star-on.png","../assets/star-on.png","../assets/star-on.png","../assets/star-on.png","../assets/star-on.png",];
                    z++;
                    break;
                  case "4":
                    four.push(element.score);
                    raty = ["../assets/star-on.png","../assets/star-on.png","../assets/star-on.png","../assets/star-on.png","../assets/star-off.png",];
                    z++;
                    break;
                  case "3":
                    three.push(element.score);
                    raty = ["../assets/star-on.png","../assets/star-on.png","../assets/star-on.png","../assets/star-off.png","../assets/star-off.png",];
                    z++;
                    break;
                  case "2":
                    two.push(element.score);
                    raty = ["../assets/star-on.png","../assets/star-on.png","../assets/star-off.png","../assets/star-off.png","../assets/star-off.png",];
                    z++;
                    break;
                  case "1":
                      one.push(element.score);
                      raty = ["../assets/star-on.png","../assets/star-off.png","../assets/star-off.png","../assets/star-off.png","../assets/star-off.png",];
                      z++;
                      break;
                  case null:
                      raty = ["../assets/star-off.png","../assets/star-off.png","../assets/star-off.png","../assets/star-off.png","../assets/star-off.png",];
                      z++;
                      break;
                    
                  default:
                    break;
                }   
                this.f_avg_rating = Math.round(avg_rating/total_rev.length);
                this.reviews_length = this.total_rev.length;
                this.five_rat = (five.length/total_rev.length)*100+"%";
                this.four_rat = (four.length/total_rev.length)*100+"%";
                this.three_rat = (three.length/total_rev.length)*100+"%";
                this.two_rat = (two.length/total_rev.length)*100+"%";
                this.one_rat = (one.length/total_rev.length)*100+"%";
              switch (this.f_avg_rating) {
                case 0:
                  this.star_one = "../assets/star-off1.png";
                  this.star_two = "../assets/star-off1.png";
                  this.star_three = "../assets/star-off1.png";
                  this.star_four = "../assets/star-off1.png";
                  this.star_five = "../assets/star-off1.png";
                  break;
                case 1:
                  this.star_one = "../assets/star-on1.png";
                  this.star_two = "../assets/star-off1.png";
                  this.star_three = "../assets/star-off1.png";
                  this.star_four = "../assets/star-off1.png";
                  this.star_five = "../assets/star-off1.png";
                  break;
                case 2:
                  this.star_one = "../assets/star-on1.png";
                  this.star_two = "../assets/star-on1.png";
                  this.star_three = "../assets/star-off1.png";
                  this.star_four = "../assets/star-off1.png";
                  this.star_five = "../assets/star-off1.png";
                  break;
                case 3:
                  this.star_one = "../assets/star-on1.png";
                  this.star_two = "../assets/star-on1.png";
                  this.star_three = "../assets/star-on1.png";
                  this.star_four = "../assets/star-off1.png";
                  this.star_five = "../assets/star-off1.png";
                  break;
                case 4:
                  this.star_one = "../assets/star-on1.png";
                  this.star_two = "../assets/star-on1.png";
                  this.star_three = "../assets/star-on1.png";
                  this.star_four = "../assets/star-on1.png";
                  this.star_five = "../assets/star-off1.png";
                  break;
                case 5:
                  this.star_one = "../assets/star-on1.png";
                  this.star_two = "../assets/star-on1.png";
                  this.star_three = "../assets/star-on1.png";
                  this.star_four = "../assets/star-on1.png";
                  this.star_five = "../assets/star-on1.png";
                  break;
              
                default:
                  break;
              }
              this.authService.getUser(element.buyer_id).subscribe(buyer=>{
                  console.log(buyer.msg);
                  if(buyer.success){
                    let object = {
                      name:buyer.msg.name,
                      pro_pic:buyer.msg.profile_pic,
                      date:moment(element.date).format("MMM Do YY"),
                      score:element.score,
                      review:element.review,
                      raty:raty,
                    }
                   this.reviews.push(object);
                   this.rat_num = this.reviews.length;
                  }
                });
              // console.log(this.reviews);
              }
          });
          }else{
              this.f_avg_rating = 0.0;
              this.reviews_length = "0";
              this.five_rat = 0+"%";
              this.four_rat = 0+"%";
              this.three_rat = 0+"%";
              this.two_rat = 0+"%";
              this.one_rat = 0+"%";
              this.star_one = "../assets/star-off1.png";
              this.star_two = "../assets/star-off1.png";
              this.star_three = "../assets/star-off1.png";
              this.star_four = "../assets/star-off1.png";
              this.star_five = "../assets/star-off1.png";
              this.rat_num = 0;
          }        
        })
        
      let fav ={
        gig_id:this.gig_id,
        user_id:this.user_id
      }
    this.gigService.get_fav_gig(fav).subscribe(rs => {
      if(rs.success){
        this.fav_status = true;
      }else{
        this.fav_status = false;
      }
    });
  });
  }
compare_packages(){
  $('body,html').animate({scrollTop:$('.packages-div').offset().top-140},1000);
}
  show_faq(event){
    console.log(event.target);
    $(event.target).parent().parent().find('.faq-ans').slideToggle("fast");
  }

  gotoProfile(id){
    this.router.navigate(['/seller'], { queryParams: {id:id}});
  }

  addtoFav(){
      if(this.authService.loggedIn() === true){
        if(this.seller_id !== this.user_id){
          let fav ={
            gig_id:this.gig_id,
            user_id:this.user_id
          }
               this.gigService.add_to_fav(fav).subscribe(res => {
                 if(res.msg1 == 'added to favorites'){
                   this.fav_status = true;
                   this.authService.getUser(this.user_id).subscribe(buyer => {
                    if(buyer.success){
                      let new_not_s = {
                        user_id:this.seller_id,
                        message:buyer.msg.name+buyer.msg.last_name +""+"Added your GIG to favorites",
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
                 if(res.msg == 'removed from favorites'){
                   this.fav_status = false;
                 }
               });
        }else{
          let msg = {
            text:"You can't add your own GIG to favorites"
          }
          this.app.error_pop(msg);
        }
      }else{
        this.app.showBackLogin(true);
      }
  }

    order_service(){
      if(this.authService.loggedIn() === true){
        if(this.seller_id !== this.user_id){
          this.router.navigate(['/checkout'],{queryParams:{gig_id:this.gig_id,user_id:this.user_id, pack: this.selected_pack}});
          localStorage.setItem('selected_package',this.selected_pack);
          localStorage.setItem('extras',JSON.stringify(this.extras));
        }else{
          let msg = {
            text:"You can't buy your own GIG"
          }
          this.app.error_pop(msg);
        }
      }else{
        this.app.showBackLogin(true);
      }
    }
    
    selected_package(pack){
      switch (pack) {
        case 'standard':
        this.amount = this.pac_cos_sta;
        this.del_days = this.pac_del_sta;
        this.selected_pack = 'standard';
        this.pac_det = this.pac_det_sta;
        this.revisions = this.rev_sta;
        this.days = this.pac_del_sta;
        this.hq_file = this.hq_sta;
        this.sf_file = this.sf_sta;
        this.amount = this.pac_cos_sta;
        $('.package-select-btns').removeClass('pack-selected');
        $('.package-select-btns').html('Select');
        $('#standard-select-btn').addClass('pack-selected');
        $('#standard-select-btn').html('Selected <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">   ');
       
        this.amount = this.pac_cos_sta;

        $('#sta').addClass('zoom-after');
        $('#sta').css({'border':'1px solid red'});
        $('#sta-ht').html('Standard <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">   ');
        $('#pre').removeClass('zoom-after');
        $('#pro').removeClass('zoom-after');
        $('#pre').css({'border':'0.5px solid #ddd'});
        $('#pro').css({'border':'0.5px solid #ddd'});
        $('#pre-ht').html('Premium ');
        $('#pro-ht').html('Professional ');
        
        break;
        case 'premium':
        this.amount = this.pac_cos_pre;
        this.del_days = this.pac_del_pre;
        this.selected_pack = 'premium';
        this.pac_det = this.pac_det_pre;
        this.revisions = this.rev_pre;
        this.days = this.pac_del_pre;
        this.hq_file = this.hq_pre;
        this.sf_file = this.sf_pre;
        this.amount = this.pac_cos_pre;
        $('.package-select-btns').removeClass('pack-selected');
        $('.package-select-btns').html('Select');
        $('#premium-select-btn').addClass('pack-selected');
        $('#premium-select-btn').html('Selected <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">');
        this.amount = this.pac_cos_pre;

        $('#pre-ht').html('Premium <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">   ');
        $('#pre').css({'border':'1px solid red'});
        $('#pre').addClass('zoom-after');
        $('#sta-ht').html('Standard');
        $('#sta').css({'border':'0.5px solid #ddd'});
        $('#pro-ht').html('Professioanl');
        $('#pro').css({'border':'0.5px solid #ddd'});
        $('#sta').removeClass('zoom-after');
        $('#pro').removeClass('zoom-after');
      
        break;
        case 'pro':
        this.amount = this.pac_cos_pro;
        this.del_days = this.pac_del_pro;
        this.selected_pack = 'pro';
        this.pac_det = this.pac_det_pro;
        this.revisions = this.rev_pro;
        this.days = this.pac_del_pro;
        this.hq_file = this.hq_pro;
        this.sf_file = this.sf_pro;
        this.amount = this.pac_cos_pro;
        $('.package-select-btns').removeClass('pack-selected');
        $('.package-select-btns').html('Select');
        $('#pro-select-btn').addClass('pack-selected');
        $('#pro-select-btn').html('Selected <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">'); 
        this.amount = this.pac_cos_pro;

        $('#pro-ht').html('Professional <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">   ');
        $('#pro').addClass('zoom-after');
        $('#pro').css({'border':'1px solid red'});
        $('#pre-ht').html('Premium');
        $('#sta-ht').html('Standard');
        $('#pre').css({'border':'0.5px solid #ddd'});
        $('#sta').css({'border':'0.5px solid #ddd'});
        $('#pre').removeClass('zoom-after');
        $('#sta').removeClass('zoom-after');
       
        break;

        default:
        break;
      }
    }
    selected_package_sta_pre(pack){
      switch (pack) {
        case 'standard':
        this.amount = this.pac_cos_sta;
        this.del_days = this.pac_del_sta;
        this.selected_pack = 'standard';
        this.pac_det = this.pac_det_sta;
        this.revisions = this.rev_sta;
        this.days = this.pac_del_sta;
        this.hq_file = this.hq_sta;
        this.sf_file = this.sf_sta;
        this.amount = this.pac_cos_sta;
        $('.btn-sta-pre').removeClass('pack-selected');
        $('.btn-sta-pre').html('Select');
        $('#standard-select-btn-sta-pre').addClass('pack-selected');
        $('#standard-select-btn-sta-pre').html('Selected <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">   ');
       
        this.amount = this.pac_cos_sta;

        $('#sta-pre-pre').removeClass('zoom-after');
        $('#sta-pre-sta').addClass('zoom-after');
        $('#sta-pre-sta').css({'border':'1px solid red'});
        $('#sta-pre-sta-ht').html('Standard <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">   ');
        $('#sta-pre-pre').css({'border':'0.5px solid #ddd'});
        $('#sta-pre-pre-ht').html('Premium ');
        
        break;
        case 'premium':
        this.amount = this.pac_cos_pre;
        this.del_days = this.pac_del_pre;
        this.selected_pack = 'premium';
        this.pac_det = this.pac_det_pre;
        this.revisions = this.rev_pre;
        this.days = this.pac_del_pre;
        this.hq_file = this.hq_pre;
        this.sf_file = this.sf_pre;
        this.amount = this.pac_cos_pre;
      
        $('.btn-sta-pre').removeClass('pack-selected');
        $('.btn-sta-pre').html('Select');
        $('#premium-select-btn-sta-pre').addClass('pack-selected');
        $('#premium-select-btn-sta-pre').html('Selected <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">');
        this.amount = this.pac_cos_pre;

        $('#sta-pre-pre-ht').html('Premium <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">   ');
        $('#sta-pre-pre').css({'border':'1px solid red'});
        $('#sta-pre-pre').addClass('zoom-after');
        $('#sta-pre-sta-ht').html('Standard');
        $('#sta-pre-sta').css({'border':'0.5px solid #ddd'});
        $('#sta-pre-sta').removeClass('zoom-after');
      
        break;

        default:
        break;
      }
    }
    selected_package_sta_pro(pack){
      switch (pack) {
        case 'standard':
        this.amount = this.pac_cos_sta;
        this.del_days = this.pac_del_sta;
        this.selected_pack = 'standard';
        this.pac_det = this.pac_det_sta;
        this.revisions = this.rev_sta;
        this.days = this.pac_del_sta;
        this.hq_file = this.hq_sta;
        this.sf_file = this.sf_sta;
        this.amount = this.pac_cos_sta;
        $('.btn-sta-pro').removeClass('pack-selected');
        $('.btn-sta-pro').html('Select');
        $('#standard-select-btn-sta-pro').addClass('pack-selected');
        $('#standard-select-btn-sta-pro').html('Selected <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">   ');

        this.amount = this.pac_cos_sta;

        $('#sta-pro-pro').removeClass('zoom-after');
        $('#sta-pro-sta').addClass('zoom-after');
        $('#sta-pro-sta').css({'border':'1px solid red'});
        $('#sta-pro-sta-ht').html('Standard <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">   ');
        $('#sta-pro-pro').css({'border':'0.5px solid #ddd'});
        $('#sta-pro-pro-ht').html('Premium ');
        break;
       
        case 'pro':
        this.amount = this.pac_cos_pro;
        this.del_days = this.pac_del_pro;
        this.selected_pack = 'pro';
        this.pac_det = this.pac_det_pro;
        this.revisions = this.rev_pro;
        this.days = this.pac_del_pro;
        this.hq_file = this.hq_pro;
        this.sf_file = this.sf_pro;
        this.amount = this.pac_cos_pro;
      
        $('.btn-sta-pro').removeClass('pack-selected');
        $('.btn-sta-pro').html('Select');
        $('#pro-select-btn-sta-pro').addClass('pack-selected');
        $('#pro-select-btn-sta-pro').html('Selected <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">   '); 

        this.amount = this.pac_cos_pro;

        $('#sta-pro-pro-ht').html('Premium <img src="../assets/icons/gig_details_table_tick.png" width="12px" height="12px">   ');
        $('#sta-pro-pro').css({'border':'1px solid red'});
        $('#sta-pro-pro').addClass('zoom-after');
        $('#sta-pro-sta-ht').html('Standard');
        $('#sta-pro-sta').css({'border':'0.5px solid #ddd'});
        $('#sta-pro-sta').removeClass('zoom-after');
       
        break;

        default:
        break;
      }
    }
    extras:any={};
    addToCheckout(ext_id,event){
     
        if(this.extras[ext_id] === undefined || this.extras[ext_id] === null){
          this.extras[ext_id]=ext_id;   
        }else{
          this.extras[ext_id]= null; 
        }
    }
    go_to_inbox(){
      if(this.authService.loggedIn() === true){
        if(this.seller_id !== this.user_id){
          let new_conv = {
            from:this.user_id,
            to:this.seller_id,
          }
          this.gigService.check_conversation(new_conv).subscribe(res =>{
          if(res.success){
            if(res.msg[0] !== null && res.msg[0] !== undefined){
              this.router.navigate(['/inbox'],{queryParams:{seller_id:this.seller_id,conv_id:res.msg[0].conv_id}});
          }else{
            this.router.navigate(['/inbox'],{queryParams:{seller_id:this.seller_id,conv_id:res.msg.conv_id}});
          }
            }
          });
        }else{
          let msg = {
            text:"You can't message your self"
          }
          this.app.error_pop(msg);
        }
      }else{
        this.app.showBackLogin(true);
      }
    }
    go_to_cat(category){
      switch (category) {
        case "Online Resumes":
          this.router.navigate(['/categories'],{queryParams:{cat:'or'}})
          break;
          case "Resume and Cover Letters":
          this.category = 'Resume and Cover Letters';
          this.router.navigate(['/categories'],{queryParams:{cat:'rc'}})
          break;
          case "Visual Resumes":
          this.category = 'Visual Resumes';
          this.router.navigate(['/categories'],{queryParams:{cat:'vr'}})
          break;
          case "Linkedin profiles":
          this.category = 'Linkedin profiles';
          this.router.navigate(['/categories'],{queryParams:{cat:'lp'}})
          break;
      
        default:
          break;
      }
    }
  }
    

