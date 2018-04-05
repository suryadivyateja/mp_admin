import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe'; // <- import OrderModule
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminComponent } from './admin/admin.component';
import { AdminManageCategoriesComponent } from './admin/admin-manage-categories/admin-manage-categories.component';
import { AdminEditCategoryComponent } from './admin/admin-edit-category/admin-edit-category.component';
import { AdminManageOrdersComponent } from './admin/admin-manage-orders/admin-manage-orders.component';
import { AdminManageMembersComponent } from './admin/admin-manage-members/admin-manage-members.component';
import { AdminEditMembersComponent } from './admin/admin-edit-members/admin-edit-members.component';

import { AuthService } from "./services/auth.service";
import { ValidateService } from "./services/validate.service";
import { GigService } from "./services/gig.service";
import { AdminService } from './services/admin.service';
import { AdminManageGigsComponent } from './admin/admin-manage-gigs/admin-manage-gigs.component';
import { AdminEditGigComponent } from './admin/admin-edit-gig/admin-edit-gig.component';
import { AdminManageFeedbackComponent } from './admin/admin-manage-feedback/admin-manage-feedback.component';
import { AdminFakeFeedbackComponent } from './admin/admin-fake-feedback/admin-fake-feedback.component';
import { AdminAddSubCategoryComponent } from './admin/admin-add-sub-category/admin-add-sub-category.component';
import { AdminManageCustomRequestComponent } from './admin/admin-manage-custom-request/admin-manage-custom-request.component';
const appRoutes:Routes = [{
  path:'',
  redirectTo:'/home',
  pathMatch:'full'

},
{
    path:'home',
    component: AdminHomeComponent
    },
    {
    path:'add-category',
    component: AdminCategoriesComponent
    },
    {
      path:'manage-categories',
      component: AdminManageCategoriesComponent
      },
      {
      path:'manage-orders',
      component: AdminManageOrdersComponent
      },
      {
      path:'manage-members',
      component:AdminManageMembersComponent
      },
      {
        path:'edit-members/:id',
        component:AdminEditMembersComponent
        },
  
      {
        path:'edit-category/:id',
        component: AdminEditCategoryComponent
        },
    {
    path:'login',
    component:AdminLoginComponent
    },{
      path:'manage-gigs',
      component:AdminManageGigsComponent
    },{
      path:'edit-gig/:id',
        component: AdminEditGigComponent
    },{
      path:'manage-feedback',
      component:AdminManageFeedbackComponent
    },{
      path:'fake-feedback',
      component:AdminFakeFeedbackComponent
    },{
      path:'add-sub_category',
      component:AdminAddSubCategoryComponent
    },{
      path:'manage-custom-requests',
      component:AdminManageCustomRequestComponent
    }]

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    AdminLoginComponent,
    AdminCategoriesComponent,
    AdminComponent,
    AdminManageCategoriesComponent,
    AdminEditCategoryComponent,
    AdminManageOrdersComponent,
    AdminManageMembersComponent,
    AdminEditMembersComponent,
    AdminManageGigsComponent,
    AdminEditGigComponent,
    AdminManageFeedbackComponent,
    AdminFakeFeedbackComponent,
    AdminAddSubCategoryComponent,
    AdminManageCustomRequestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    OrderModule
  ],
  providers: [AuthService,ValidateService,GigService,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
