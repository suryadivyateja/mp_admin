import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt";


@Injectable()
export class GigService {

    constructor(private http: Http) { }
// update gig
    update_gig(formData){
        return this.http.post("http://localhost:3000/users/update_gig",formData).map(res => res.json());
        // return this.http.post("users/update_gig",formData).map(res => res.json());
    }

    // pause gig
    pause_gig(gig_id){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/pause_gig",gig_id,{headers:header}).map(res => res.json());
    }

    // get gigs by id
    get_gigsby_id(user_id){
        return this.http.get("http://localhost:3000/users/get_gigsby_id/" + user_id).map(res => res.json());
        // return this.http.get("users/get_gigsby_id/" + user_id).map(res => res.json());
    }

    // get gig by gig ID
    get_gig_byId(gig_id){
        return this.http.get("http://localhost:3000/users/get_gig_byId/" + gig_id).map(res => res.json());
        // return this.http.get("users/get_gig_byId/" + gig_id).map(res => res.json());
    }

    // get all gigs
    get_all_gigs(){
        return this.http.get('http://localhost:3000/users/get_all_gigs/').map(res => res.json());
        // return this.http.get("users/get_all_gigs/").map(res => res.json());
    }

// delete_gig
    delete_gig(gig_id){
        return this.http.get("http://localhost:3000/users/delete_gig/"+gig_id).map(res => res.json());
        // return this.http.get("users/delete_gig/"+gig_id).map(res => res.json());
    }
    
// add to favorites
   add_to_fav(fav){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/add_to_fav", fav , { headers : header}).map(res => res.json());
        // return this.http.post("users/add_to_fav", fav , { headers : header}).map(res => res.json());
   }
   remove_from_fav(fav){
    let header = new Headers();
    header.append('content-type','application/json');
    return this.http.post("http://localhost:3000/users/remove_from_fav", fav , { headers : header}).map(res => res.json());
    // return this.http.post("users/add_to_fav", fav , { headers : header}).map(res => res.json());
   }

   get_fav(user_id){
       return this.http.get("http://localhost:3000/users/get_fav/" + user_id).map(res => res.json());
    //    return this.http.get("users/get_fav/" + user_id).map(res => res.json());
   }
// getting favorite gig
   get_fav_gig(fav){
    let header = new Headers();
    header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/get_fav_gig",fav,{ headers : header}).map(res => res.json());
        // return this.http.post("users/get_fav_gig",fav,{ headers : header}).map(res => res.json());
   }

//post extras
   post_gig_extrs(ext){
       let header = new Headers();
       header.append('content-type','application/json');
       return this.http.post("http://localhost:3000/users/post_gig_extrs", ext,{ headers : header}).map(res => res.json());
    //    return this.http.post("users/post_gig_extrs", ext,{ headers : header}).map(res => res.json());
   }
//    update gig extras
   update_gig_extrs(ext){
       let header = new Headers();
       header.append('content-type','application/json');
       console.log(ext);
       return this.http.post("http://localhost:3000/users/update_gig_extrs",ext,{headers:header}).map(res => res.json());
    //    return this.http.post("users/update_gig_extrs",ext,{headers:header}).map(res => res.json());
   }
// getting gig extras
   get_gig_extrs(gig_id){
        return this.http.get("http://localhost:3000/users/get_gig_extrs/" + gig_id).map(res => res.json());
        // return this.http.get("users/get_gig_extrs/" + gig_id).map(res => res.json());
   }
// get gig extras extra_id
    get_gig_extra_extid(extra_id){
        return this.http.get("http://localhost:3000/users/get_gig_extra_extid/"+extra_id).map(res => res.json());
        // return this.http.get("users/get_gig_extra_extid/"+extra_id).map(res => res.json());
    }   
// post order details

   post_order_det(formData){
       return this.http.post("http://localhost:3000/users/post_order_det",formData).map(res => res.json());
    //    return this.http.post("users/post_order_det",formData).map(res => res.json());
   }
// get order details(seller)
   get_orders_seller(seller_id){
       return this.http.get("http://localhost:3000/users/get_seller_order_det/" + seller_id).map(res => res.json());
    //    return this.http.get("users/get_seller_order_det/" + seller_id).map(res => res.json());
   }
// get order details(buyer)
   get_orders_buyer(buyer_id){
    return this.http.get("http://localhost:3000/users/get_buyer_order_det/" + buyer_id).map(res => res.json());
    // return this.http.get("users/get_buyer_order_det/" + buyer_id).map(res => res.json());
}

// get order by order_id
    get_orderby_id(order_id){
    return this.http.get("http://localhost:3000/users/get_orderby_id/"+order_id).map(res => res.json());
    // return this.http.get("users/get_orderby_id/"+order_id).map(res => res.json());
    }

// get orders by gig_id and buyer_id
    get_orderby_gigid(order){
        let header = new Headers();
        header.append('content-type','application/json');
    return this.http.post("http://localhost:3000/users/get_ordersby_gigid",order,{headers:header}).map(res => res.json());
    // return this.http.post("users/get_ordersby_gigid",order,{headers:header}).map(res => res.json());
    }
    // get orders by only gig_id
    get_order_gigid(gig_id){
        return this.http.get("http://localhost:3000/users/get_orders_gigid/" + gig_id).map(res => res.json());
    }
    // update orderstatus
    update_order_status(order){
        let header = new Headers();
        header.append('content-type', 'application/json');
        return this.http.post("http://localhost:3000/users/update_order_status",order ,{headers:header}).map(res => res.json());
        //  return this.http.post("users/update_order_status",order ,{headers:header}).map(res => res.json());
    }
// post review

    post_review(review){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/post_review",review,{headers:header}).map(res => res.json());
        // return this.http.post("users/post_review",review,{headers:header}).map(res => res.json());
    }

    // get reviews
    get_reviews(user_id){
        return this.http.get("http://localhost:3000/users/get_reviews/" + user_id).map(res => res.json());
        // return this.http.get("users/get_reviews/" + user_id).map(res => res.json());
    }
    // update_rev
    update_review(obj){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/update_review",obj,{headers:header}).map(res => res.json());
    }
    get_reviews_gigid(gig_id){
        // alert(gig_id);
        return this.http.get("http://localhost:3000/users/get_reviews_gigid/" + gig_id).map(res => res.json());
        // return this.http.get("users/get_reviews_gigid/" + gig_id).map(res => res.json());
    }
    get_reviews_order_id(order_id){
        return this.http.get("http://localhost:3000/users/get_reviews_order_id/"+order_id).map(res => res.json());
        // return this.http.get("users/get_reviews_order_id/"+order_id).map(res => res.json());
    }
    // post_notification
    post_notification(new_not){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/post_not",new_not,{headers:header}).map(res => res.json());
        // return this.http.post("users/post_not",new_not,{headers:header}).map(res => res.json());
    }
    // get notifications by user_id
    get_notifications(user_id){
        return this.http.get("http://localhost:3000/users/get_notby_id/"+user_id).map(res => res.json());
        // return this.http.get("users/get_notby_id/"+user_id).map(res => res.json());
    }
    // change notification status
    change_not_status(not){
        // alert(not_id);
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/change_not_status",not,{headers:header}).map(res => res.json());
        // return this.http.post("users/change_not_status",not,{headers:header}).map(res => res.json());
    }
    // mark all read
    mark_all_read(user_id){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/mark_all_read",user_id,{headers:header}).map(res => res.json());
        // return this.http.post("users/mark_all_read",user_id,{headers:header}).map(res => res.json());
    }

    // check for conversation
    check_conversation(conv){
        // console.log(conv);
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/check_conv",conv,{headers:header}).map(res => res.json());
        // return this.http.post("users/check_conv",conv,{headers:header}).map(res => res.json());
    }

    // send_msg_with_conv_id
    send_msg_with_conv_id(obj){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/send_msg",obj,{headers:header}).map(res => res.json());
        // return this.http.post("users/send_msg",obj,{headers:header}).map(res => res.json());
    }
    // send inbox message
    send_message(new_msg){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/send_msg",new_msg,{headers:header}).map(res => res.json());
        // return this.http.post("users/send_msg",new_msg,{headers:header}).map(res => res.json());
    }
    // get conversations with user_id
    get_conversations(user_id){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.get("http://localhost:3000/users/get_conv/"+user_id).map(res => res.json());
        // return this.http.get("users/get_conv/"+user_id).map(res => res.json());
    }
    // get conv using conv_id
    get_conv_conv_id(new_msg){

        return this.http.post("http://localhost:3000/users/get_conv_conv_id",new_msg).map(res => res.json());
        // return this.http.post("users/get_conv_conv_id",new_msg).map(res => res.json());
    }
    // get conv with conv id
    get_conv_with_convid(conv_id){
        return this.http.get("http://localhost:3000/users/get_conv_with_convid/"+conv_id).map(res => res.json());
    }
    // change status 
    change_status(conv_id){
        return this.http.get("http://localhost:3000/users/change_status/"+conv_id).map(res => res.json());
        // return this.http.get("users/change_status/"+conv_id).map(res => res.json());
    }
    // change status not seen
    change_status_notseen(conv_id){
        return this.http.get("http://localhost:3000/users/change_status_to_not_seen/"+conv_id).map(res => res.json());
        // return this.http.get("users/change_status_to_not_seen/"+conv_id).map(res => res.json());
    }
    // get message
    get_message(msg){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/get_messages",msg,{headers:header}).map(res => res.json());
        // return this.http.post("users/get_messages",msg,{headers:header}).map(res => res.json());
    }
    get_not_msgs(user_id){
        // alert(user_id);
        return this.http.get("http://localhost:3000/users/get_not_msgs/"+user_id).map(res => res.json());
        // return this.http.get("users/get_not_msgs/"+user_id).map(res => res.json());
    }
    // custom order
    place_cus_order(formData){
       return this.http.post("http://localhost:3000/users/place_cus_order",formData).map(res => res.json());
    //    return this.http.post("users/place_cus_order",formData).map(res => res.json());
    }
    get_my_feedbacks(user_id){
        return this.http.get("http://localhost:3000/users/get_my_feedbacks/"+user_id).map(res => res.json());
        // return this.http.get("users/get_my_feedbacks/"+user_id).map(res => res.json());
    }
}