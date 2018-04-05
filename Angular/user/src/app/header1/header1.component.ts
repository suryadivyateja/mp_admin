import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.mega1').hover(function(){
      $('.drop1').css({'display':'block'});
    });
    
  }

}
