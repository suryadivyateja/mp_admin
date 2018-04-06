import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt";


@Injectable()
export class AuthService {
    
    authToken: any;
    user: any;

    constructor(private http: Http) { }

    getLocation(lat: number,long:number) {
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyA87IC9OaLzSxRfYOFjVzXF6ObsDGYFWeQ').map
            ((response) => response.json());
    }

    getUserFromLocal() {
        let user = localStorage.getItem('user');
        // user = JSON.parse(user);
        return user;
    }
    forgot(email){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        console.log('email'+email);
        return this.http.post('http://localhost:3000/users/forgot',email,{headers:header}).map(res=>res.json());
}
reset(obj){
    let header = new Headers();
        header.append('Content-Type', 'application/json');
     
        return this.http.post('http://localhost:3000/users/reset',obj,{headers:header}).map(res=>res.json());

}

    updateUser(user){
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:3000/users/update-user', user, { headers: header }).map(res => res.json());
        // return this.http.post('users/update-user', user, { headers: header }).map(res => res.json());
    }

    // updatePassword(user_det){
    //     let header = new Headers();
    //     header.append('Content-Type', 'application/json');
    //     return this.http.post('http://localhost:3000/users/update-pwd', user_det, { headers: header }).map(res => res.json());
    //     // return this.http.post('users/update-pwd', user_det, { headers: header }).map(res => res.json());
    // }

    registerUser(user) {
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:3000/users/register', user, { headers: header }).map(res => res.json());
        // return this.http.post('users/register', user, { headers: header }).map(res => res.json());
    }

    authenticateMobile(mobile: string) {
        return this.http.get('http://localhost:3000/users/find-mobile/'+ mobile).map(res=>res.json());
        // return this.http.get('users/find-mobile/'+ mobile).map(res=>res.json());
    }

    
    // Delete cateogry
    authenticateEmail(email: string) {
        return this.http.get('http://localhost:3000/users/find-email/' + email).map(res => res.json());
        // return this.http.get('users/find-email/' + email).map(res => res.json());
    }
    //password authenticate
    authPassword(user_det){
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        // console.log(user_det);
        return this.http.post('http://localhost:3000/users/authpassword/', user_det, { headers: header }).map(res => res.json());
        // return this.http.post('users/authpassword/', user_det, { headers: header }).map(res => res.json());
    }
    authenticateUser(user) {
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:3000/users/authenticate', user, { headers: header }).map(res => res.json());
        // return this.http.post('users/authenticate', user, { headers: header }).map(res => res.json());
    }

    storeUserData(token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }


    loggedIn() {
        return tokenNotExpired('id_token');
    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }

    // Save user address
    saveAddress(address){
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:3000/users/save-address', address, { headers: header }).map(res => res.json());
        // return this.http.post('users/save-address', address, { headers: header }).map(res => res.json());
    }

    deleteAddress(address){
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:3000/users/delete-address', address, { headers: header }).map(res => res.json());
        // return this.http.post('users/delete-address', address, { headers: header }).map(res => res.json());
    }

    updateAddress(address){
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:3000/users/update-address', address, { headers: header }).map(res => res.json());
        // return this.http.post('users/update-address', address, { headers: header }).map(res => res.json());
    }

    getUserAddressses(user_id){
        return this.http.get('http://localhost:3000/users/get-address/' + user_id).map(res => res.json());
        // return this.http.get('users/get-address/' + user_id).map(res => res.json());
    }

    postOrder(order) {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/users/post-order', order, { headers: header }).map(res => res.json());
        // return this.http.post('users/post-order', order, { headers: header }).map(res => res.json());
    }

    getUserRewards(user_id){
        return this.http.get('http://localhost:3000/users/get-user-rewards/' + user_id).map(res => res.json());
        // return this.http.get('users/get-user-rewards/' + user_id).map(res => res.json());
    }
    getReferralCode(code){
        return this.http.get('http:localhost:3000/users/find_referral_code/' + code).map(res=>res.json());
    }
    getReferredCode(code){
        return this.http.get('http://localhost:3000/users/find_referred_code/' + code).map(res=>res.json());
    }

    getUser(user_id){
        return this.http.get('http://localhost:3000/users/user_details/'+ user_id).map(res => res.json());
        // return this.http.get('users/user_details/'+ user_id).map(res => res.json());
    }
 
    authUpdateUser(user_det){
        // let header = new Headers();
        // header.append('Content-Type' , 'application/json');
        // console.log(user_det.get('first_name'));
        return this.http.post('http://localhost:3000/users/update_userdet',user_det).map(res =>res.json());
        // return this.http.post('users/update_userdet',user_det).map(res =>res.json());
    }
   
    updateEmailNotification(user_en){
        let header = new Headers();
        header.append('Content-Type' , 'application/json');
        return this.http.post("http://localhost:3000/users/update_email_notification", user_en, {headers:header}).map(res => res.json());
        // return this.http.post("users/update_email_notification", user_en, {headers:header}).map(res => res.json());
    }
    getEmailNotificationStatus(user_id){
        return this.http.get('http://localhost:3000/users/get_email_notifications/'+ user_id).map(res => res.json());
        // return this.http.get('users/get_email_notifications/'+ user_id).map(res => res.json());
    }
    // forgot password
    forgot_password(obj){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/forgot_password",obj,{headers:header}).map(res => res.json());
    }
    //delete User account
    deleteUserAcc(user_del){
        let header = new Headers();
        header.append('Content-Type' , 'application/json');
        return this.http.post("http://localhost:3000/users/deleteUserAccount", user_del,{headers:header}).map(res => res.json());
        // return this.http.post("users/deleteUserAccount", user_del,{headers:header}).map(res => res.json());

    }

    authUpdateUser_paypal(pay_pal){
        let header = new Headers();
        header.append('Content-Type' , 'application/json');
        return this.http.post("http://localhost:3000/users/update_paypal",pay_pal,{headers:header}).map(res => res.json());
        // return this.http.post("users/update_paypal",pay_pal,{headers:header}).map(res => res.json());
    }

    auth_upload_gig(gig){
        // let header = new Headers();
        // header.append('content-type' , 'application/json');
            // console.log(gig);
        return this.http.post("http://localhost:3000/users/upload_gig_det", gig).map(res => res.json());
        // return this.http.post("users/upload_gig_det", gig).map(res => res.json());
    }
    get_gig_det(id){
        return this.http.get("http://localhost:3000/users/get_gig_det/" +id).map(res => res.json());
        // return this.http.get("users/get_gig_det/" +id).map(res => res.json());
    }

}
