import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AdminService {

  constructor(private http:Http) { }

  adminToken:any;

  // authenticate amin
  authenticate(admin){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post("http://localhost:3000/admin/auth_admin",admin,{headers:header}).map(res => res.json());
    // return this.http.post("admin/auth_admin",admin,{headers:header}).map(res => res.json());
  }

  // loggedIn
  loggedIn(){
    return tokenNotExpired('adminToken');
  }

  // get all users
  get_all_users(){
    return this.http.get("http://localhost:3000/admin/get_all_users").map(res => res.json());
    // return this.http.get("admin/get_all_users").map(res => res.json());
  }
  edit_gig(formData){
    return this.http.post("http://localhost:3000/admin/edit_gig",formData).map(res => res.json());
    // return this.http.post("users/update_gig",formData).map(res => res.json());
}
  // get all gigs
  get_all_gigs(){
    return this.http.get("http://localhost:3000/admin/get_all_gigs").map(res => res.json());
  }
  get_all_orders(){
    return this.http.get("http://localhost:3000/admin/get_all_orders").map(res => res.json());
  }
  postCategory(data:any){
    let header = new Headers();
        header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/admin/post_category',data,{headers:header}).map(res=>res.json());
  }
  postSubCategory(data:any){
    let header = new Headers();
        header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/admin/post_sub_category',data,{headers:header}).map(res=>res.json());
  }
  getCategory(){
    return this.http.get("http://localhost:3000/admin/get_category").map(res=>res.json());
  }
  getSubCategory(){
    return this.http.get("http://localhost:3000/admin/get_sub_category").map(res=>res.json());
  }
  getCategoryById(id){
    return this.http.get("http://localhost:3000/admin/get_category_by_id/" + id).map(res=>res.json());
  }
  getCategoryByName(name){
    return this.http.get("http://localhost:3000/admin/get_category_by_name/" + name).map(res=>res.json());
  }
  getSubCategoryById(id){
    return this.http.get("http://localhost:3000/admin/get_sub_category_by_id/" + id).map(res=>res.json());
  }
  getSubCategoryByName(name){
    return this.http.get("http://localhost:3000/admin/get_sub_category_by_name/" + name).map(res=>res.json());
  }
  editCategory(data){
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/admin/edit_category',data,{headers:header}).map(res=>res.json());
    
  }
  editSubCategory(data){
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/admin/edit_sub_category',data,{headers:header}).map(res=>res.json());
    
  }
  DeleteCategory(cat_id){
    return this.http.get('http://localhost:3000/admin/delete_category/' + cat_id).map(res=>res.json());

  }
  DeleteCustomOrder(c_id){
    return this.http.get('http://localhost:3000/admin/delete_custom_order/' + c_id).map(res=>res.json());

  }
  DeleteSubCategory(cat_id){
    return this.http.get('http://localhost:3000/admin/delete_sub_category/' + cat_id).map(res=>res.json());

  }
  getOrders(){
    return this.http.get('http://localhost:3000/admin/get_orders').map(res=>res.json());
  }
  getCustomOrders(){
    return this.http.get('http://localhost:3000/admin/get_custom_orders').map(res=>res.json());
  }
  update_user(data){
    let header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/admin/update_user',data,{headers:header}).map(res=>res.json());
  }
  getIpAddress() {
    return this.http
          .get('http://freegeoip.net/json/?callback')
          .map(res=>res.json());          
}
addReferralBalance(user_id){
  let header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/add_referral_balance',user_id,{headers:header}).map(res=>res.json());

}
deleteReferral(user_id){
  let header = new Headers();
    header.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/delete_referral',user_id,{headers:header}).map(res=>res.json());

}
getUserById(user_id){
  return this.http.get('http://localhost:3000/admin/user_by_id/' + user_id).map(res=>res.json());
}
DeleteMember(mem_id){
  return this.http.get('http://localhost:3000/admin/remove_user/' + mem_id).map(res=>res.json());

}
getAllReviews(){
  return this.http.get('http://localhost:3000/admin/get_all_reviews').map(res=>res.json());
}
deleteReviews(s_id){
  return this.http.get('http://localhost:3000/admin/delete_reviews/' + s_id).map(res=>res.json());
}
getUserByName(user_name){
  return this.http.get('http://localhost:3000/admin/get_user_by_name/' + user_name).map(res=>res.json());
}
getGigByTitle(gig_title){
  return this.http.get('http://localhost:3000/admin/get_gig_by_title/' + gig_title).map(res=>res.json());
}
}
