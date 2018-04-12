import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }
date;

  ngOnInit() {
    this.date = moment(Date.now()).format('MMMM Do, YYYY')
  }
logout(){
  localStorage.removeItem('token');
  this.router.navigate(['/login']);

}
}
