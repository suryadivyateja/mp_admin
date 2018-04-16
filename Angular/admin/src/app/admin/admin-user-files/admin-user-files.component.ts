import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
declare var $:any;
@Component({
  selector: 'app-admin-user-files',
  templateUrl: './admin-user-files.component.html',
  styleUrls: ['./admin-user-files.component.css']
})
export class AdminUserFilesComponent implements OnInit {

  constructor(private adminService:AdminService) { }
user_files=[];
  ngOnInit() {
    this.adminService.get_all_users().subscribe(res=>{
      res.msg.forEach(element => {
        if(element.profile_pic !== 'not specified'){
          this.user_files.push(element);
        }

       }); 
 })
}
delete_this(u){
 this.adminService.delete_user_file({id:u._id}).subscribe(res=>{
   if(res.success === true){
     $('#serr').html('<i class="fa fa-check"></i> user profile-pic deleted successfully')
     .css({"padding":"8px","margin-bottom":"10px","display":"block"});

setTimeout(()=>{
$('#serr').css('display','none')
},1000);
     var index = this.user_files.indexOf(u);
     this.user_files.splice(index,1);
   }
 })
}

}
