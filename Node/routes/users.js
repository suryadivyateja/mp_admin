"use strict";
const express = require('express');
const router = express.Router(); 
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
var moment = require('moment');
const multer = require('multer');
const parseFormdata = require('parse-formdata');
const Path = require('path');
var shortid  = require('shortid');
const multiparty = require('connect-multiparty'); 
var multipartyMiddleWare = multiparty();
var fs = require('fs');
var aws = require('aws-sdk');
var crypto = require('crypto');
const User = require('../models/user');
const User_en = require('../models/emailSubscription');
const User_delete = require('../models/deleteAccount');
const User_gig = require('../models/gig');
const favorites = require('../models/favorites');
const extras = require('../models/gig_extras');
const order = require('../models/order_details');
const review = require('../models/reviews');
const notification = require('../models/notifications');
const conv = require('../models/conversations');
const inbox = require('../models/inbox');
// const buffer = require('../models/buffer');
const custom_order = require('../models/custom_order');

var s3;
// S3 initialization
    aws.config.loadFromPath('../Node/S3config.json');
    aws.config.update({signatureVersion:'v4'});
    s3 = new aws.S3({ params: {Bucket: 'asteriisc-mp'}});
    s3.listBuckets((err,bucket) => {
        if(err) console.log(err);
        else console.log(bucket);
    });
    // let params = {
    //     Bucket:"asteriisc-mp",
    //     Key:"ProfilePictures/1521444234787.105justice league.jpg",
    // }
    // s3.getObject(params,(err,data) => {
    //     console.log(data.Body);
    // });
 //multer disk storage
//  const storage = multer.diskStorage({
//     destination:"./public/uploads/",
//     filename:(req,file,cb) => {
//         cb(null,file.fieldname+Date.now()+Path.extname(file.originalname)); 
//     }
// });

var tokens;

//registration
router.post("/register",(req,res,next) => {

    let newUser = new User({
        name:req.body.name,
        last_name:req.body.last_name, 
        email:req.body.email,
        pay_pal:req.body.email,
        password:req.body.password, 
        profile_pic:'../assets/default.png',
        date:req.body.date,
    });
    User.addUser(newUser,(err,user) => {
            if(err){
                res.json({success:false, msg:err});
            }else{
                nodemailer.createTestAccount((error,account) => {
                    let transporter = nodemailer.createTransport({
                        host: 'asteriisc.com',
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: 'support@asteriisc.com', // generated ethereal user
                            pass: 'Jdd;L@;uD8C}'  // generated ethereal password
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });
                    let mailOptions = {
                        from: '"Market Place" <support@asteriisc.com>', 
                        to: req.body.email, 
                        subject: 'Welcome To cvHatch! Confirm Your Email"', 
                        text: 'Thank you for joining with market place', 
                        html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
                        <html>
                        <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>My First Email</title>
                        <style type="text/css">
                        @media(max-width:480px){
                          table[class=main_table],table[class=layout_table]{width:300px !important;}
                          table[class=layout_table] tbody tr td.header_image img{width:300px !important;height:auto !important;}
                        }
                        a{color:#37aadc}
                        </style>
                        </head>
                        <body>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                        <tr>
                        <td align="center" valign="top">
                        <!--  M A I N T A B L E  S T A R T  -->
                        <table border="0" cellpadding="0" cellspacing="0" class="main_table" width="600">
                            <tbody>
                            <tr>
                            <td>
                              <!--  L A Y O U T _ T A B L E  S T A R T  -->
                            <table border="0" cellpadding="0" cellspacing="0" class="layout_table" style="border-collapse:collapse;border:1px solid #CCCCCC;" width="100%" >
                              <tbody>
                              <!--  H E A D E R R O W  S T A R T  -->
                              <tr>
                              <td align="left" class="header_image"><img height="120" src="https://s3.ap-south-1.amazonaws.com/asteriisc-mp/Spark_Post/New_banner.png" width="600" style="border:0;display:block;"></td>
                              </tr>
                              <!--  H E A D E R R O W  E N D  -->
                              <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                              <!--  B O D Y R O W  S T A R T  -->
                              <tr>
                              <td align="center" valign="top">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="85%">
                                  <tbody>
                                  <tr>
                                  <td align="left">
                                    <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                      Hi `+req.body.name+" "+req.body.last_name+`,<br><br> Thank you for registering with cvHatch! The world of freelance is now at your fingertips...
                                     <br><br>We're absolutely delighted to have you on board! By clicking on the following link, you are confirming your email address and agreeing to cvHatch’s Terms of Service.
                                    </p>
                                        <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                        <a href="http://www.cvhatch.com" class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #ec5252; margin: 0; border-color: #ec5252; border-style: solid; border-width: 10px 20px;">Confirm Email Address</a>
                                    <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                    Need help? You can contact us on <a href="mailto:support@cvhatch.com" target="_top">support@cvhatch.com</a> to get in touch.<br><br>
                                See you on cvHatch!<br>
                                The cvHatch Team</p>
                                     </td>	
                                   </tr>
                                  </tbody>
                                </table>
                               </td>
                              </tr>
                             <!--  B O D Y R O W  E N D  -->
                              <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                              </tbody>
                            </table>
                            <!--  L A Y O U T _ T A B L E  E N D  -->
                            </td>
                            </tr>
                            </tbody>
                        </table>
                        <!--  M A I N _ T A B L E  E N D  -->
                        <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                        Sent with &#9829; from cvHatch<br>
                        441 Logue Avenue, Mountain View, CA 94043<br>
                        © 2018 cvHatch Pty Ltd.
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </body>
                        </html>
                        
                        `
                    }
                    transporter.sendMail(mailOptions,(err,res) => {
                        if(err) console.log(err);
                        else console.log(res);
                    })
                });
                // END OF NODE MAILER
                let newUser_en = new User_en({
                    user_id:user.id,
                    a : false,
                    b : false,
                    c : false,
                    d : false,
                    e : false,
                    f : false,
                    g : false,
                    h : false,
                    i : false,
                    j : false,
                })
                User_en.saveUser_en(newUser_en,(err,user) => {
                    if(err){
                        res.json({success:false,msg:err});
                    }else{
                        res.json({success:true,msg:user});
                    }
                });

            }
    });

});

//authenticate
router.post("/authenticate",(req,res,next) => {
   const email = req.body.email;
    const password = req.body.password;

        User.getUserByEmail(email,(err,user) => {
            if(err){
                throw err;
            }if(!user){
                res.json({ success:false , msg:'user not found'});
            }
            User.comparePassword(password,user.password,(err,isMatch) => {
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign( {data:user} , config.secret, {expiresIn:604800});//expires in week
                    res.json({
                        success : true,
                        token : token,
                        user:{
                            id:user._id,
                            first_name:user.first_name,
                            last_name:user.last_name,
                            email:user.email
                        }
                    });
                }else{
                    res.json({ success:false , msg:'wrong password'});
                }
            });
        });
}); 

// find user by email
router.get("/find-email/:email",(req,res,next) => {
    const email = req.params.email;
    User.getUserByEmail(email,(err,user) => {
        if(user){
            res.json({ success:true, msg:user});
        }else{
            res.json({ success:false, msg:err});
        }
    });
});

//forget password
router.post("/forgot_password",(req,res,next) => {
        console.log(req.body);
        let hash_password = req.body.password;
        // bcrypt.
});

// find user by id:
router.get("/user_details/:user_id",(req,res,next) => {
  var  user_id = req.params.user_id;

    User.getUserById(user_id,(err,user) => {
        if(user){
            res.json({success:true,msg:user});
        }else{
            res.json({success:false,msg:err});
        }
    }) 
})

// const upload = multer({  
//     storage : storage 
// }).any("image"); 

//update user with address,country,city

router.post("/update_userdet",multipartyMiddleWare,(req,res) => { 
        let s3_url;
        console.log(req);
            var uploadpromise = new Promise((resolve,reject) =>{
                if(req.files.file !== null && req.files.file !== undefined){
                    let picture = req.files.file;
                    var data = {
                        Bucket:'asteriisc-mp/ProfilePictures',
                        Key: Date.now()+Math.random()+picture.name,
                        Body: fs.createReadStream(picture.path),
                        ContentType:'image/jpeg',
                        ACL:'public-read'
                    };
                    s3.upload(data,(err,uploaded) => {
                        if(err) console.log(err);
                        else s3_url = uploaded.Location;
                             console.log(uploaded);
                             resolve(true);
                    });
                }else{
                    s3_url = req.body.file;
                    resolve(true);
                }
            }).then((bool) => {
                if(bool === true){
                    let r = req.body;
                        user_id = r.user_id;
                        let obj = {
                            name:req.body.name,
                            last_name:req.body.last_name,
                            email:req.body.user_email,
                            designation:req.body.user_designation,
                            country:req.body.user_country,
                            description:req.body.user_description,
                            profile_pic:s3_url
                        }
    
                        User.findOneAndUpdate({_id:user_id},{$set:obj}).exec((err,user) => {                                
                            if(err) res.json({success:false,msg:err});
                            else res.json({success:true,msg:user});
                        });
                }
            });
        }); 
                                 
//update Email Notifications

router.post("/update_email_notification",(req,res,next) => {
 
        user_id = req.body.user_id;
        a = req.body.a;
        b = req.body.b;
        c = req.body.c;
        d = req.body.d;
        e = req.body.e;
        f = req.body.f;
        g = req.body.g;
        h = req.body.h;
        i = req.body.i;
        j = req.body.j;
  
        User_en.findOneAndUpdate({user_id:user_id},{$set:{a:a, b:b, c:c, d:d, e:e, f:f, g:g, h:h, i:i, j:j}}).exec((err,user) => {
            if(err){
                res.json({success:false, msg:err});
            }else{
                res.json({success:true,msg:user});
            }
        })
});


router.get("/get_email_notifications/:user_id",(req,res,next) => {
    
    user_id = req.params.user_id;

    User_en.find({user_id:user_id},(err,user) => {
        if(user){
            res.json({success:true,msg:user});
        }else{
            res.json({success:false,msg:err});
        }
    }); 
});

//delete User Account

router.post("/deleteUserAccount",(req,res,next) =>{
         user_id = req.body.user_id;
    let newUser_delete = new User_delete({
        user_id:req.body.user_id,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        reason:req.body.UserReason
    });
        User_delete.addUser(newUser_delete,(err,user) =>{
            if(err){
                res.json({success:false, msg:err});
            }else{
                User.findOneAndRemove({_id:user_id},(err,msg) => {
                    if(err){
                        res.json({success:false,msg:err});
                    }else{
                        User_gig.remove({user_id:user_id},(err1,msg1) => {
                            if(err){
                                res.json({success:false,msg:err});
                            }else{
                                nodemailer.createTestAccount((error,account) => {
                                    let transporter = nodemailer.createTransport({
                                        host: 'asteriisc.com',
                                        port: 587,
                                        secure: false, // true for 465, false for other ports
                                        auth: {
                                            user: 'support@asteriisc.com', // generated ethereal user
                                            pass: 'Jdd;L@;uD8C}'  // generated ethereal password
                                        },
                                        tls: {
                                            rejectUnauthorized: false
                                        }
                                    });
                                    let mailOptions = {
                                        from: '"Market Place" <support@asteriisc.com>', 
                                        to: req.body.email, 
                                        subject: 'Your request to delete your account was successful', 
                                        text: 'Your request to delete your account was successful', 
                                        html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
                                        <html>
                                        <head>
                                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <title>My First Email</title>
                                        <style type="text/css">
                                        @media(max-width:480px){
                                          table[class=main_table],table[class=layout_table]{width:300px !important;}
                                          table[class=layout_table] tbody tr td.header_image img{width:300px !important;height:auto !important;}
                                        }
                                        a{color:#37aadc}
                                        </style>
                                        </head>
                                        <body>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                        <tr>
                                        <td align="center" valign="top">
                                        <!--  M A I N T A B L E  S T A R T  -->
                                        <table border="0" cellpadding="0" cellspacing="0" class="main_table" width="600">
                                            <tbody>
                                            <tr>
                                            <td>
                                              <!--  L A Y O U T _ T A B L E  S T A R T  -->
                                            <table border="0" cellpadding="0" cellspacing="0" class="layout_table" style="border-collapse:collapse;border:1px solid #CCCCCC;" width="100%" >
                                              <tbody>
                                              <!--  H E A D E R R O W  S T A R T  -->
                                              <tr>
                                              <td align="left" class="header_image"><img height="120" src="https://s3.ap-south-1.amazonaws.com/asteriisc-mp/Spark_Post/New_banner.png" width="600" style="border:0;display:block;"></td>
                                              </tr>
                                              <!--  H E A D E R R O W  E N D  -->
                                              <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                                              <!--  B O D Y R O W  S T A R T  -->
                                              <tr>
                                              <td align="center" valign="top">
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="85%">
                                                  <tbody>
                                                  <tr>
                                                  <td align="left">
                                                    <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                                      Hi `+req.body.first_name+" "+req.body.last_name+`,<br><br>
                                                      We’ve received your request to delete your cvHatch account and we’re sorry to see you go. Your account is no longer active and will be permanently deleted. <br><br>
                                                      Thanks for being a part of the cvHatch community. We hope you will get onboard with us again soon. <br><br>
                                                      Didn’t request to delete your account? We recommend resetting your password here
                                                       </p>
                                                        <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                        <a href="http://www.cvhatch.com" class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #ec5252; margin: 0; border-color: #ec5252; border-style: solid; border-width: 10px 20px;">Choose a New Password</a>
                                                        <br>
                                                        <br>Thanks,<br>
                                                            The cvHatch Team
                                                        </p>
                                                     </td>	
                                                   </tr>
                                                  </tbody>
                                                </table>
                                               </td>
                                              </tr>
                                             <!--  B O D Y R O W  E N D  -->
                                              <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                                              </tbody>
                                            </table>
                                            <!--  L A Y O U T _ T A B L E  E N D  -->
                                            </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--  M A I N _ T A B L E  E N D  -->
                                        <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                        Sent with &#9829; from cvHatch<br>
                                        441 Logue Avenue, Mountain View, CA 94043<br>
                                        © 2018 cvHatch Pty Ltd.
                                        </td>
                                        </tr>
                                        </tbody>
                                        </table>
                                        </body>
                                        </html>
                                        
                                        `
                                    }
                                    transporter.sendMail(mailOptions,(err,res) => {
                                        if(err) console.log(err);
                                        else console.log(res);
                                    })
                                });
                              

                                res.json({success:true, msg:"account deleted successfully",msg_g:msg1});
                            }
                        });
                    }
                });
            }
        });     
});

//authenticate Password
router.post("/authPassword",(req,res,next) =>{

    const user_id = req.body.user_id;
    const password = req.body.password;
    var newPassword = req.body.newPassword;

    // console.log(req.body);

        User.getUserById(user_id,(Iderr,user) => {
            if(Iderr){  
                res.json({success:false,msg:err});
            }else{
                // console.log(user.password);
                User.comparePassword(password,user.password,(err,isMatch) =>{
                    if(isMatch == true){
                        
                        bcrypt.genSalt(10,(err,salt) =>{
                            bcrypt.hash(newPassword,salt,(er,hash) => {
    
                                if(er){
                                    res.json({success:false,msg:er});
                                }else{
                                    newPassword = hash;
                                    // console.log(newPassword);
                                    User.findOneAndUpdate({_id:user_id},{$set:{password:newPassword}},(e,user) => {
                                        if(e){
                                            res.json({success:false,msg:e});
                                        }else{
                                            res.json({success:true,msg:user});
                                        }
                                    })
                                }
                            })
                        });
                    }else{
                        if(err){
                            res.json({success:false,msg:passerr});
                        }else{
                            res.json({success:false,msg:'Wrong Password'});
                        }
                    }
                    if(err){
                        // res.json({success:false,msg:passerr});
                        console.log('err');
                    }else{
                        // res.json({success:true,msg:user});
                        console.log(user);   
                        
                    
                   
                    }
                });
            }
        });
       
});

//update pay_pal
router.post("/update_paypal",(req,res,next) => {
    // console.log(req.body);
    pay_pal = req.body.pay_palEmail;
    user_id = req.body.user_id;

    User.findOneAndUpdate({_id:user_id},{$set:{pay_pal:pay_pal}}).exec((err,user) => {
        if(err){
            res.json({sucess:false,msg:err});
        }else{
            res.json({success:true,msg:user});
        }
    })

    
    
    
});

//upload gig details
router.post("/upload_gig_det",multipartyMiddleWare,(req,res,next) => {

    var image_one, image_two, image_three;
    let f = req.files;
    let data = req.body;
    var up_gig_promise = new Promise((resolve,reject) => {
        let sone;
        let stwo;
        let sthree;
        if(f.img1 !== null && f.img1 !== undefined){
            let params_one = {
                Bucket:"asteriisc-mp/GigImages",
                Key: Date.now()+Math.random()+f.img1.name,
                Body: fs.createReadStream(f.img1.path),
                ContentType:'image/jpeg',
                ACL:'public-read'
            }
            s3.upload(params_one,(err_one,up_one) => {
                if(err_one) console.log(err);
                else image_one = up_one.Location; sone = "yes";
            });
        }

        if(f.img2 !== null && f.img2 !== undefined){
            let params_two = {
                Bucket:"asteriisc-mp/GigImages",
                Key: Date.now()+Math.random()+f.img2.name,
                Body:fs.createReadStream(f.img2.path),
                ContentType:'image/jpeg',
                ACL:'public-read'
            }
            s3.upload(params_two,(err_three,up_two) => {
                if(err_three) console.log(err_three);
                else image_two = up_two.Location; stwo = "yes";
            });
        }

        if(f.img3 !== null && f.img3 !== undefined){
            let params_three = {
                Bucket:"asteriisc-mp/GigImages",
                Key: Date.now()+Math.random()+f.img3.name,
                Body:fs.createReadStream(f.img3.path),
                ContentType:'image/jpeg',
                ACL:'public-read'
            }
            s3.upload(params_three,(err_five,up_three) => {
                if(err_five) console.log(err_five);
                else image_three = up_three.Location; sthree = "yes";
            });
           
        }
        setTimeout(() => {
            if(sone === "yes" && stwo === "yes" && sthree === "yes"){
                resolve(true);
            }
        },1000);

    }).then((bool) => {
        var sub_cat;
        var j;
        if(bool === true){
           if(data.sub_category === null || data.sub_category === undefined){
                data.sub_category = 'Not Specified';
                j=1;
           }else{
               j=1;
           }
           setTimeout(() => {
               if(j===1){
                    let new_gig = new User_gig({
                        user_id:data.user_id,    
                        category:data.category,
                        sub_category:data.sub_category,
                        title:data.title, 
                        description:data.description,
                        email:data.email,
                        profiles:data.profiles,
                        sharing:data.sharing,
                        social_login:data.social_login,
                        rating:data.rating,
                        mobile:data.mobile,
                        dont_show_pre:data.dont_show_pre,
                        dont_show_pro:data.dont_show_pro,
                        pac_cos_sta:data.pac_cos_sta,
                        pac_cos_pre:data.pac_cos_pre,
                        pac_cos_pro:data.pac_cos_pro,
                        pac_det_sta:data.pac_det_sta,
                        pac_det_pre:data.pac_det_pre,
                        pac_det_pro:data.pac_det_pro,
                        pac_del_sta:data.pac_del_sta,
                        pac_del_pre:data.pac_del_pre,
                        pac_del_pro:data.pac_del_pro,
                        rev_sta:data.rev_sta,
                        rev_pre:data.rev_pre,
                        rev_pro:data.rev_pro,
                        words_sta:data.words_sta,
                        words_pre:data.words_pre,
                        words_pro:data.words_pro,
                        sf_sta:data.sf_sta,
                        sf_pre:data.sf_pre,
                        sf_pro:data.sf_pro,
                        hq_sta:data.hq_sta,
                        hq_pre:data.hq_pre,
                        hq_pro:data.hq_pro,           
                        faq:data.faq,
                        author_work:data.author_work,
                        img1:image_one,
                        img2:image_two,
                        img3:image_three,
                        time:moment(),
                       });  
                       
                    new_gig.save((err,gig) =>{
                           if(gig){ 
                               res.json({success:true,msg:gig});
                           }else{
                            res.json({success:false,msg:err});
                           }    
                       });                                  
                    }
           },0);
            }
        });
    });
    
//post gig etras
router.post("/post_gig_extrs",(req,res,next) => {

    const gig_id = req.body.gig_id;
    const ext = req.body.extrs;

    for (var i = 0; i < ext.length; i++) {
        var element = ext[i];
        
        let newextras = new extras({
            gig_id:gig_id,
            e_description:element.description,
            price:element.cost,
            days:element.days                     
        }) 
         newextras.save((err,extras) => {        
        })
    }                           
     res.json({success:true,msg:extras});                        
}) 

// get gig extrs by ext id
router.get("/get_gig_extra_extid/:extras_id",(req,res,next)=>{
    const extras_id = req.params.extras_id;
    extras.find({_id:extras_id},(err,extra)=>{
        if(extra){
            res.json({success:true,msg:extra});
        }else{
            res.json({success:false,msg:err});
        }
    });
});

// update gig
router.post("/update_gig",multipartyMiddleWare,(req,res,next)=>{
    console.log(req);
       var gig_id = req.body.gig_id;
       var up_imag_one;
       var up_imag_two;
       var up_imag_three;
       var body = req.body;

       var updatePromise = new Promise((resolve,reject) => {
           let suc_one;
           let suc_two;
           let suc_three;
            console.log('inpromise');
           if(req.files === null || req.files === undefined){
            console.log('in all images');
               up_imag_one = body.img1;
               up_imag_two = body.img2;
               up_imag_three = body.img3;
               suc_one = suc_two = suc_three = "yes";
                if(suc_one === "yes" && suc_two === "yes" && suc_three === "yes"){
                    resolve(true);
                }
           }else{
               var files = req.files;
                   if(files.img1 !== null && files.img1 !== undefined){
                    let params_one = {
                        Bucket:"asteriisc-mp/GigImages",
                        Key: Date.now()+Math.random()+files.img1.name,
                        Body: fs.createReadStream(files.img1.path),
                        ContentType:'image/jpeg',
                        ACL:'public-read'
                    }    
                    s3.upload(params_one,(err_one,up_one) => {
                        if(err_one) console.log(err);
                        else up_imag_one = up_one.Location; suc_one = "yes";
                    });                
                   }else{
                       up_imag_one = req.body.img1; suc_one = "yes";
                   }

                   if(files.img2 !== null && files.img2 !== undefined){
                    let params_two = {
                        Bucket:"asteriisc-mp/GigImages",
                        Key: Date.now()+Math.random()+files.img2.name,
                        Body: fs.createReadStream(files.img2.path),
                        ContentType:'image/jpeg',
                        ACL:'public-read'
                    }
                    s3.upload(params_two,(err2,upload2) => {
                        if(err2) console.log(err2);
                        else up_imag_two = upload2.Location;  suc_two = "yes";
                    });
                   }else{
                       up_imag_two =req.body.img2;  suc_two = "yes";
                   }

                   if(files.img3 !== null && files.img3 !== undefined){
                       let params_three = {
                           Bucket:"asteriisc-mp/GigImages",
                           Key: Date.now()+Math.random()+files.img3.name,
                           Body: fs.createReadStream(files.img3.path),
                           ContentType:'image/jpeg',
                           ACL:'public-read'
                       }
                       s3.upload(params_three,(err3,upload3) => {
                           if(err3) console.log(err3);
                           else up_imag_three = upload3.Location;  suc_three = "yes";
                       });
                   }else{
                       up_imag_three = req.body.img3;  suc_three = "yes";
                   }

               setTimeout(() => {
                if(suc_one === "yes" && suc_two === "yes" && suc_three === "yes"){
                    resolve(true);
                }
            },1000);
           }

       }).then((bool) => {
           var j;
           if(bool === true){
               console.log(up_imag_one);
               console.log(up_imag_two);
               console.log(up_imag_three);
           }
           if(body.sub_category === null || body.sub_category === undefined || body.sub_category === ''){
               body.sub_category = "Not Specified";
               j = 1;
           }
           if(j = 1){
                User_gig.findByIdAndUpdate({_id:gig_id},{$set:{
                                                        user_id:body.user_id, 
                                                        category:body.category,
                                                        sub_category:body.sub_category,
                                                        title:body.title, 
                                                        description:body.description,
                                                        email:body.email,
                                                        profiles:body.profiles,
                                                        sharing:body.sharing,
                                                        social_login:body.social_login,
                                                        rating:body.rating,
                                                        mobile:body.mobile,
                                                        dont_show_pre:body.dont_show_pre,
                                                        dont_show_pro:body.dont_show_pro,
                                                        pac_cos_sta:body.pac_cos_sta,
                                                        pac_cos_pre:body.pac_cos_pre,
                                                        pac_cos_pro:body.pac_cos_pro,
                                                        pac_det_sta:body.pac_det_sta,
                                                        pac_det_pre:body.pac_det_pre,
                                                        pac_det_pro:body.pac_det_pro,
                                                        pac_del_sta:body.pac_del_sta,
                                                        pac_del_pre:body.pac_del_pre,
                                                        pac_del_pro:body.pac_del_pro,
                                                        rev_sta:body.rev_sta,
                                                        rev_pre:body.rev_pre,
                                                        rev_pro:body.rev_pro,
                                                        words_sta:body.words_sta,
                                                        words_pre:body.words_pre,
                                                        words_pro:body.words_pro,
                                                        sf_sta:body.sf_sta,
                                                        sf_pre:body.sf_pre,
                                                        sf_pro:body.sf_pro,
                                                        hq_sta:body.hq_sta,
                                                        hq_pre:body.hq_pre,
                                                        faq:body.faq,   
                                                        author_work:body.author_work,
                                                        img1:up_imag_one,
                                                        img2:up_imag_two,
                                                        img3:up_imag_three
       }},(err,gig) => {
           if(gig){
               res.json({success:true,msg:gig});
           }else{ 
               res.json({success:false,msg:err});
           }
        })                 
           }
       });
});

// update gig extras
router.post("/update_gig_extrs",(req,res,next) => {
    let gig_id = req.body.gig_id; 
    const ext = req.body.extrs;   
            // console.log(ext);
        extras.remove({gig_id:gig_id},(err,del) => {
            if(del){  
                let j = 0;
                    ext.forEach(element => {

                        let newextras = new extras({
                            gig_id:gig_id,
                            e_description:element.description, 
                            price:element.cost,
                            // days:element.days
                        });
                        newextras.save((err,ext) => {
                        });
                        j++;
                    });                                                            
                    res.json({success:true,msg:"extras updated successfully",num:j});
                }
            });
        });

// pause gig

router.post("/pause_gig",(req,res,next) => {
    // console.log(req);
    let gig_id = req.body.gig_id;
    User_gig.findById({_id:gig_id},(err,gig) => {
        // console.log(gig);
        if(gig.pause){
           User_gig.findByIdAndUpdate({_id:gig_id},{$set:{pause:false}}).exec((err2,gig2) => {
               if(err2) res.json({success:false,msg:err2});
               else res.json({success:true,msg:gig2,pause:false});
           });
        }else{
            User_gig.findByIdAndUpdate({_id:gig_id},{$set:{pause:true}}).exec((err3,gig3) => {
                if(err3) res.json({success:false,msg:err3});
                else res.json({success:true,msg:gig3,pause:true});
            });
        }
    });
});
                    
//Getting gig details
router.get("/get_gig_det/:id",(req,res,next) => {
    const gig_id = req.params.id;
    // console.log(gig_id);
    User_gig.findById({_id:gig_id},(err,gig) => {
        if(gig){
            // console.log(gig.length);
                res.json({success:true,msg:gig});
        }else{ 
            res.json({success:false,msg:err});  
        }
    })
});


//get all gigs

router.get("/get_all_gigs",(req,res,next) => {
    User_gig.find((err,user) => {
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:user});
            // console.log(user);
        }
    })
});

// get gigsby user_id
router.get("/get_gigsby_id/:user_id",(req,res,next) => {
    const user_id = req.params.user_id;
    User_gig.find({user_id:user_id},(err,user_gigs) => {
        if(user_gigs){
            res.json({success:true,msg:user_gigs});
        }else{
            res.json({success:false,msg:err});
        }
    })
})

// get gig by gig_id

router.get("/get_gig_byId/:gig_id",(req,res,next) => {
    let gig_id = req.params.gig_id;
    // console.log(gig_id);
    User_gig.findById({_id:gig_id},(err,gig) =>{
        if(gig){
            res.json({success:true,msg:gig});
            // console.log(gig);
        }else{
            res.json({success:false,msg:err});
        }
    })
})
// gig_by_cat

router.get("/gig_cat/:category/:user_id",(req,res,next) => {
    const cat = req.params.category;
    const user_id = req.params.user_id;
    User_gig.find({user_id:user_id,category:cat},(err,user) => {
        if(user){
            // if(user.msg[].length<0){
            //     res.json({success:false,msg:"no data but user success"});
            // }else{
                res.json({success:true,msg:user});
            // }
        }else{
            res.json({success:false,msg:err});
        }
    })
})

// delete gig
router.get("/delete_gig/:gig_id",(req,res,next)=>{
    let gig_id = req.params.gig_id;
        User_gig.remove({_id:gig_id},(err,success) => {
            if(success){
                res.json({success:true,msg:"Gig deleted successfully"});
            }else{
                res.json({success:false,msg:err});
            }
        })
})

// add gig to favorite

router.post("/add_to_fav",(req,res,next) => { 
 
    const gig_id = req.body.gig_id;
    const user_id = req.body.user_id;
    // console.log(req.body);
    favorites.find({gig_id:gig_id,user_id:user_id},(err,fav_gig) => {
        console.log(fav_gig);
        if(fav_gig){ 
            if(fav_gig.length > 0){
                favorites.remove({gig_id:gig_id},(er,success) => {
                    if(success){
                        res.json({success:true,msg:"removed from favorites" });
                    }
                });
            }else if(fav_gig.length === 0){
                let newFav = new favorites({
                    user_id:user_id,
                    gig_id:gig_id
                });
                newFav.save((e,saved_fav) => {
                    if(saved_fav){
                        res.json({success:true,msg1:"added to favorites",msg2:saved_fav});
                    }else{
                        res.json({success:false,msg:e});                          
                    }
                });
            }
        }else{
            if(err){
                res.json({success:false,msg:err});
            }else{
                res.json({success:false,msg:"something wrong"});
            }

        }
    });
});

// remove from fav
router.post("/remove_from_fav",(req,res) => {
    const gig_id = req.body.gig_id;
    const user_id = req.body.user_id;

    favorites.find({gig_id:gig_id,user_id:user_id},(err,fav_gig) => {
        if(err){
            res.json({success:false,msg:err});
        }
        if(fav_gig){
            favorites.remove({gig_id:gig_id,user_id:user_id},(err1,rem) => {
                if(err){
                    res.json({success:false,msg:err1});
                }else{
                    res.json({success:true,msg:"removed from favorites" });
                }
            });
        } 
    });
});
// get_favorites
router.get("/get_fav/:user_id",(req,res) => {
    uid = req.params.user_id;
    // console.log(uid);
    favorites.find({user_id: uid},(err,user) => {
        if(user){
            res.json({success:true,msg:user});
        }else{
            res.json({success:false,msg:err});
        }
    });
});

// get fav gig
router.post("/get_fav_gig",(req,res) => {
    const gig_id = req.body.gig_id;
    const user_id = req.body.user_id;
    // console.log(req.body);
    favorites.find({gig_id:gig_id,user_id:user_id},(err,gig) => {
        if(gig){
            if(gig.length == 0){
                res.json({success:false, msg: 'No gig'});
            }else{
                res.json({success:true,msg:gig});
            }
        }else{
            res.json({success:false,msg:err});
        }
    })
})

// get gig extrs
router.get("/get_gig_extrs/:gig_id",(req,res,next) => {

    const gig_id = req.params.gig_id;
  
    extras.find({gig_id:gig_id},(err,extrs) => {
        if(extrs){
            if(extrs){
                res.json({success:true,msg:extrs});
                // console.log(extrs);
            }
        }else{
            res.json({success:false,msg:err});
        }
    })
})

router.get("/get_extrs",(req,res,next) => {     
        extras.find((err,extrs) => {
            if(extrs){
                if(extrs){
                    res.json({success:true,msg:extrs});
                }
            }else{
                res.json({success:false,msg:err});
            }
        });
    });


var uploadfun = function(files,callback){
    var filepath;
        let params = {
            Bucket:'asteriisc-mp/checkout',
            Key: Date.now()+Math.random()+files.resume.name,
            Body: fs.createReadStream(files.resume.path),
            ACL:'public-read',
        }
        s3.upload(params,(err,uploaded) => {
            if(err) {
                // console.log(err);
                callback(err , null);
            }else{
                filepath = uploaded.Location;
                callback(null,filepath);
            }
        });
}
// post order details
router.post("/post_order_det",multipartyMiddleWare,(req,res,next) => {
    var now = new Date();
    var date = moment();
    var body = req.body;
    var files = req.files;
    var filepath;

    uploadfun(files, function(err,doc){
        if(!err){
        let newOrder = new order({
            seller_id:body.seller_id,
            buyer_id:body.buyer_id,
            gig_title:body.gig_title,
            gig_id:body.gig_id,
            order_id:shortid.generate(),
            gig_img:body.gig_img,     
            gig_desc:body.gig_desc,      
            selected_pac:body.selected_pac,
            selected_price:body.selected_price,
            assigned_days:body.assigned_days,
            total_ext_days:body.total_ext_days,
            total_amount:body.total_amount,
            selected_extras:body.extras, 
            resume:filepath,
            description:body.order_description,
            date:date
        });
            newOrder.save((err,order)=> {
                if(order){
                    res.json({success:true,msg:order});                    
                }else{
                    console.log(err);
                    res.json({success:false,msg:"order not placed"});
                }
            });                     
        }else{
            res.json({success:false,msg:"order not placed"});
        }
    });
});

// update order status
router.post("/update_order_status",(req,res,next) => {
    var buyer_det;
    var seller_det;
    let order_id = req.body.order_id;
    let buyer_id = req.body.buyer_id;
    let seller_id = req.body.seller_id;
    let order_status = req.body.order_status;
    let date = req.body.accepted_date;
    order.findByIdAndUpdate({_id:order_id},{$set:{order_status:order_status,accepted_date:date}},(err,order) => {
        if(order){
            // getUserDetails(req.body.seller_id, function(err, doc2){
            //     console.log('doc'+ doc2);
            //     if(!err){
            //         seller_det=doc2;
            //         console.log('doc2'+seller_det)
            //     } else{
            //         res.json({success:false,msg:err})
            //     }
            // })
            // getUserDetails(req.body.buyer_id, function(err, doc1){
            //     console.log('doc'+ doc1);
            //     if(!err){
            //         buyer_det=doc1;
            //         console.log('doc2'+buyer_det)
            //     } else{
            //         res.json({success:false,msg:err})
            //     }
            // })
            // switch (order_status) {

            //     case 'Order Accepted':
            //     nodemailer.createTestAccount((error,account) => {
            //         let transporter = nodemailer.createTransport({
            //             host: 'asteriisc.com',
            //             port: 587,
            //             secure: false, // true for 465, false for other ports
            //             auth: {
            //                 user: 'support@asteriisc.com', // generated ethereal user
            //                 pass: 'Jdd;L@;uD8C}'  // generated ethereal password
            //             },
            //             tls: {
            //                 rejectUnauthorized: false
            //             }
            //         });
            //         let mailOptions = {
            //             from: '"Market Place" <support@asteriisc.com>', 
            //             to: buyer_det.email, 
            //             subject: ''+seller_det.name+' posted an update on your order', 
            //             text: ''+seller_det.name+' posted an update on your order', 
            //             html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
            //             <html>
            //             <head>
            //             <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            //             <meta name="viewport" content="width=device-width, initial-scale=1.0">
            //             <title>My First Email</title>
            //             <style type="text/css">
            //             @media(max-width:480px){
            //               table[class=main_table],table[class=layout_table]{width:300px !important;}
            //               table[class=layout_table] tbody tr td.header_image img{width:300px !important;height:auto !important;}
            //             }
            //             a{color:#37aadc}
            //             </style>
            //             </head>
            //             <body>
            //             <table border="0" cellpadding="0" cellspacing="0" width="100%">
            //             <tbody>
            //             <tr>
            //             <td align="center" valign="top">
            //             <!--  M A I N T A B L E  S T A R T  -->
            //             <table border="0" cellpadding="0" cellspacing="0" class="main_table" width="600">
            //                 <tbody>
            //                 <tr>
            //                 <td>
            //                   <!--  L A Y O U T _ T A B L E  S T A R T  -->
            //                 <table border="0" cellpadding="0" cellspacing="0" class="layout_table" style="border-collapse:collapse;border:1px solid #CCCCCC;" width="100%" >
            //                   <tbody>
            //                   <!--  H E A D E R R O W  S T A R T  -->
            //                   <tr>
            //                   <td align="left" class="header_image"><img height="120" src="https://s3.ap-south-1.amazonaws.com/asteriisc-mp/Spark_Post/New_banner.png" width="600" style="border:0;display:block;"></td>
            //                   </tr>
            //                   <!--  H E A D E R R O W  E N D  -->
            //                   <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
            //                   <!--  B O D Y R O W  S T A R T  -->
            //                   <tr>
            //                   <td align="center" valign="top">
            //                     <table align="center" border="0" cellpadding="0" cellspacing="0" width="85%">
            //                       <tbody>
            //                       <tr>
            //                       <td align="left">
            //                         <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
            //                           Hi there,<br><br>
            //                           You have a message in regards to the order, from `+seller_det.name+` <br>
            //                          </p>
            //                             <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
            //                             <a href="http://www.cvhatch.com" class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #ec5252; margin: 0; border-color: #ec5252; border-style: solid; border-width: 10px 20px;">View and Reply</a>
            //                         <br><br>Thanks,<br>
            //                     The cvHatch Team</p>
            //                          </td>	
            //                        </tr>
            //                       </tbody>
            //                     </table>
            //                    </td>
            //                   </tr>
            //                  <!--  B O D Y R O W  E N D  -->
            //                   <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
            //                   </tbody>
            //                 </table>
            //                 <!--  L A Y O U T _ T A B L E  E N D  -->
            //                 </td>
            //                 </tr>
            //                 </tbody>
            //             </table>
            //             <!--  M A I N _ T A B L E  E N D  -->
            //             <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
            //             Sent with &#9829; from cvHatch<br>
            //             441 Logue Avenue, Mountain View, CA 94043<br>
            //             © 2018 cvHatch Pty Ltd.
            //             </td>
            //             </tr>
            //             </tbody>
            //             </table>
            //             </body>
            //             </html>
                        
                        
                        
            //             `
            //         }
            //         transporter.sendMail(mailOptions,(err,res) => {
            //             if(err) console.log(err);
            //             else console.log(res);
            //         })
            //     });
              

                    
            //         break;
            //         case 'Order Cancelled':
            //         nodemailer.createTestAccount((error,account) => {
            //             let transporter = nodemailer.createTransport({
            //                 host: 'asteriisc.com',
            //                 port: 587,
            //                 secure: false, // true for 465, false for other ports
            //                 auth: {
            //                     user: 'support@asteriisc.com', // generated ethereal user
            //                     pass: 'Jdd;L@;uD8C}'  // generated ethereal password
            //                 },
            //                 tls: {
            //                     rejectUnauthorized: false
            //                 }
            //             });
            //             let mailOptions = {
            //                 from: '"Market Place" <support@asteriisc.com>', 
            //                 to: seller_det.email, 
            //                 subject: ''+buyer_det.name+' has rejected your order <#order number>', 
            //                 text: ''+buyer_det.name+' has rejected your order <#order number>', 
            //                 html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
            //                 <html>
            //                 <head>
            //                 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            //                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
            //                 <title>My First Email</title>
            //                 <style type="text/css">
            //                 @media(max-width:480px){
            //                   table[class=main_table],table[class=layout_table]{width:300px !important;}
            //                   table[class=layout_table] tbody tr td.header_image img{width:300px !important;height:auto !important;}
            //                 }
            //                 a{color:#37aadc}
            //                 </style>
            //                 </head>
            //                 <body>
            //                 <table border="0" cellpadding="0" cellspacing="0" width="100%">
            //                 <tbody>
            //                 <tr>
            //                 <td align="center" valign="top">
            //                 <!--  M A I N T A B L E  S T A R T  -->
            //                 <table border="0" cellpadding="0" cellspacing="0" class="main_table" width="600">
            //                     <tbody>
            //                     <tr>
            //                     <td>
            //                       <!--  L A Y O U T _ T A B L E  S T A R T  -->
            //                     <table border="0" cellpadding="0" cellspacing="0" class="layout_table" style="border-collapse:collapse;border:1px solid #CCCCCC;" width="100%" >
            //                       <tbody>
            //                       <!--  H E A D E R R O W  S T A R T  -->
            //                       <tr>
            //                       <td align="left" class="header_image"><img height="120" src="https://s3.ap-south-1.amazonaws.com/asteriisc-mp/Spark_Post/New_banner.png" width="600" style="border:0;display:block;"></td>
            //                       </tr>
            //                       <!--  H E A D E R R O W  E N D  -->
            //                       <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
            //                       <!--  B O D Y R O W  S T A R T  -->
            //                       <tr>
            //                       <td align="center" valign="top">
            //                         <table align="center" border="0" cellpadding="0" cellspacing="0" width="85%">
            //                           <tbody>
            //                           <tr>
            //                           <td align="left">
            //                             <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
            //                               Hi there,<br><br>
            //                               `+buyer_det.name+` has rejected your order <order title>. To review the comments and redeliver your order, click on the button below
            //                               </p>
            //                                 <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
            //                                 <a href="http://www.cvhatch.com" class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #ec5252; margin: 0; border-color: #ec5252; border-style: solid; border-width: 10px 20px;">View and Reply</a>
            //                             <br><br>Thanks,<br>
            //                         The cvHatch Team</p>
            //                              </td>	
            //                            </tr>
            //                           </tbody>
            //                         </table>
            //                        </td>
            //                       </tr>
            //                      <!--  B O D Y R O W  E N D  -->
            //                       <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
            //                       </tbody>
            //                     </table>
            //                     <!--  L A Y O U T _ T A B L E  E N D  -->
            //                     </td>
            //                     </tr>
            //                     </tbody>
            //                 </table>
            //                 <!--  M A I N _ T A B L E  E N D  -->
            //                 <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
            //                 Sent with &#9829; from cvHatch<br>
            //                 441 Logue Avenue, Mountain View, CA 94043<br>
            //                 © 2018 cvHatch Pty Ltd.
            //                 </td>
            //                 </tr>
            //                 </tbody>
            //                 </table>
            //                 </body>
            //                 </html>
                            
                            
                            
                            
                            
            //                 `
            //             }
            //             transporter.sendMail(mailOptions,(err,res) => {
            //                 if(err) console.log(err);
            //                 else console.log(res);
            //             })
            //         });
            
            //     default:
            //         break;
            // }
            res.json({success:true,msg:order});
        }else{
            res.json({success:false,msg:err});
        }
    });
})
// get order details(seller)
router.get("/get_seller_order_det/:seller_id",(req,res,next) => {
    const user_id = req.params.seller_id;
    order.find({seller_id:user_id},(err,order) => {
        if(order){
            res.json({success:true,msg:order});
        }else{
            res.json({success:false,msg:err});
        }
    })
})
// get order details(buyer)
router.get("/get_buyer_order_det/:buyer_id",(req,res,next) => {
    const user_id = req.params.buyer_id;
    order.find({buyer_id:user_id},(err,order) => {
        if(order){
            res.json({success:true,msg:order});
        }else{
            res.json({success:false,msg:err});
        }
    })
})
// get orderby order_id
router.get("/get_orderby_id/:order_id",(req,res,next) => {
    const order_id = req.params.order_id;
    order.find({_id:order_id},(err,order) => {
        if(order){
            res.json({success:true,msg:order});
        }else{
            res.json({success:false,msg:err});
        }
    });
});
// get orders by gig_id and buyer_id
router.post("/get_ordersby_gigid",(req,res,next) => {
 
    const gig_id = req.body.gig_id; 
    const buyer_id = req.body.buyer_id;

    order.find({gig_id:gig_id,buyer_id:buyer_id},(err,order)=> {
        if(order){
            res.json({success:true,msg:order});
        }else{
            res.json({success:false,msg:err});
        }
    })
});

// get orderd by only gig_id
router.get("/get_orders_gigid/:gig_id",(req,res) => {
    const gig_id = req.params.gig_id;
    
    order.find({gig_id:gig_id},(err,gig) => {
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:gig});
            console.log(gig);
        }
    });
});

// post review
router.post("/post_review",(req,res,next) => {
    var seller_det;
    var buyer_det;
        let buyer_id = req.body.buyer_id;
        let seller_id = req.body.seller_id;
        let order_id = req.body.order_id;
        let gig_id = req.body.gig_id;
    let newReview = new review({
            buyer_id:req.body.buyer_id,
            seller_id:req.body.seller_id,
            order_id:req.body.order_id,
            gig_id:req.body.gig_id,
            score:req.body.score,
            review:req.body.review,
            date:moment(),           
    });
    review.find({order_id:order_id,gig_id:gig_id},(err,rev) => {
        if(rev.length > 0){
            review.findByIdAndUpdate({_id:rev[0]._id},{$set:{score:req.body.score,review:req.body.review,date:req.body.date}}).exec((err,rev1) => {
                if(rev1){
                    res.json({success:true,msg:rev1});
                }
            });
        }else{
            newReview.save((err,review) => {
                if(review){
                    getUserDetails(req.body.buyer_id, function(err, doc2){
                        console.log('doc'+ doc2);
                        if(!err){
                            buyer_det=doc2;
                            console.log('doc2'+buyer_det)
                         } //  else{
                        //     res.json({success:false,msg:err})
                        // }
                    })
                    getUserDetails(req.body.seller_id, function(err, doc){
                        console.log('doc'+ doc);
                        if(!err){
                            seller_det=doc;
                            console.log('doc1'+ seller_det);
                            nodemailer.createTestAccount((error,account) => {
                                            let transporter = nodemailer.createTransport({
                                                host: 'asteriisc.com',
                                                port: 587,
                                                secure: false, // true for 465, false for other ports
                                                auth: {
                                                    user: 'support@asteriisc.com', // generated ethereal user
                                                    pass: 'Jdd;L@;uD8C}'  // generated ethereal password
                                                },
                                                tls: {
                                                    rejectUnauthorized: false
                                                }
                                            });
                                            let mailOptions = {
                                                from: '"Market Place" <support@asteriisc.com>', 
                                                to: seller_det.email, 
                                                subject: 'Feedback left by '+buyer_det.name+' has been published.', 
                                                text: 'Thank you for joining with market place', 
                                                html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
                                                <html>
                                                <head>
                                                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                <title>My First Email</title>
                                                <style type="text/css">
                                                @media(max-width:480px){
                                                  table[class=main_table],table[class=layout_table]{width:300px !important;}
                                                  table[class=layout_table] tbody tr td.header_image img{width:300px !important;height:auto !important;}
                                                }
                                                a{color:#37aadc}
                                                </style>
                                                </head>
                                                <body>
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody>
                                                <tr>
                                                <td align="center" valign="top">
                                                <!--  M A I N T A B L E  S T A R T  -->
                                                <table border="0" cellpadding="0" cellspacing="0" class="main_table" width="600">
                                                    <tbody>
                                                    <tr>
                                                    <td>
                                                      <!--  L A Y O U T _ T A B L E  S T A R T  -->
                                                    <table border="0" cellpadding="0" cellspacing="0" class="layout_table" style="border-collapse:collapse;border:1px solid #CCCCCC;" width="100%" >
                                                      <tbody>
                                                      <!--  H E A D E R R O W  S T A R T  -->
                                                      <tr>
                                                      <td align="left" class="header_image"><img height="120" src="https://s3.ap-south-1.amazonaws.com/asteriisc-mp/Spark_Post/New_banner.png" width="600" style="border:0;display:block;"></td>
                                                      </tr>
                                                      <!--  H E A D E R R O W  E N D  -->
                                                      <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                                                      <!--  B O D Y R O W  S T A R T  -->
                                                      <tr>
                                                      <td align="center" valign="top">
                                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="85%">
                                                          <tbody>
                                                          <tr>
                                                          <td align="left">
                                                            <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                                              Hi there,<br><br>
                                                              `+buyer_det.name+` has left you feedback for completing order and has now been published.
                                                              </p>
                                                                <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                                <a href="http://www.cvhatch.com" class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #ec5252; margin: 0; border-color: #ec5252; border-style: solid; border-width: 10px 20px;">View Feedback</a>
                                                            <br><br>Thanks,<br>
                                                        The cvHatch Team</p>
                                                             </td>	
                                                           </tr>
                                                          </tbody>
                                                        </table>
                                                       </td>
                                                      </tr>
                                                     <!--  B O D Y R O W  E N D  -->
                                                      <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                                                      </tbody>
                                                    </table>
                                                    <!--  L A Y O U T _ T A B L E  E N D  -->
                                                    </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <!--  M A I N _ T A B L E  E N D  -->
                                                <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                                Sent with &#9829; from cvHatch<br>
                                                441 Logue Avenue, Mountain View, CA 94043<br>
                                                © 2018 cvHatch Pty Ltd.
                                                </td>
                                                </tr>
                                                </tbody>
                                                </table>
                                                </body>
                                                </html>
                                                
                                                
                                                `
                                            }
                                            transporter.sendMail(mailOptions,(err,res) => {
                                                if(err) console.log(err);
                                                else console.log(res);
                                            })
                                        });

                        }
                    })
                     

                    res.json({success:true,msg:review});           
                }else{
                    res.json({success:false,msg:err});
                }
            });
        }
    });
});

//  update review 
router.post("/update_review",(req,res) => {
    let rev_id = req.body.rev_id;
    let r = req.body;
    console.log(rev_id);
    review.findByIdAndUpdate({_id:rev_id},{$set:{review:r.review,score:r.score}}).exec((err,rev) => {
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:rev});
        }
    });
});

// get reviews
router.get("/get_reviews/:user_id",(req,res,next) => {
    const user_id = req.params.user_id;
    review.find({seller_id:user_id},(err,rev) => { 
        if(rev){
            res.json({success:true,msg:rev});
        }else{
            res.json({success:false,msg:err});
        }
    });
});

// get reviews gig_id
router.get("/get_reviews_gigid/:gig_id",(req,res,next)=>{
    const gig_id = req.params.gig_id;
    // console.log(gig_id);
    review.find({gig_id:gig_id},(err,rev) => {
        if(rev){
            res.json({success:true,msg:rev});
        }else{
            res.json({success:false,msg:err});
        }
    });
});

// get reviews order_id
router.get("/get_reviews_order_id/:order_id",(req,res,next)=>{
    const order_id = req.params.order_id;
    // console.log(gig_id);
    review.find({order_id:order_id},(err,rev) => {
        if(rev){
            res.json({success:true,msg:rev});
        }else{
            res.json({success:false,msg:err});
        }
    })
})

// post new notification
router.post("/post_not",(req,res,next) => {
    // console.log(req.body);
    const not = req.body;
    let new_not = new notification({
        user_id:not.user_id,
        notification_id:shortid.generate(),
        message:not.message,
        date:not.date,
        status:not.status,
        image:not.image,
        destination:not.destination,
        link:not.link
    });
    new_not.save((err,not) => {
        if(not){
            res.json({success:true,msg:not});
        }else{
            res.json({success:false,msg:err});
        }
    });
});

// get notifications
router.get("/get_notby_id/:user_id",(req,res,next)=>{
    const user_id = req.params.user_id;
    notification.find({user_id:user_id},(err,not) => {
        if(not){
            res.json({success:true,msg:not})
        }else{
            res.json({success:false,msg:err});
        }
    })
})

// change notification status
router.post("/change_not_status",(req,res,next) => {
    const not_id = req.body.not_id;
    // console.log(not_id);
    notification.findOneAndUpdate({_id:not_id},{$set:{status:"seen"}}).exec((err,not) => {
        if(not){
            res.json({success:true,msg:not});
        }else{
            res.json({success:false,msg:err});
        }
    });
})

// mark all read
router.post("/mark_all_read",(req,res,next) => {
    const user_id = req.body.user_id;
    notification.update({user_id:user_id},{$set:{status:"seen"}}).exec((err,not) => {
        if(not){
            res.json({success:true,msg:not});
        }else{
            res.json({success:false,msg:err});
        }
    });
});
// get converstioan
router.get("/get_conv/:user_id",(req,res) => {
    const user_id = req.params.user_id;
    // console.log(user_id); 
    conv.find({users:{$all:[user_id]}},(err,conv) => {     
        if(conv){
            res.json({success:true,msg:conv});            
        }else{
            res.json({success:false,msg:err});
        }
    })
})
// check conversations
router.post("/check_conv",(req,res,next) => {
    conv.find({users:[req.body.from,req.body.to]}, (err,ress)=>{
        if(ress.length>0){
            res.json({success:true, msg: ress});           
        }else{
            conv.find({users:[req.body.to,req.body.from]},(err1,msg1) => {
                if(msg1.length > 0){
                    res.json({success:true,msg:msg1});
                }else{
                    let con = new conv({
                        conv_id : shortid.generate(),
                        users : [req.body.from,req.body.to],
                        msg:[{from:req.body.from,to:req.body.to,msg:"Hi :)",time:moment()}],
                        status:'notSeen',
                        updatedon:moment()
                    });
                    con.save((err,saved)=>{
                        if(saved){
                            res.json({success:true, msg: saved});
                        }else{
                            res.json({success:false,msg:err});
                        }
                    });
                }
            });
        }
    });
});

router.post('/send_msg',(req,res,next)=>{
    const con_id = req.body.conv_id;
    const from = req.body.from;
    const to = req.body.to;
    const msg = req.body.message;
    const time = req.body.time;
 
    // console.log(req.body);
    conv.find({conv_id: con_id},(err1,con)=>{        
        if(!err1){
            if(con.length>0){
                let obj = {
                    from: from,
                    to: to,
                    msg: msg,
                    time: time,                   
                };
                // console.log(obj);
                conv.update({conv_id: con_id},{$push:{msg: obj}},(err,pushed)=>{
                    if(pushed){                                                
                        conv.findOneAndUpdate({conv_id:con_id},{$set:{status:'notSeen',updatedon:moment()}}).exec((err1,status) => {
                            if(status){
                                res.json({success:true,msg:pushed,verf:obj});
                            }
                        });
                    }else{
                        res.json({success:false,msg:err});
                    }
                });
            }
        }
    });  

});    
// get conv with conv_id    
router.post("/get_conv_conv_id",(req,res) => { 
    let conv_id = req.body.conv_id; 
    let old_msg_len = req.body.oldarr_len;  
    // console.log(old_msg_len); 
    console.log(conv_id); 
    conv.find({conv_id:conv_id},(err,conv) => {
        // console.log(conv);
        if(conv[0].msg.length > old_msg_len){            
            res.json({success:true,msg:conv});
        }else{
            res.json({success:false,msg:err});
        }
    });
});

// get conv with convId
router.get("/get_conv_with_convid/:conv_id",(req,res) => {
    let conv_id = req.params.conv_id;
    conv.find({conv_id:conv_id},(err,conv) => {
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:conv});
        }
    });
}); 
// get messages
router.post("/get_messages",(req,res,next) => {
    let from_id = req.body.from_id;
    let to_id = req.body.to_id;
   conv.find({users:[req.body.to_id,req.body.from_id]},(err,msg) => {
       if(msg.length > 0){
        //    console.log(msg);
           res.json({success:true,msg:msg});    
       }else{
        //    res.json({success:false,msg:err});
        conv.find({users:[req.body.from_id,req.body.to_id]},(errr,msgg) => {
                if(msgg.length > 0){
                    res.json({success:true,msg:msgg});
                }else{
                    res.json({success:false,msg:errr});
                }
        })
       }
   })
});
// change status
router.get("/change_status/:conv_id",(req,res) => {
    let conv_id = req.params.conv_id;
    conv.findOneAndUpdate({conv_id:conv_id},{$set:{status:'Seen'}}).exec((err,seen) => {
        if(res){
            res.json({success:true,msg:seen});
        }else{
            res.json({success:false,msg:err});
        }
    });
});

// change status to notseen
router.get("/change_status_to_not_seen/:conv_id",(req,res) => {
    let conv_id = req.params.conv_id;
    conv.findOneAndUpdate({conv_id:conv_id},{$set:{status:'notSeen'}}).exec((err,seen) => {
        if(res){
            res.json({success:true,msg:seen});
        }else{
            res.json({success:false,msg:err});
        }
    });
});

// forgot-password
router.post('/forgot',(req,res)=>{
    var url;
    var user_id;
    var token;
        User.find({email:req.body.email},(err,data)=>{
        if(err){
            res.json({success:false,msg:err})
        }
       else if(!err){
       
            user_id=data[0]._id;
                console.log(user_id);
                var token = jwt.sign({data:user_id},'surya',{expiresIn:'5h'});
                console.log(token);
                User.findByIdAndUpdate({_id:user_id},{$set:{resetPasswordToken:token}}).exec((err,user)=>{
                    if(err){
                        res.json({success:false,msg:err})
                    }
                    else{
                        url="http://localhost:4000/reset/"+token;
                nodemailer.createTestAccount((error,account) => {
                    let transporter = nodemailer.createTransport({
                        host: 'asteriisc.com',
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: 'support@asteriisc.com', // generated ethereal user
                            pass: 'Jdd;L@;uD8C}'  // generated ethereal password
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });
                    let mailOptions = {
                        from: '"Market Place" <support@asteriisc.com>', 
                        to: 'surya1431ap@gmail.com', 
                        subject: 'cvHatch password reset link', 
                        text: 'cvHatch password reset link', 
                        html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
                        <html>
                        <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>My First Email</title>
                        <style type="text/css">
                        @media(max-width:480px){
                          table[class=main_table],table[class=layout_table]{width:300px !important;}
                          table[class=layout_table] tbody tr td.header_image img{width:300px !important;height:auto !important;}
                        }
                        a{color:#37aadc}
                        </style>
                        </head>
                        <body>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                        <tr>
                        <td align="center" valign="top">
                        <!--  M A I N T A B L E  S T A R T  -->
                        <table border="0" cellpadding="0" cellspacing="0" class="main_table" width="600">
                            <tbody>
                            <tr>
                            <td>
                              <!--  L A Y O U T _ T A B L E  S T A R T  -->
                            <table border="0" cellpadding="0" cellspacing="0" class="layout_table" style="border-collapse:collapse;border:1px solid #CCCCCC;" width="100%" >
                              <tbody>
                              <!--  H E A D E R R O W  S T A R T  -->
                              <tr>
                              <td align="left" class="header_image"><img height="120" src="https://s3.ap-south-1.amazonaws.com/asteriisc-mp/Spark_Post/New_banner.png" width="600" style="border:0;display:block;"></td>
                              </tr>
                              <!--  H E A D E R R O W  E N D  -->
                              <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                              <!--  B O D Y R O W  S T A R T  -->
                              <tr>
                              <td align="center" valign="top">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="85%">
                                  <tbody>
                                  <tr>
                                  <td align="left">
                                    <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                      Hi there,<br><br> You have requested a password reset, please click on the button to reset your password.
                                     </p>
                                        <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                        <a href=`+url+` class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #ec5252; margin: 0; border-color: #ec5252; border-style: solid; border-width: 10px 20px;">Choose a New Password</a>
                                    <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                    If you didn’t mean to reset your password, then you can just ignore this email; your password will not change
                                    <br><br>Thanks,<br>
                                The cvHatch Team</p>
                                     </td>	
                                   </tr>
                                  </tbody>
                                </table>
                               </td>
                              </tr>
                             <!--  B O D Y R O W  E N D  -->
                              <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                              </tbody>
                            </table>
                            <!--  L A Y O U T _ T A B L E  E N D  -->
                            </td>
                            </tr>
                            </tbody>
                        </table>
                        <!--  M A I N _ T A B L E  E N D  -->
                        <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                        Sent with &#9829; from cvHatch<br>
                        441 Logue Avenue, Mountain View, CA 94043<br>
                        © 2018 cvHatch Pty Ltd.
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </body>
                        </html>
                        
                        
                        
                        `
                    }
                    transporter.sendMail(mailOptions,(err,res) => {
                        if(err) console.log(err);
                        else console.log(res);
                    })
                });
                        res.json({success:true,msg:user})
                    }

                })
            }
        })
})
router.post('/reset',(req,res)=>{

    var token=req.body.token;
    console.log(token)
    var decoded = jwt.verify(token,'surya');
console.log('decode:'+decoded.data)
    User.findByIdAndUpdate({_id:decoded.data},{$set:{password:bcrypt.hashSync(req.body.password,10)}}).exec((err,data)=>{
        if(err){
            res.json({success:true,msg:err})
        }
        else if(!err){
            nodemailer.createTestAccount((error,account) => {
                let transporter = nodemailer.createTransport({
                    host: 'asteriisc.com',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'support@asteriisc.com', // generated ethereal user
                        pass: 'Jdd;L@;uD8C}'  // generated ethereal password
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                let mailOptions = {
                    from: '"Market Place" <support@asteriisc.com>', 
                    to: 'surya1431ap@gmail.com', 
                    subject: 'Your password has been updated', 
                    text: 'Your password has been updated', 
                    html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
                    <html>
                    <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>My First Email</title>
                    <style type="text/css">
                    @media(max-width:480px){
                      table[class=main_table],table[class=layout_table]{width:300px !important;}
                      table[class=layout_table] tbody tr td.header_image img{width:300px !important;height:auto !important;}
                    }
                    a{color:#37aadc}
                    </style>
                    </head>
                    <body>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                    <tr>
                    <td align="center" valign="top">
                    <!--  M A I N T A B L E  S T A R T  -->
                    <table border="0" cellpadding="0" cellspacing="0" class="main_table" width="600">
                        <tbody>
                        <tr>
                        <td>
                          <!--  L A Y O U T _ T A B L E  S T A R T  -->
                        <table border="0" cellpadding="0" cellspacing="0" class="layout_table" style="border-collapse:collapse;border:1px solid #CCCCCC;" width="100%" >
                          <tbody>
                          <!--  H E A D E R R O W  S T A R T  -->
                          <tr>
                          <td align="left" class="header_image"><img height="120" src="https://s3.ap-south-1.amazonaws.com/asteriisc-mp/Spark_Post/New_banner.png" width="600" style="border:0;display:block;"></td>
                          </tr>
                          <!--  H E A D E R R O W  E N D  -->
                          <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                          <!--  B O D Y R O W  S T A R T  -->
                          <tr>
                          <td align="center" valign="top">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="85%">
                              <tbody>
                              <tr>
                              <td align="left">
                                <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                  Hi there,<br><br>
                                  Your login password has been changed. If you believe this as an error, please click on the button below to visit our support portal, through which you can contact our support team. <br><br>
                                  If you made this change, you’re all set
                                 </p>
                                    <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                    <a href="http://www.cvhatch.com" class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #ec5252; margin: 0; border-color: #ec5252; border-style: solid; border-width: 10px 20px;">Contact Support Team</a>
                                <br><br>Thanks,<br>
                            The cvHatch Team</p>
                                 </td>	
                               </tr>
                              </tbody>
                            </table>
                           </td>
                          </tr>
                         <!--  B O D Y R O W  E N D  -->
                          <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                          </tbody>
                        </table>
                        <!--  L A Y O U T _ T A B L E  E N D  -->
                        </td>
                        </tr>
                        </tbody>
                    </table>
                    <!--  M A I N _ T A B L E  E N D  -->
                    <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                    Sent with &#9829; from cvHatch<br>
                    441 Logue Avenue, Mountain View, CA 94043<br>
                    © 2018 cvHatch Pty Ltd.
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </body>
                    </html>
                     `
                }
                transporter.sendMail(mailOptions,(err,res) => {
                    if(err) console.log(err);
                    else console.log(res);
                })
            });

            res.json({success:true,msg:data});
        }
    })
})

// place custom order
router.post("/place_cus_order",multipartyMiddleWare,(req,res,next) => {
    var files = req.files;
    var path;
    var buyer_det;
    var seller_det;

    var upload_cus = function(callback) {
        if(files.order_image !== null && files.order_image !== undefined){
            var params = {
                Bucket:'asteriisc-mp/Custom-order',
                Key: Date.now()+Math.random()+files.order_image.name,
                Body: fs.createReadStream(files.order_image.path),
                ContentType:'image/jpeg',
                ACL:'public-read'
            }
            s3.upload(params,(err,uploaded) => {
                if(err) console.log(err);
                else path = uploaded.Location;
                if(typeof(callback) === "function"){
                    callback();
                }                    
            });
        }else{
            path = "not enclosed";
            if(typeof(callback) === "function"){
                callback();
            }
        }
    }
    var post_order = function(){
        let newcustom_order = new custom_order({
            order_description:req.body.order_description,
            image:path,
            orderd_date:req.body.orderd_date,
            delivery_date:req.body.delivery_date,
            order_id:shortid.generate(),
            buyer_id:req.body.buyer_id,
            seller_id:req.body.seller_id
        });
        newcustom_order.save((err,cus_order) => {
            if(cus_order){
                getUserDetails(req.body.buyer_id, function(err, doc){
                    console.log('doc'+ doc);
                    
                    if(!err){
                        buyer_det=doc;
                        console.log('doc1'+ buyer_det);
                        nodemailer.createTestAccount((error,account) => {
                                        let transporter = nodemailer.createTransport({
                                            host: 'asteriisc.com',
                                            port: 587,
                                            secure: false, // true for 465, false for other ports
                                            auth: {
                                                user: 'support@asteriisc.com', // generated ethereal user
                                                pass: 'Jdd;L@;uD8C}'  // generated ethereal password
                                            },
                                            tls: {
                                                rejectUnauthorized: false
                                            }
                                        });
                                        let mailOptions = {
                                            from: '"Market Place" <support@asteriisc.com>', 
                                            to: buyer_det.email, 
                                            subject: 'Your custom order request has been submitted to  Seller', 
                                            text: 'Thank you for joining with market place', 
                                            html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
                                            <html>
                                            <head>
                                            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                            <title>My First Email</title>
                                            <style type="text/css">
                                            @media(max-width:480px){
                                              table[class=main_table],table[class=layout_table]{width:300px !important;}
                                              table[class=layout_table] tbody tr td.header_image img{width:300px !important;height:auto !important;}
                                            }
                                            a{color:#37aadc}
                                            </style>
                                            </head>
                                            <body>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tbody>
                                            <tr>
                                            <td align="center" valign="top">
                                            <!--  M A I N T A B L E  S T A R T  -->
                                            <table border="0" cellpadding="0" cellspacing="0" class="main_table" width="600">
                                                <tbody>
                                                <tr>
                                                <td>
                                                  <!--  L A Y O U T _ T A B L E  S T A R T  -->
                                                <table border="0" cellpadding="0" cellspacing="0" class="layout_table" style="border-collapse:collapse;border:1px solid #CCCCCC;" width="100%" >
                                                  <tbody>
                                                  <!--  H E A D E R R O W  S T A R T  -->
                                                  <tr>
                                                  <td align="left" class="header_image"><img height="120" src="https://s3.ap-south-1.amazonaws.com/asteriisc-mp/Spark_Post/New_banner.png" width="600" style="border:0;display:block;"></td>
                                                  </tr>
                                                  <!--  H E A D E R R O W  E N D  -->
                                                  <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                                                  <!--  B O D Y R O W  S T A R T  -->
                                                  <tr>
                                                  <td align="center" valign="top">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="85%">
                                                      <tbody>
                                                      <tr>
                                                      <td align="left">
                                                        <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                                          Hi `+buyer_det.name+`,<br><br>
                                                         Your custom request has been submitted to `+seller_det.name+`.<br><br>
                                                         <b>What happens next?</b><br>
                                            
                                            1.	`+seller_det.name+` will respond to kick off your order – typically in 24 hours or less<br>
                                            2.	Work out the details with `+seller_det.name+` in a conversation<br><br>
                                                        Have a question? Ask `+seller_det.name+`
                                                          </p>
                                                            <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                            <a href="http://www.cvhatch.com" class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #ec5252; margin: 0; border-color: #ec5252; border-style: solid; border-width: 10px 20px;">View Order</a>
                                                        <br><br>Thanks,<br>
                                                    The cvHatch Team</p>
                                                         </td>	
                                                       </tr>
                                                      </tbody>
                                                    </table>
                                                   </td>
                                                  </tr>
                                                 <!--  B O D Y R O W  E N D  -->
                                                  <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                                                  </tbody>
                                                </table>
                                                <!--  L A Y O U T _ T A B L E  E N D  -->
                                                </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <!--  M A I N _ T A B L E  E N D  -->
                                            <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                            Sent with &#9829; from cvHatch<br>
                                            441 Logue Avenue, Mountain View, CA 94043<br>
                                            © 2018 cvHatch Pty Ltd.
                                            </td>
                                            </tr>
                                            </tbody>
                                            </table>
                                            </body>
                                            </html>
                                            `
                                        }
                                        transporter.sendMail(mailOptions,(err,res) => {
                                            if(err) console.log(err);
                                            else console.log(res);
                                        })
                                    });
                                }
                            
                    

                    
                    else {
                        res.json({success : false, msg:"data not found"});
                    }
                });
                getUserDetails(req.body.seller_id, function(err, doc2){
                    
                    
                    if(!err){
                        seller_det=doc2;
                        console.log('doc2'+ seller_det);
                        nodemailer.createTestAccount((error,account) => {
                                        let transporter = nodemailer.createTransport({
                                            host: 'asteriisc.com',
                                            port: 587,
                                            secure: false, // true for 465, false for other ports
                                            auth: {
                                                user: 'support@asteriisc.com', // generated ethereal user
                                                pass: 'Jdd;L@;uD8C}'  // generated ethereal password
                                            },
                                            tls: {
                                                rejectUnauthorized: false
                                            }
                                        });
                                        let mailOptions = {
                                            from: '"Market Place" <support@asteriisc.com>', 
                                            to: seller_det.email, 
                                            subject: 'You’ve received a custom order request from '+buyer_det.name+'', 
                                            text: 'Thank you for joining with market place', 
                                            html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
                                            <html>
                                            <head>
                                            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                            <title>My First Email</title>
                                            <style type="text/css">
                                            @media(max-width:480px){
                                              table[class=main_table],table[class=layout_table]{width:300px !important;}
                                              table[class=layout_table] tbody tr td.header_image img{width:300px !important;height:auto !important;}
                                            }
                                            a{color:#37aadc}
                                            </style>
                                            </head>
                                            <body>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tbody>
                                            <tr>
                                            <td align="center" valign="top">
                                            <!--  M A I N T A B L E  S T A R T  -->
                                            <table border="0" cellpadding="0" cellspacing="0" class="main_table" width="600">
                                                <tbody>
                                                <tr>
                                                <td>
                                                  <!--  L A Y O U T _ T A B L E  S T A R T  -->
                                                <table border="0" cellpadding="0" cellspacing="0" class="layout_table" style="border-collapse:collapse;border:1px solid #CCCCCC;" width="100%" >
                                                  <tbody>
                                                  <!--  H E A D E R R O W  S T A R T  -->
                                                  <tr>
                                                  <td align="left" class="header_image"><img height="120" src="https://s3.ap-south-1.amazonaws.com/asteriisc-mp/Spark_Post/New_banner.png" width="600" style="border:0;display:block;"></td>
                                                  </tr>
                                                  <!--  H E A D E R R O W  E N D  -->
                                                  <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                                                  <!--  B O D Y R O W  S T A R T  -->
                                                  <tr>
                                                  <td align="center" valign="top">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="85%">
                                                      <tbody>
                                                      <tr>
                                                      <td align="left">
                                                        <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                                          Hi there,<br><br>
                                                          You’ve received a custom order request<br>
                                                          </p>
                                                            <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                            <a href="http://www.cvhatch.com" class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #ec5252; margin: 0; border-color: #ec5252; border-style: solid; border-width: 10px 20px;">View Order</a>
                                                    
                                                    <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                                         Have a question? Ask `+buyer_det.name+`
                                                    </p>
                                                        <br>Thanks,<br>
                                                    The cvHatch Team</p>
                                                         </td>	
                                                       </tr>
                                                      </tbody>
                                                    </table>
                                                   </td>
                                                  </tr>
                                                 <!--  B O D Y R O W  E N D  -->
                                                  <tr><td style="font-size:13px;line-height:13px;margin:0;padding:0;">&nbsp;</td></tr>
                                                  </tbody>
                                                </table>
                                                <!--  L A Y O U T _ T A B L E  E N D  -->
                                                </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <!--  M A I N _ T A B L E  E N D  -->
                                            <p style="font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:22px;">
                                            Sent with &#9829; from cvHatch<br>
                                            441 Logue Avenue, Mountain View, CA 94043<br>
                                            © 2018 cvHatch Pty Ltd.
                                            </td>
                                            </tr>
                                            </tbody>
                                            </table>
                                            </body>
                                            </html>
                                            
                                            
                                            `
                                        }
                                        transporter.sendMail(mailOptions,(err,res) => {
                                            if(err) console.log(err);
                                            else console.log(res);
                                        })
                                    });
                            
                                                    
                       
                    }
                    else {
                        res.json({success : false, msg:"data not found"});
                    }
                });
                

                //         
                                        
                //     }
                //     else {
                //         res.json({success : false, msg:"data not found"});
                //     }
                // });
                // getUserDetails(req.body.seller_id, function(err, doc2){
                //     console.log('doc2'+ doc2);
                //     if(!err){
                //         
                    
                console.log(cus_order);
                res.json({success:true,msg:cus_order});
            }else{
                res.json({success:false,msg:err});
            }
        });             
    }

    upload_cus(function(){post_order()});
    
    // let img;
    // let i = 0;
    // if(req.files[0].path === null || req.files[0].path === undefined || req.files[0].path === ''){
    //     img = "not enclosed";
    //     i = 1;
    // }else{
    //     img = req.files[0].path; 
    //     i = 1;
    // }
    // if(i=1){
    //     let newcustom_order = new custom_order({
    //         order_description:req.body.order_description,
    //         image:img,
    //         orderd_date:req.body.orderd_date,
    //         delivery_date:req.body.delivery_date,
    //         order_id:shortid.generate(),
    //         buyer_id:req.body.buyer_id,
    //         seller_id:req.body.seller_id
    //     });
    //     newcustom_order.save((err,cus_order) => {
    //         if(cus_order){
    //             res.json({success:true,msg:cus_order});
    //         }else{
    //             res.json({success:false,msg:err});
    //         }
    //     });   
    // }
});
// get not msgs
router.get("/get_not_msgs/:user_id",(req,res) => {    
    let user_id = req.params.user_id;
    conv.find({users:user_id},(err,msgs) => {
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:msgs});
            // console.log(msgs);
        }
    });
});


// get my feedbacks
router.get('/get_my_feedbacks/:order_id',(req,res) => {
    let order_id = req.params.order_id;
    review.find({order_id:order_id},(err,rev) => {
        if(err){
            res.json({success:false,msg:err});
        }else{
            res.json({success:true,msg:rev});
        }
    });
});

var getUserDetails = function(user_id, callback){
    console.log('user_id'+user_id);
    User.findById({_id:user_id},(err,userData) => {
        if(err){
            if(typeof(callback) === "function"){
                callback(err, null);
            }
        } 
        else{
            if(typeof(callback) === "function"){
                callback(null, userData);
            }
        } 
    });
}
module.exports = router; 