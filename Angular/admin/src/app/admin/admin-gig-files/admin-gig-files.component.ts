import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-gig-files',
  templateUrl: './admin-gig-files.component.html',
  styleUrls: ['./admin-gig-files.component.css']
})
export class AdminGigFilesComponent implements OnInit {

  constructor(private adminService:AdminService) { }
gig_files=[];
  ngOnInit() {
    this.adminService.get_all_gigs().subscribe(res=>{
      console.log(res);
      this.gig_files=res.msg;
      this.gig_files.forEach(element => {
      element.username=element.members.name;
      });
    })
  }
  delete_this(f,val){
    console.log(val);
    var data={
      id:f._id,
      value:val
    }

    this.adminService.delete_img(data).subscribe(res=>{
      if(res.success === true){
        window.location.reload();
      }
    })
  }

}
