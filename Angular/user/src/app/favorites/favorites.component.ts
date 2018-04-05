import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GigService } from "../services/gig.service";
import { AuthService } from "../services/auth.service";
import { Router , ActivatedRoute , Params } from "@angular/router";
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private title: Title,private gigService:GigService,private authService:AuthService , private router:Router) { }

  fav_det:any;
  fav = [];
  user_id:string;
  first_name:string;
  last_name:string;
  length:boolean;
  favorites_length:boolean;
fav_status;
  ngOnInit() {
    this.title.setTitle('Favorites - Market Place');
    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    this.user_id = u.id;
    $(document).on("click", ".add-fav-btn", function (e) {
      e.preventDefault();
      $(this).parent().parent().parent().parent().remove();
      var num_gigs = $('.gig-links').length;
      if (num_gigs == 0) {
        $(".my-fav-div").load(location.href + " .my-fav-div");
      }
    });

    if(this.fav.length<0){
      this.length = true;
    }else{
      this.length = false;
    }
    this.gigService.get_fav(this.user_id).subscribe(dat => {
      console.log(dat);
      if(dat.msg.length == 0){
        this.favorites_length = true;
        console.log(this.favorites_length);
      }else{
        this.fav_det = dat.msg;
        this.fav_det.forEach(element => {
          this.authService.get_gig_det(element.gig_id).subscribe(favs => {
            console.log(favs);
            if(favs.msg != null){
              element['gig_img'] = favs.msg.img1.replace('public','');
              element['gig_title'] = favs.msg.title.substr(0,59);
              element['gig_des'] = favs.msg.description;
              element['gig_cost'] = favs.msg.pac_cos_sta;
              element['rev_sta'] = favs.msg.rev_sta;
              element['pac_del_sta'] = favs.msg.pac_del_sta;
              element['fav_status'] = true;
              this.fav.push(favs.msg);
              this.favorites_length = false; 
              this.fav_status = true;   
              this.authService.getUser(favs.msg.user_id).subscribe(user => {
                console.log(user);        
                element['name'] = user.msg.name;
              });     
              this.gigService.get_orders_seller(favs.msg.user_id).subscribe(order => {
                 console.log(order);
                 let jobs_done = 0;
                  if(order.msg.order_status === 'Order Delivered'){
                       jobs_done++;
                       element['jobes_done'] = jobs_done; 
                    }else{
                      element['jobes_done'] = 0;
                 }     
               });  
            }
          });

             element['raty'] = ["../assets/star-off.png","../assets/star-off.png","../assets/star-off.png","../assets/star-off.png","../assets/star-off.png",]
            console.log(this.fav_det);   
          
        }); 
      }
    });
    
  }
  addtoFav(gig_id,event){
       let fav ={
         gig_id:gig_id,
         user_id:this.user_id   
       }
       this.gigService.add_to_fav(fav).subscribe(res => {
        if(res.msg == 'removed from favorites'){
          this.fav_det.forEach(element => {
            if(element.gig_id == gig_id){                
              // element.fav_status = false;
              $(event.target).parent().parent().parent().parent().parent().remove();
            //  console.log(this.fav.indexOf(element));
             let index = this.fav.indexOf(element);
             this.fav.splice(index , 1);
            }   
           if(this.fav.length == 0){
            this.favorites_length = true;
           }
          }); 
        }
       });
     }

go_to_gigdet(id){
  this.router.navigate(['/gig'], { queryParams:{id:id}});
}

}
