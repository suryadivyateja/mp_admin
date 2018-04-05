import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params } from "@angular/router";
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {

  constructor(private title: Title,private router:Router) { }

  ngOnInit() {
    this.title.setTitle('How it Works - Market Place');
  }
  go_to_cat(cat){
    switch (cat) {
      case 'rc':
      this.router.navigate(['/categories'],{queryParams:{cat:'rc'}});
      break;
      case 'or':
      this.router.navigate(['/categories'],{queryParams:{cat:'or'}});
      break;
      case 'vr':
      this.router.navigate(['/categories'],{queryParams:{cat:'vr'}});
      break;
      case 'lp':
      this.router.navigate(['/categories'],{queryParams:{cat:'lp'}});
      break;
    
      default:
        break;
    }
  }
}
