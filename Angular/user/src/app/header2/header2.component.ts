import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute ,  } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AppComponent } from "../app.component";
import {AdminService} from '../services/admin.service';
declare var $:any;
@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css'],
 
})
export class Header2Component implements OnInit {

  constructor(public app:AppComponent ,private adminService:AdminService, private router:Router , private activatedRoute:ActivatedRoute , public authService:AuthService) { }

user_id:string;
categories=[];
sub_categories=[];

  ngOnInit() {
    let user = localStorage.getItem('user');
    this.adminService.getCategory().subscribe(res=>{
      this.categories=res.msg;
      console.log(this.categories);
    })
    if(user === null || user === undefined || user ===''){
      this.user_id = '';
    }else{
      let u = JSON.parse(user);
      this.user_id = u.id;
    }
    var scroll_pos = 0;
    $(document).scroll(function() { 
        scroll_pos = $(this).scrollTop();
        if(scroll_pos > 500) {
           $('.main-header1').css({'background':'#fff'});
           $('.post-job').css({'color':'#999'});
           $('#mail-img').css({'color':'#999'});
           $('#bell-img').css({'color':'#999'});
           $('#dash').css({'color':'#999'});
           $('#head-name').css({'color':'#999'});
           $('#cat').css({'color':'#999'});
           $('.cat-fa').css({'color':'#999'});
           $('.main-nav-btns').css({'color':'#999'});
          }
          if(scroll_pos < 500) {
            $('.main-header1').css({'background':'#1151C7'});  
            $('.post-job').css({'color':'#fff'});
            $('#mail-img').css({'color':'#fff'});        
            $('#bell-img').css({'color':'#fff'});        
            $('#dash').css({'color':'#fff'});    
            $('#head-name').css({'color':'#fff'});    
            $('#cat').css({'color':'#fff'});
            $('.cat-fa').css({'color':'#fff'});
            $('.main-nav-btns').css({'color':'#fff'});
          }
    });
    this.adminService.getCategory().subscribe(res=>{
      this.categories=res.msg;
      // console.log(this.categories)
        });
    

// header dropdown
$('#id1').hover(function() {
  $('#div-1').css({'display':'block'});
  $('#div-2').css({'display':'none'});
  $('#div-3').css({'display':'none'});
  $('#div-4').css({'display':'none'});
});
$('#id2').hover(function() {
  $('#div-2').css({'display':'block'});
  $('#div-3').css({'display':'none'});
  $('#div-4').css({'display':'none'});
  $('#div-1').css({'display':'none'});
});
$('#id3').hover(function() {
  $('#div-3').css({'display':'block'});
  $('#div-4').css({'display':'none'});
  $('#div-1').css({'display':'none'});
  $('#div-2').css({'display':'none'});
});
$('#id4').hover(function() {
  $('#div-4').css({'display':'block'});
  $('#div-1').css({'display':'none'});
  $('#div-2').css({'display':'none'});
  $('#div-3').css({'display':'none'});
});
$('#dash-times').click(function() {
  $('.diamond-container').css({'display':'none'});
  
});
  }

  // dashboard
  displayDiamondDashboard(){
    $('.diamond-container').css({'display':'block'});
  }
  
  get_gigs(cat){
    switch (cat) {
      case "all":
      // this.all = 'all';
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
        case "rc":
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
        case "or":
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
        case "vr":
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
        case "lp":
        this.router.navigate(['/categories'], { queryParams: {cat:cat}});
        break;
    
      default:
        break;
    }
  }
  goto_seller(){
    this.router.navigate(['/seller'],{queryParams:{id:this.user_id}});
  }
}
