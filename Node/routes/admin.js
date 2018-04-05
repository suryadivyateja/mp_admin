"use strict";
const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const admin = require('../models/admin');
const User = require('../models/user');
const gig = require('../models/gig');
const order = require('../models/order_details');
const conv = require('../models/conversations');
const category = require('../models/category');
const sub_category = require('../models/sub_category');
const review = require('../models/reviews');
const custom_order = require('../models/custom_order');
const multiparty = require('connect-multiparty'); 
var multipartyMiddleWare = multiparty();
// const User = require('../models/user');
// const Order = require('../models/order');
const bcrypt = require('bcryptjs');


// post admin details
router.post("/admin_det",(req,res,next)=>{
    let newAdmin = new admin ({
        email:req.body.email,
        password:req.body.password
    }); 
    admin.addAdmin(newAdmin,(err,admin) => {
        if(admin){
            res.json({success:true,msg:admin});
        }else{
            res.json({success:false,msg:err});
        }
    })

})

// authenticate admin
router.post("/auth_admin",(req,res,next) => {
    // let email = "admin@admin.com";
    // let password = req.body.password;
    // admin.remove({email:email},(err,admin)=>{
    //     if(admin){
    //         res.json({success:true});
    //     }
    // })
    let email = req.body.email;
    let password = req.body.password;
    admin.find({email:email},(err,admin) => {
        if(err){
            res.json({success:false,msg:"No admin found"});
        }
        if(!admin){
            res.json({success:false,msg:"No admin found"});
        }
        if(admin){    
            console.log(admin);
               bcrypt.compare(password,admin[0].password,(err,isMatch) =>{
                if(err){
                    res.json({success:false,msg:"Password Incorrect"});
                }
                if(!isMatch){
                    res.json({success:false,msg:"Password Incorrect"});
                }
                if(isMatch){
                const token = jwt.sign( {data:admin} , config.secret, {expiresIn:604800});
                    res.json({success:true,
                            token:token,
                            msg:{
                                id:admin._id,
                                mail:admin.email,
                            }
                        });
                }
               })   
        }     
    });

});
//get users by id
router.get('/user_by_id/:id',(req,res)=>{
    User.findById({_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:data});
    })
})
//get users by id
router.get('/remove_user/:id',(req,res)=>{
    User.findByIdAndRemove({_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:data});
    })
})
//update users data
router.post('/update_user',(req,res)=>{
    let name =req.body.name;
    let last_name=req.body.last_name;
    let email=req.body.email;
    let pay_pal=req.body.pay_pal;
    let date=req.body.date;
    let description=req.body.description;
    let designation=req.body.designation;

User.findByIdAndUpdate({_id:req.body.id},{$set:{name:name,
last_name:last_name,
email:email,
pay_pal:pay_pal,
date:date,
description:description,
designation:designation}}).exec((err,data)=>{
    if(err) res.json({sucess:false,msg:err});
    else res.json({success:true,msg:data});
})
});


router.post('/post_category',(req,res)=>{
    let newCategory = new category({
        category_name:req.body.category_name,
        seo_name:req.body.seo_name,
        description:req.body.description,
        page_title:req.body.page_title, 
        meta_description:req.body.meta_description,
        meta_keywords:req.body.meta_keywords,
        featured_category_image:req.body.featured_category_image,
    });
    category.find({category_name:req.body.category_name},(err,data)=>{
        if(data.length>0){
            res.json({success:false,msg:'category already exists'});
        }else if(data.length === 0){
            newCategory.save((err1,cat)=>{
                if(err1) res.json({success:false,msg:err1});
                else{
                    res.json({success:true,msg:cat});
                }
            })
            
        }else {
            res.json({success:true,msg:err});
            
        }
    })

})
//post sub_category
router.post('/post_sub_category',(req,res)=>{
    let newSub_cat = new sub_category({
        sub_category_name:req.body.sub_category_name,
        category_name:req.body.category_name,
        seo_name:req.body.seo_name,
        description:req.body.description,
        page_title:req.body.page_title, 
        meta_description:req.body.meta_description,
        meta_keywords:req.body.meta_keywords,
        featured_category_image:req.body.featured_category_image
    });
    sub_category.find({sub_category_name:req.body.sub_category_name},(err,data)=>{
        if(data.length>0){
            res.json({success:false,msg:'sub_category already exists'})
        }else if(data.length === 0){
            newSub_cat.save((err1,user)=>{
                if(err1) res.json({success:false,msg:err1});
                else res.json({success:true,msg:user})
            })
        }else{
            res.json({success:false,msg:err});
        }
    })
})
//get category
router.get('/get_category',(req,res)=>{
    category.find({},(err,data)=>{
        if(err) res.json({success:false,msg:err})
        else 
        res.json({success:true,msg:data});
    })
})
//get sub_category
router.get('/get_sub_category',(req,res)=>{
    sub_category.find({},(err,data)=>{
        if(err) res.json({success:false,msg:err})
        else 
        res.json({success:true,msg:data});
    })
})
//get category by id
router.get('/get_category_by_id/:id',(req,res)=>{
    category.find({_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err})
        else res.json({success:true,msg:data});
    })
})
router.get('/get_category_by_name/:name',(req,res)=>{
    category.find({category_name:req.params.name},(err,data)=>{
        if(err) res.json({success:false,msg:err})
        else res.json({success:true,msg:data});
    })
})
router.get('/get_sub_category_by_id/:id',(req,res)=>{
    sub_category.find({_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err})
        else res.json({success:true,msg:data});
    })
})
router.get('/get_sub_category_by_name/:name',(req,res)=>{
    sub_category.find({sub_category_name:req.params.name},(err,data)=>{
        if(err) res.json({success:false,msg:err})
        else res.json({success:true,msg:data});
    })
})

//edit category
router.post('/edit_sub_category',(req,res)=>{
         let category_name=req.body.category_name;
         let sub_category_name=req.body.sub_category_name; 
         let seo_name=req.body.seo_name;
         let description=req.body.description;
         let page_title=req.body.page_title; 
         let meta_description=req.body.meta_description;
         let meta_keywords=req.body.meta_keywords;
  sub_category.findByIdAndUpdate({_id:req.body.id},{$set:{category_name:category_name,
      sub_category_name:sub_category_name,
      seo_name:seo_name,
      description:description,
      page_title:page_title,
      meta_description:meta_description,
      meta_keywords:meta_keywords}}).exec((err,user)=>{
          if(err) res.json({success:false,msg:err});
          if(user) res.json({success:true,msg:user});
      })
  })
//delete category
router.get('/delete_category/:id',(req,res)=>{
    category.findOneAndRemove({_id:req.params.id},(err,user)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:user});
    })
})
//delete sub_category
router.get('/delete_sub_category/:id',(req,res)=>{
    sub_category.findOneAndRemove({_id:req.params.id},(err,user)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:user});
    })
})
// get orders
router.get('/get_orders',(req,res)=>{
    order.find({}).exec((err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:data});
    })    
})
// get custom_orders
router.get('/get_custom_orders',(req,res)=>{
    custom_order.find({},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:data});
    })
})
//delete custom_order
router.get('/delete_custom_order/:id',(req,res)=>{
    custom_order.findByIdAndRemove({_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:'deleted'});
    })
})
// get all users
router.get("/get_all_users",(req,res,next) => {

        User.find((err,users) => {
            if(users){
                res.json({success:true,msg:users});
            }else{
                res.json({success:false,msg:err});
            }
        })
})
router.get('/get_user_by_name/:user_name',(req,res)=>{
    User.find({name:req.params.user_name},(err,user)=>{
        if(user){
            res.json({success:true,msg:user});
        }else{
            res.json({success:false,msg:err});
        }
    })
})
router.get('/get_gig_by_title/:gig_title',(req,res)=>{
     gig.find({title:req.params.gig_title},(err,gig)=>{
        if(gig){
            res.json({success:true,msg:gig});
        }else{
            res.json({success:false,msg:err});
        }
     })
})
// get all gigs
router.get("/get_all_gigs",(req,res,next) => {
    gig.find((err,gigs) => {
        if(gigs){
            res.json({success:true,msg:gigs});
        }else{
            res.json({success:false,msg:err});
        }
    })
})
//get all orders
router.get("/get_all_orders",(req,res,next) => {
    order.find((err,orders) => {
        if(orders){
            res.json({success:true,msg:orders});
        }else{
            res.json({success:false,msg:err});
        }
    })
})
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
router.get('/get_all_reviews',(req,res)=>{
    review.find((err,orders) => {
        if(orders){
            res.json({success:true,msg:orders});
        }else{
            res.json({success:false,msg:err});
        }
    })
})
router.get('/delete_reviews/:id',(req,res)=>{
    review.findByIdAndRemove({_id:req.params.id},(err,orders) => {
        if(orders){
            res.json({success:true,msg:orders});
        }else{
            res.json({success:false,msg:err});
        }
    })
})
module.exports = router;