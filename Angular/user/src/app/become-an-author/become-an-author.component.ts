import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Route , Router , ActivatedRoute } from "@angular/router";
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-become-an-author',
  templateUrl: './become-an-author.component.html',
  styleUrls: ['./become-an-author.component.css']
})
export class BecomeAnAuthorComponent implements OnInit {

  constructor(public authService: AuthService, public app: AppComponent,private router:Router) { }

user_id:string;

  ngOnInit() {
    let user = localStorage.getItem('user');
    if(user === undefined || user === null){
        this.user_id = null;
    }else{
      let u = JSON.parse(user);
      this.user_id = u.id;
    }
  }

  open_shop(){
    if(this.authService.loggedIn()){
      this.router.navigate(['/create-gig']);
    }else{
      this.app.showBackSignUp(true);
    }
  }
}
