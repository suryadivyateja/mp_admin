import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

declare var $:any;
@Component({
  selector: 'app-financials',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css','../settings/settings.component.css']
})
export class FinanceComponent implements OnInit {

  constructor(private authService:AuthService) { }
  pay_palEmail:String;
  user_id:String;
  pay_pal_updated_Email:String;
  agree:boolean = false;
  ngOnInit() {

    let u = localStorage.getItem('user');
    let user = JSON.parse(u);
    // console.log(user);
    this.user_id = user.id;
    let user_id = this.user_id;

    this.authService.getUser(user_id).subscribe(dat => {
      // console.log(dat.msg.pay_pal);
      this.pay_palEmail = dat.msg.pay_pal;
    })

  }

  saveSettings(){

    let u = localStorage.getItem('user');
    let user = JSON.parse(u);
    this.user_id = user.id;

    if(this.agree == true){
        let user_paypal = {
          pay_palEmail:this.pay_palEmail,
          user_id:this.user_id
        }          
          this.authService.authUpdateUser_paypal(user_paypal).subscribe(re => {
            $('#success').html("Pay-Pal Email updated sccessfully ")
          })

    }else{
      $('#serr').html("Please check I UNDERSTAND AND AGREE ")
    }

  }

  handleChange(event){

    this.agree = event.target.checked;
    // console.log(this.agree);
    
  }

}
