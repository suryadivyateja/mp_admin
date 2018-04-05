import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AppComponent } from "../app.component";

declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public app:AppComponent , private router:Router, public authService: AuthService) { }
  
user_id:string;

  ngOnInit() {
    let user = localStorage.getItem('user');
    if(user === null || user === undefined || user ===''){
      this.user_id = '';
    }else{
      let u = JSON.parse(user);
      this.user_id = u.id;
    }

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
