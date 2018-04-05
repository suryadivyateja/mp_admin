import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AppComponent } from "../app.component";
import { AuthService } from "../services/auth.service";
import { GigService } from "../services/gig.service";
import { setInterval } from 'timers';
import * as moment from 'moment';
import { element } from 'protractor';
import { type } from 'os';
import { MockNgModuleResolver } from '@angular/compiler/testing';
import { log } from 'util';
declare var require: any;
require('raty-js');
// import raty from 'raty-js';
declare var $:any;


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private title: Title,private authService : AuthService,private gigService:GigService,private activatedRoute:ActivatedRoute , private router:Router,private app:AppComponent) { }

  gigs=[];
  all_gigs = [];
  rc_gigs = [];
  or_gigs = [];
  vr_gigs = [];
  lp_gigs = [];
  ever_gigs = [];
  rc_num:number;
  or_num:number;
  vr_num:number;
  lp_num:number;
  all_len:number;

  first_name:string;
  last_name:string;
  user_id:string;
  sort:string;
  cat:string;
  pro_pic:string;
  list_gigs = [];
  fav_status;
  selected_cat:string;
  assigned_days;
  total_ext_days;
  project_days;
  pro_com_date;
  projects_completed=[];
  num_pro_com;
  score;
  ngOnInit() {
    
    // $(document).ready(
    //   function toggleVideo(state) {
    //     // if state == 'hide', hide. Else: show video
    //     var div = document.getElementById("popupVid");
    //     var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    //     div.style.display = state == 'hide' ? 'none' : '';
    //     var func = state == 'hide' ? 'pauseVideo' : 'playVideo';
    //     iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
    //   }
    // );

    this.title.setTitle('Categories - Market Place');
    $(".cat-btns").click(function () {
      if ($(this).parent().find('.sub-cat-cats').is(':visible')) {
        $(this).parent().find('.sub-cat-cats').hide();
      } else {
        $(this).parent().find('.sub-cat-cats').show();
      }
      $(".cat-btns").removeClass("cat-selected");
      $(this).addClass("cat-selected");
      var id = $(this).attr("id");
      if (id == "rc-btn") {
        var cat = "rc";
        var catt = "Resumes and Cover Letters";
      }
      if (id == "or-btn") {
        var cat = "or";
        var catt = "Online Resumes";
      }
      if (id == "vr-btn") {
        var cat = "vr";
        var catt = "Visual Resumes";
      }
      if (id == "lp-btn") {
        var cat = "lp";
        var catt = "LinkedIn Profile";
      }
      if (id == "ph1-btn") {
        var cat = "ph1";
        var catt = "Online Resumes";
      }
      if (id == "ph2-btn") {
        var cat = "ph2";
        var catt = "Online Resumes";
      }

    });

    $("#grid-ico").click(function () {
      $("#list-ico").removeClass("v-selected");
      $("#grid-ico").addClass("v-selected");
      $(".h-gigs-div").hide();
      $(".featured-gigs-div,.gigs-core").show();
    });
    $("#list-ico").click(function () {
      $("#grid-ico").removeClass("v-selected");
      $("#list-ico").addClass("v-selected");
      $(".featured-gigs-div,.gigs-core").hide();
      $(".h-gigs-div").show();
    });
    $('.play-vid-btn').click(function () {
      $('.h-vid-div').show();
    });
    $('.c-btn').click(function () {
      $('.h-vid-div').hide();
    });

    let user = localStorage.getItem('user');
    if(user == null||user==undefined||user==''){
      this.user_id='';
    }else{
      let u = JSON.parse(user);
      this.user_id = u.id;
    }
   
    this.gigService.get_all_gigs().subscribe(re => {
      console.log(re);
      this.all_len = re.msg.length;
      // console.log(this.all_len);
      if(re.msg.length>0){
        re.msg.forEach(element => {
          if(!element.pause){
            element['gig_img_main'] = element.img1.replace('public','');
            this.authService.getUser(element.user_id).subscribe(user => {
              element['name']=user.msg.name;
              element['profile_pic']=user.msg.profile_pic.replace('public','');
            })
            let fav ={
              gig_id:element._id,
              user_id:this.user_id
            }
            this.gigService.get_fav_gig(fav).subscribe(fav => {
              this.gigService.get_orders_seller(element.user_id).subscribe(order => {
                if(order.msg.length !== 0){
                  let projects_done = 0;
                  let jobs_done = 0;
                  order.msg.forEach(order => {
                    if(order.gig_id === element._id){
                      if(order.order_status === 'Order Delivered'){                    
                          jobs_done++
                        }
                        element['num_of_pro_com'] = jobs_done;             
                    }else{
                      element['num_of_pro_com'] = jobs_done;  
                    }
                  });
                }else{
                  element['num_of_pro_com']=0;    
                }                              
              if(fav.msg.length > 0){
                element['fav_status']=true;
              }if(fav.msg == 'No gig'){
                element['fav_status']=false;
              }
                // rc
            if(element.category == 'rc'){
              this.rc_gigs.push(element);
              element['category'] = "Resume/CV";
            }
            // or
            if(element.category == 'or'){
              this.or_gigs.push(element);
              element['category']="Cover Letters";
            }
            // vr
            if(element.category == 'vr'){
              this.vr_gigs.push(element);
              element['category']="LinkedIn Makeover";
            }
            // lp
            if(element.category == 'lp'){
              this.lp_gigs.push(element);
              element['category']="Selection Criteria";
            }
            if(element.category == 'rl'){
              // this.lp_gigs.push(element);
              element['category']="Reference Letters";
            }
            })  
          })    
          this.gigService.get_reviews_gigid(element._id).subscribe(raty => {
            //  console.log(raty);
            if(raty.msg.length > 0){
              let total_score:number = 0;
              let avg_score:number = 0;
              raty.msg.forEach(rating => {
                total_score += parseInt(rating.score);
              })
              // console.log(Math.round(total_score/raty.msg.length));
              avg_score = Math.round(total_score/raty.msg.length);
              switch (avg_score) {
                case 1:
                    element['star1'] = "../assets/star-on1.png" ;
                    element['star2'] = "../assets/star-off1.png" ;
                    element['star3'] = "../assets/star-off1.png" ;
                    element['star4'] = "../assets/star-off1.png" ;
                    element['star5'] = "../assets/star-off1.png" ;
                    element['rating'] = 1;
                break;
                   
                case 2:
                    element['star1'] = "../assets/star-on1.png" ;
                    element['star2'] = "../assets/star-on1.png" ;
                    element['star3'] = "../assets/star-off1.png" ;
                    element['star4'] = "../assets/star-off1.png" ;
                    element['star5'] = "../assets/star-off1.png" ;
                    element['rating'] = 2;
                break;
                  
                case 3:
                    element['star1'] = "../assets/star-on1.png" ;
                    element['star2'] = "../assets/star-on1.png" ;
                    element['star3'] = "../assets/star-on1.png" ;
                    element['star4'] = "../assets/star-off1.png" ;
                    element['star5'] = "../assets/star-off1.png" ;
                    element['rating'] = 3;
                break;
                   
                case 4:
                    element['star1'] = "../assets/star-on1.png" ;
                    element['star2'] = "../assets/star-on1.png" ;
                    element['star3'] = "../assets/star-on1.png" ;
                    element['star4'] = "../assets/star-on1.png" ;
                    element['star5'] = "../assets/star-off1.png" ;
                    element['rating'] = 4;                        
                break;
  
                case 5:
                    element['star1'] = "../assets/star-on1.png" ;
                    element['star2'] = "../assets/star-on1.png" ;
                    element['star3'] = "../assets/star-on1.png" ;
                    element['star4'] = "../assets/star-on1.png" ;
                    element['star5'] = "../assets/star-on1.png" ;
                    element['rating'] = 5;    
                break;
                  
                default:
                break;
              }
            }else{
              element['star1'] = "../assets/star-off1.png" ;
              element['star2'] = "../assets/star-off1.png" ;
              element['star3'] = "../assets/star-off1.png" ;
              element['star4'] = "../assets/star-off1.png" ;
              element['star5'] = "../assets/star-off1.png" ;
              element['rating'] = 0;
            }
           });
           this.all_gigs.push(element);
          }
      });
      this.gigs = this.all_gigs;
      this.ever_gigs = this.all_gigs;
      this.list_gigs = this.all_gigs;
      console.log(this.gigs);
        // aggrigate
        this.rc_num = this.rc_gigs.length;
        this.or_num = this.or_gigs.length;
        this.vr_num = this.vr_gigs.length;
        this.lp_num = this.lp_gigs.length;
      }else{
        $('.gigs-div').html("NO GIGS TO SHOW :(");
        $('.gigs-div').css("background-color","grey");
      }

        if(this.activatedRoute.queryParams['_value'].cat){
          switch (this.activatedRoute.queryParams['_value'].cat) {
            case 'all':
              this.gigs = this.all_gigs;
              this.list_gigs = this.all_gigs;
              this.selected_cat = "All Gigs";
              // $('#all-products').addClass('cat-selected');
              break;
            case 'rc':
              this.gigs = this.rc_gigs;
              this.list_gigs = this.all_gigs; 
              this.selected_cat = "Resume and Cover Letters";            
              $('#rc').addClass('cat-selected');
              break;
            case 'or':
              this.gigs = this.or_gigs;
              this.list_gigs = this.all_gigs;
              this.selected_cat = "Online Resumes";
              // $('#or').addClass('cat-selected');
              break;
            case 'vr':
              this.gigs = this.vr_gigs;
              this.list_gigs = this.all_gigs;
              this.selected_cat = "Visual Resumes";
              // $('#vr').addClass('cat-selected');
              break;  
            case 'lp':
              this.gigs = this.lp_gigs;
              this.list_gigs = this.all_gigs;
              this.selected_cat = "Linkedin Profiles"
              // $('#lp').addClass('cat-selected');
              break;   
          }
        }else{
            this.gigs=this.all_gigs;
            this.selected_cat = "All Gigs";
            // $('#all-products').addClass('cat-selected');
        }

    });
    

   
    this.authService.getUser(this.user_id).subscribe(re =>{
      let u = re.msg;
      this.first_name = u.first_name;
      this.last_name = u.last_name;
      this.pro_pic = u.profile_pic.replace('public','');
  });

      $('#rating').raty({
        starOn:'../assets/star-on1.png', 
      starOff:'../assets/star-off1.png',
      starHalf:'../assets/star-half.png',
      half: false ,
      number:     5,
      click: (score) => {
          this.score = score;
          localStorage.setItem('score',this.score);
          this.filter_by_rating(score);
      }
    });
    // $('#raty').html('hii');
  }

  // showList
  showList(event){
    $('.sort-filter-container').css({'display':'block'});
    $('.home-gig-container1').css({'display':'none'});
    $('#grid-ico').attr("src","../assets/icons/category/001_grid_1.png");
    $('#list-ico').attr("src","../assets/icons/category/001_list_2.png")
  }
  showGrid(event){
    $('.sort-filter-container').css({'display':'none'});
    $('.home-gig-container1').css({'display':'block'});
    // console.log(event);
    // $(event.target).html('<img src="../assets/icons/category/001_grid_2.png" width="20px" height="20px">')
    $('#grid-ico').attr("src","../assets/icons/category/001_grid_2.png");
    $('#list-ico').attr("src","../assets/icons/category/001_list_1.png")
  }


  gotoGig(id){
    this.router.navigate(['/gig'], { queryParams: {id:id}});
  }

  toggleVideo(cat){
    // alert('hii');
    switch (cat) {
      case 'show':
        $('.h-vid-div').show();
        // alert('hii');
        break;
      case 'hide':
        $('.h-vid-div').hide();
        break;
    
      default:
        break;
    }
  }

  gigs_get(cat){     
    // alert('nj');
    switch (cat) {
          case "all":
            this.gigs = this.all_gigs;
            this.list_gigs = this.all_gigs; 
            this.selected_cat = "All Gigs";
            break;
          case "rc":
            this.gigs = this.rc_gigs;
            this.list_gigs = this.rc_gigs;
            this.selected_cat = "Resume and Cover Letters";
            break;
            case "or":
            this.gigs = this.or_gigs;
            this.list_gigs = this.or_gigs;     
            this.selected_cat = "Online Resumes";      
            break;
            case "vr":
            this.gigs = this.vr_gigs;
            this.list_gigs = this.vr_gigs; 
            this.selected_cat = "Visual Resumes";           
            break;
            case "lp":
            this.gigs = this.lp_gigs;
            this.list_gigs = this.lp_gigs; 
            this.selected_cat = "Linkedin Profiles";
            break;
          default:
            break;
        }
    }
  filter(){
      switch ($('#filt-sort').val()) {
        case 'Most Recent':
         let this_month_gigs = [];
         this.ever_gigs.forEach(element => {
           if(element.time !== undefined){
             if(moment(element.time).add(28 , 'days').format('MMM Do YYYY') > moment().format('MMM Do YYYY')){
               console.log(true);
               this_month_gigs.push(element);
             }
           }
          });
          this.gigs = this_month_gigs;
          this.list_gigs = this_month_gigs;
          break;
        case 'High to Low':
          var gigs = this.ever_gigs;
         gigs.sort(function(a,b){
            return b.pac_cos_sta - a.pac_cos_sta;
          });
         this.gigs = gigs;
        this.list_gigs = gigs;
          break;
        case 'Low to High':
          var gigs = this.ever_gigs;
          gigs.sort(function(a,b){
            return a.pac_cos_sta - b.pac_cos_sta;
          });
         this.gigs = gigs;
          this.list_gigs = gigs;
          break;
        case 'Most Sold':
        // this.gigService.get_all
        break;
      
        default:
          break;
      }
  }
  delivery_days_filter(days){
    switch (days) {
      case 1:
        let one_day = [];
        this.ever_gigs.forEach(element => {
            if(element.pac_cos_sta == '1'){
              one_day.push(element);
            }
        });
        this.gigs = one_day;
        this.list_gigs = one_day;
        break;
      case 3:
        let three_days = [];
        this.ever_gigs.forEach(element => {
          if(element.pac_cos_sta < '3'){
            three_days.push(element);
          }
        });
        this.gigs = three_days;
        this.list_gigs = three_days;
      break;
      case 7:
        let seven_days = [];
        this.ever_gigs.forEach(element => {
          if(element.pac_cos_sta < '7'){
            seven_days.push(element);
          }
        });
        this.gigs = seven_days;
        this.list_gigs = seven_days;
      break;
      case 'any':
        this.gigs = this.ever_gigs;
        this.list_gigs = this.ever_gigs;
      break;
      default:
        break;
    }
  }

  filter_by_rating(score){
   
      switch (score) {
        case 5:
              let r_five = [];
            this.ever_gigs.forEach(element => {
              if(element.rating === 5){
                r_five.push(element);
              }
            });
            this.gigs = r_five;
            this.list_gigs = r_five;
          break;
        case 4:
       
              let r_four = [];
            this.ever_gigs.forEach(element => {
              if(element.rating === 4){
                r_four.push(element);
              }
            });
            this.gigs = r_four;
            this.list_gigs = r_four
          break;
        case 3:
              let r_three = [];
            this.ever_gigs.forEach(element => {
              if(element.rating === 3){
                r_three.push(element);
              }
            });
            this.gigs = r_three;
            this.list_gigs = r_three;
          break;
        case 2:
              let r_two = [];
            this.ever_gigs.forEach(element => {
              if(element.rating === 2){
                r_two.push(element);
              }
            });
            this.gigs = r_two;
            this.list_gigs = r_two;
          break;
        case 1:
              let r_one = [];
            this.ever_gigs.forEach(element => {
              if(element.rating === 1){
                r_one.push(element);
              }
            });
            this.gigs = r_one;
            this.list_gigs = r_one;
          break;
        case 0:
              let r_zero = [];
            this.ever_gigs.forEach(element => {
              if(element.rating === 0){
                r_zero.push(element);
              }
            });
            this.gigs = r_zero;
            this.list_gigs = r_zero;
          break;
      
        default:
          break;
      }
  }
    addtoFav(gig_id,user_id,gig){  
      if(this.authService.loggedIn() === true){
        if(user_id !== this.user_id){
          let fav ={
            gig_id:gig_id,
            user_id:this.user_id
          }
          this.gigService.add_to_fav(fav).subscribe(res => {
            if(res.msg1 == 'added to favorites'){
             this.all_gigs.forEach(element => {
               if(element._id == gig_id){                
                 element.fav_status = true;
                 element.fav_status = true;
               }                        
             });    
             this.authService.getUser(this.user_id).subscribe(buyer => {
              if(buyer.success){
                let new_not_s = {
                  user_id:gig.user_id,
                  message:buyer.msg.name+buyer.msg.last_name +""+"Added your GIG to favorites",
                  date:moment(),
                  status:"not_seen",
                  image:buyer.msg.profile_pic,
                  destination:"gig",
                  link:gig_id
                }
                this.gigService.post_notification(new_not_s).subscribe(not_s =>{
                  console.log(not_s);
                });
              }   
            });         
           }
           if(res.msg == 'removed from favorites'){
             this.all_gigs.forEach(element => {
               if(element._id == gig_id){                
                 element.fav_status = false;
                 element.fav_status = false;
               }                        
             }); 
           }
          })
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
  }
  


