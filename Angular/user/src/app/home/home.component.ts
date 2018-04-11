import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd , ActivatedRoute} from "@angular/router";
import { AppComponent } from "../app.component";
import { AuthService } from "../services/auth.service";
import { GigService } from "../services/gig.service";
import * as moment from 'moment';
// import Typed from 'typed.js';
import * as Typed from "typed.js"
declare var require: any;
require ('raty-js');
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  loggedIn = false;
  id:string;
  gig_title:string;
  gigs = [];
  user_id:string;
  first_name:string;
  last_name:string;
  seller_id:string;
  all_gigs = [];
  rc_gigs=[];
  or_gigs=[];
  vr_gigs=[];
  lp_gigs=[];
  jobs_done:number;
  user:boolean;
  searchtext:string;
  search_result = [];
  ever_gigs = [];
  constructor(private title: Title,private router:Router,private activatedRoute: ActivatedRoute,private authService:AuthService, private gigService:GigService,private app:AppComponent) { }

  ngOnInit() {

    this.title.setTitle('Market Place - Home');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
      let user = localStorage.getItem('user');
      
      if(user == '' || user == null || user == undefined){
        this.user_id = '';
      }else{
        let u = JSON.parse(user);
        this.user_id = u.id;
      }
    this.gigService.get_all_gigs().subscribe(dat => {
      console.log(dat);
      this.ever_gigs = dat.msg;
      if(dat.success){
        // this.all_gigs = dat.msg;              
        dat.msg.forEach(element => {
          console.log(element.img1);
            if(!element.pause){
              if(element.user_id === this.user_id){
                element['add'] = false;
              }else{
                element['add'] = true;
              }
  
              // category
              switch (element.category) {
                case 'rc':
                  element['cat'] = "Resume/CV"
                  break;
                case 'or':
                  element['cat'] = "Cover Letters"
                  break;
                case 'vr':
                  element['cat'] = "LinkedIn Makeover"
                  break;
                case 'lp':
                  element['cat'] = "Selection Criteria"
                  break;
                case 'rl':
                  element['cat'] = "Reference Letter"
                  break;
              
                default:
                  break;
              }
              element['gig_img']=element.img1.replace('public','');
              let fav ={
                gig_id:element._id,
                user_id:this.user_id
              }
              this.gigService.get_fav_gig(fav).subscribe(fav => {
                // console.log(fav.msg);
                  if(fav.msg.length > 0){
                    element['fav_status']=true;
                  }if(fav.msg == 'No gig'){
                    element['fav_status']=false;
                  }
                  if(element.category == 'rc'){
                    this.rc_gigs.push(element); 
                  }
                  if(element.category == 'or'){
                    this.or_gigs.push(element);
                  }
                  if(element.category == 'vr'){
                    this.vr_gigs.push(element);
                  }
                  if(element.category == 'lp'){
                    this.lp_gigs.push(element);
                  }
                
              })   
                 this.authService.getUser(element.user_id).subscribe(user => {
                   element['name'] = user.msg.name;
                 }); 
                 this.gigService.get_orders_seller(element.user_id).subscribe(order => {
                  if(order.msg.length >0){
                    let i = 0;
                   order.msg.forEach(order => {
                     if(order.gig_id === element._id){
                       if(order.order_status === 'Order Delivered'){
                          i++;
                       }else{
                          i;
                       }
                       element['jobs_done'] = i;
                     }else{
                       element['jobs_done'] = i;
                     }
                   });
                  }else{
                    element['jobs_done'] = 0;
                  }
                 })
                              
                 this.gigService.get_reviews_gigid(element._id).subscribe(raty => {
                  //  console.log(raty);
                   let one=[];
                   let two=[];
                   let three=[];
                   let four=[];
                   let five=[];
                   let total_stars;
                   raty.msg.forEach(rev => {
                     switch (rev.score) {
                          case '1':
                            one.push(rev);  
                            break;
                          case '2':
                            two.push(rev);
                            break;
                            case '3':
                            three.push(rev);
                            break;
                            case '4':
                            four.push(rev);
                            break;
                            case '5':
                            five.push(rev);
                            break;
                        
                          default:
                            break;
                        }
                      });
                      total_stars = Math.round(((1*one.length)+(2*two.length)+(3*three.length)+(4*four.length)+(5*five.length))/(one.length+two.length+three.length+four.length+five.length));
                      
                      if(isNaN(total_stars)){
                         element['star1'] = "../assets/star-off.png" ;
                          element['star2'] = "../assets/star-off.png" ;
                          element['star3'] = "../assets/star-off.png" ;
                          element['star4'] = "../assets/star-off.png" ;
                          element['star5'] = "../assets/star-off.png" ;
                      }else{
                        switch (total_stars) {
                          case 1:
                          element['star1'] = "../assets/star-on.png" ;
                          element['star2'] = "../assets/star-off.png" ;
                          element['star3'] = "../assets/star-off.png" ;
                          element['star4'] = "../assets/star-off.png" ;
                          element['star5'] = "../assets/star-off.png" ;
                            break;
                          case 2:
                          element['star1'] = "../assets/star-on.png" ;
                          element['star2'] = "../assets/star-on.png" ;
                          element['star3'] = "../assets/star-off.png" ;
                          element['star4'] = "../assets/star-off.png" ;
                          element['star5'] = "../assets/star-off.png" ;
                            break;
                          case 3:
                          element['star1'] = "../assets/star-on.png" ;
                          element['star2'] = "../assets/star-on.png" ;
                          element['star3'] = "../assets/star-on.png" ;
                          element['star4'] = "../assets/star-off.png" ;
                          element['star5'] = "../assets/star-off.png" ;
                          break;
                          case 4:
  
                          element['star1'] = "../assets/star-on.png" ;
                          element['star2'] = "../assets/star-on.png" ;
                          element['star3'] = "../assets/star-on.png" ;
                          element['star4'] = "../assets/star-on.png" ;
                          element['star5'] = "../assets/star-off.png" ;
                            break;
                          case 5:
                          element['star1'] = "../assets/star-on.png" ;
                          element['star2'] = "../assets/star-on.png" ;
                          element['star3'] = "../assets/star-on.png" ;
                          element['star4'] = "../assets/star-on.png" ;
                          element['star5'] = "../assets/star-on.png" ;
                            break;
                        
                          default:
                            break;
                        }
                      }
                    });   
                    this.all_gigs.push(element);
            }
          });
            this.gigs = this.all_gigs.slice(0,12); 
            console.log(this.gigs);
      }
    });
    $('#raty-review').raty({
      // score:3,
      starOn:'../../assets/star-on.png', 
    starOff:'../../assets/star-off.png',
    starHalf:'../../assets/star-half.png',
    half: false ,
    number:     5,
    readOnly:true,
    });

    $('.search-bar').keyup(() => {
      let search_arr = [];
      let text = $('.search-bar').val();
      console.log(text.length);
      if(text.length === 0){
        search_arr = [];
        this.search_result = []
      }else{
        // console.log(gigs);
        this.ever_gigs.forEach(gig => {
          if(gig.title.toLowerCase().includes(text.toLowerCase())){
            gig['gig_image'] = gig.img1.replace('public','');
            this.authService.getUser(gig.user_id).subscribe(seller => {
              if(seller.success){
                let s = seller.msg;
                gig['seller_name'] = s.name+" "+s.last_name;
              }
            })
          search_arr.push(gig);
          }
        });
      }
      this.search_result = search_arr;
    });

    $(".home-gigs-row").on('mouseenter', '.gig', () => {
        console.log($(this).children());
    });
  }

  goto(string,obj){
    switch (string) {
      case 'title':
        this.router.navigate(['/gig'],{queryParams:{id:obj._id}});
        break;
      case 'author':
        this.router.navigate(['/seller'],{queryParams:{id:obj.user_id}});
        break;
    
      default:
        break;
    }
  }

  radio(num){
    switch (num) {
      case "1":
        $('#text1').css({'display':'block'});
        $('#text2').css({'display':'none'});
        $('#text3').css({'display':'none'});
        $('#text4').css({'display':'none'});
        $('#rad1').addClass('rad-but');
        $('#rad2').removeClass('rad-but');
        $('#rad3').removeClass('rad-but');
        $('#rad4').removeClass('rad-but');
        break;
      case "2":
      $('#text2').css({'display':'block'});
      $('#text1').css({'display':'none'});
      $('#text3').css({'display':'none'});
      $('#text4').css({'display':'none'});
      $('#rad2').addClass('rad-but');
      $('#rad1').removeClass('rad-but');
      $('#rad3').removeClass('rad-but');
      $('#rad4').removeClass('rad-but');
        break;
      case "3":
      $('#text3').css({'display':'block'});
      $('#text2').css({'display':'none'});
      $('#text1').css({'display':'none'});
      $('#text4').css({'display':'none'});
      $('#rad3').addClass('rad-but');
      $('#rad2').removeClass('rad-but');
      $('#rad1').removeClass('rad-but');
      $('#rad4').removeClass('rad-but');
        break;
      case "4":
      $('#text4').css({'display':'block'});
      $('#text2').css({'display':'none'});
      $('#text3').css({'display':'none'});
      $('#text1').css({'display':'none'});
      $('#rad4').addClass('rad-but');
      $('#rad2').removeClass('rad-but');
      $('#rad3').removeClass('rad-but');
      $('#rad1').removeClass('rad-but');
        break;
    
      default:
        break;
    }
  }

  navToCategories(){
    this.router.navigateByUrl('/categories');
  }

  gotoGig(id){
    this.router.navigate(['/gig'], { queryParams: {id:id}});
  }

buyer_id:string;
  addtoFav(gig_id,event,gig){
    // console.log(event);
    if(this.authService.loggedIn() === true){
      if(gig.add === true){
        let fav ={
          gig_id:gig_id,
          user_id:this.user_id
        }
        // console.log(fav);
        this.gigService.add_to_fav(fav).subscribe(res => {
          if(res.msg1 == 'added to favorites'){
            this.all_gigs.forEach(element => {
              if(element._id == gig_id){                
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
              }   
              // console.log(this.gigs);
            }); 
          }
          // console.log(res);
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
  get_gigs(cat){
    switch (cat) {
      case 'rc':
        this.gigs = this.rc_gigs;
        break;
        case 'or':
        this.gigs = this.or_gigs;
        break;
        case 'vr':
        this.gigs = this.vr_gigs;
        break;
        case 'lp':
        this.gigs = this.lp_gigs;
        break;
    
      default:
        break;
    }
  }
}
