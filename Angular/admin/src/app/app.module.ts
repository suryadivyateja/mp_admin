import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe'; // <- import OrderModule
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { AdminAuthGuard } from './admin/guard/admin-auth.guard';
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
import { AdminManageReferralsComponent } from './admin/admin-manage-referrals/admin-manage-referrals.component';
import { AdminValidateReferralsComponent } from './admin/admin-validate-referrals/admin-validate-referrals.component';
import { CreateAdminComponent } from './admin/create-admin/create-admin.component';
import { ManageAdminComponent } from './admin/manage-admin/manage-admin.component';
import { HeaderComponent } from './admin/header/header.component';
import { EditAdminComponent } from './admin/edit-admin/edit-admin.component';
import { AdminEditRequestsComponent } from './admin/admin-edit-requests/admin-edit-requests.component';
import { AdminGigFilesComponent } from './admin/admin-gig-files/admin-gig-files.component';
import { AdminOrderFilesComponent } from './admin/admin-order-files/admin-order-files.component';
import { AdminUserFilesComponent } from './admin/admin-user-files/admin-user-files.component';
const appRoutes:Routes = [{
  path:'',
  redirectTo:'/login',
  pathMatch:'full'
},
{
    path:'home',
    component: AdminHomeComponent,
    canActivate: [AdminAuthGuard]
    },
    {
    path:'add-category',
    component: AdminCategoriesComponent,
    canActivate: [AdminAuthGuard]
    },
    {
      path:'manage-categories',
      component: AdminManageCategoriesComponent,
      canActivate: [AdminAuthGuard]
      },
      {
      path:'manage-orders',
      component: AdminManageOrdersComponent,
      canActivate: [AdminAuthGuard]
      },
      {
      path:'manage-members',
      component:AdminManageMembersComponent,
      canActivate: [AdminAuthGuard]
      },
      {
        path:'edit-members/:id',
        component:AdminEditMembersComponent,
        canActivate: [AdminAuthGuard]
        },
  
      {
        path:'edit-category/:id',
        component: AdminEditCategoryComponent,
        canActivate: [AdminAuthGuard]
        },
    {
    path:'login',
    component:AdminLoginComponent,
    }, {
      path:'create-admin',
      component:CreateAdminComponent,
      canActivate: [AdminAuthGuard]
      },{
        path:'edit-admin/:id',
        component:EditAdminComponent,
        canActivate: [AdminAuthGuard]
        }, {
        path:'manage-admin',
        component:ManageAdminComponent,
        canActivate: [AdminAuthGuard]
        },{
      path:'manage-gigs',
      component:AdminManageGigsComponent,
      canActivate: [AdminAuthGuard]
    },{
      path:'edit-gig/:id',
        component: AdminEditGigComponent,
        canActivate: [AdminAuthGuard]
    },{
      path:'manage-feedback',
      component:AdminManageFeedbackComponent,
      canActivate: [AdminAuthGuard]
    },{
      path:'fake-feedback',
      component:AdminFakeFeedbackComponent,
      canActivate: [AdminAuthGuard]
    },{
      path:'add-sub_category',
      component:AdminAddSubCategoryComponent,
      canActivate: [AdminAuthGuard]
    },{
      path:'manage-custom-requests',
      component:AdminManageCustomRequestComponent,
      canActivate: [AdminAuthGuard]
    },{
      path:'edit-request/:id',
      component:AdminEditRequestsComponent,
      canActivate: [AdminAuthGuard]
    },{
      path:'validate-referrals',
      component:AdminValidateReferralsComponent,
      canActivate: [AdminAuthGuard]
    },{
      path:'manage-referrals',
      component:AdminManageReferralsComponent,
      canActivate: [AdminAuthGuard]
    },{
      path:'gig-files',
      component:AdminGigFilesComponent,
      canActivate: [AdminAuthGuard]
    },{
      path:'order-files',
      component:AdminOrderFilesComponent,
      canActivate: [AdminAuthGuard]
    },{
      path:'user-files',
      component:AdminUserFilesComponent,
      canActivate: [AdminAuthGuard]
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
    AdminManageCustomRequestComponent,
    AdminManageReferralsComponent,
    AdminValidateReferralsComponent,
    CreateAdminComponent,
    ManageAdminComponent,
    HeaderComponent,
    EditAdminComponent,
    AdminEditRequestsComponent,
    AdminGigFilesComponent,
    AdminOrderFilesComponent,
    AdminUserFilesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    OrderModule
  ],
  providers: [AuthService,ValidateService,GigService,AdminService,AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
