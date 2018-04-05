import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule, Http } from "@angular/http";
import { Ng2CarouselamosModule } from "ng2-carouselamos";
import { RouterModule, Router, Routes } from "@angular/router"; 
import { MyDatePickerModule } from 'mydatepicker';
// External

import { AppComponent } from './app.component';
// import { AdminloginComponent } from './adminlogin/adminlogin.component';
// import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { BecomeAnAuthorComponent } from './become-an-author/become-an-author.component';
// import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SellerComponent } from './seller/seller.component';
import { SettingsComponent } from './settings/settings.component';
import { CareersComponent } from './careers/careers.component';
import { CreateGigComponent } from './create-gig/create-gig.component';
import { ErrorComponent } from './error/error.component';
import { AccountDeletedComponent } from './account-deleted/account-deleted.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { EditGigComponent } from './edit-gig/edit-gig.component';
import { GigDetailsComponent } from './gig-details/gig-details.component';
import { InboxComponent } from './inbox/inbox.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageSalesComponent } from './manage-sales/manage-sales.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { WithdrawlsComponent } from './withdrawls/withdrawls.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { FinanceComponent } from './finance/finance.component';
import { AccountComponent } from './account/account.component';
import { HeaderComponent } from "./header/header.component";
import { Header1Component } from "./header1/header1.component";
import { Header2Component } from "./header2/header2.component";
import { EmailNotificationsComponent } from './email-notifications/email-notifications.component';
import { MyGigsComponent } from './my-gigs/my-gigs.component';
import { DiamondDashboardComponent } from './diamond-dashboard/diamond-dashboard.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
// import { LoginComponent } from './login/login.component';
import { PaymentsComponent } from './payments/payments.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PressComponent } from './press/press.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { WhenAuthorSelectedComponent } from './when-author-selected/when-author-selected.component';
// import { MenuAfterLoginComponent } from './menu-after-login/menu-after-login.component';


// Services
import { AuthService } from "./services/auth.service";
import { ValidateService } from "./services/validate.service";
import { GigService } from "./services/gig.service";
import { AdminService } from './services/admin.service';
import { AuthGuard } from "./guard/auth.guard";
import { AdminAuthGuard } from "./guard/admin-auth.guard";
import { FooterComponent } from './footer/footer.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';




const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'account-deleted',
    component: AccountDeletedComponent
  },
  // {
  //   path: 'admin-login',
  //   component: AdminloginComponent
  // },
  // {
  //   path: 'admin-dashboard',
  //   component: AdminDashboardComponent,
  //   canActivate: [AdminAuthGuard]
  // },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'edit-gig',
    component: EditGigComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-sales',
    component: ManageSalesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-orders',
    component: ManageOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'how-it-works',
    component: HowItWorksComponent
  },
  {
    path: 'become-an-author',
    component: BecomeAnAuthorComponent
  },
  // {
  //   path: 'help',
  //   component: HelpComponent
  // },
  {
    path: 'inbox',
    component: InboxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seller',
    component: SellerComponent
  },
  {
    path: 'careers',
    component: CareersComponent
  },
  {
    path: 'create-gig',
    component: CreateGigComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gig',
    component: GigDetailsComponent
  },
  {
    path: 'my-gigs',
    component: MyGigsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'withdrawals',
    component: WithdrawlsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order-details',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard]
  },
  
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  {
    path: 'payments',
    component: PaymentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'press',
    component: PressComponent
  },
  // {
  //   path: 'menu-after-login',
  //   component: MenuAfterLoginComponent
  // },
{
  path:'reset/:token',
  component: ResetPasswordComponent
},
{
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    children: [
        {
            path: '',
            redirectTo: '/profile',
            pathMatch: 'full',
        },
        {
            path: 'account',
            component: AccountComponent,
            
        },
        {
            path: 'profile',
            component: ProfileComponent,
            
        },
        {
            path: 'password',
            component: PasswordComponent,
            
        },
        {
            path: 'finance',
            component: FinanceComponent,
            
        },
        {
            path: 'email-notifications',
            component: EmailNotificationsComponent,
           
        },
    ]
},

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    HowItWorksComponent,
    BecomeAnAuthorComponent,
    DiamondDashboardComponent,
    // HelpComponent,
    AboutComponent,
    TermsComponent,
    PrivacyPolicyComponent,
    DashboardComponent,
    SellerComponent,
    SettingsComponent,
    CareersComponent,
    CreateGigComponent,
    ErrorComponent,
    AccountDeletedComponent,
    CheckoutComponent,
    EditGigComponent,
    GigDetailsComponent,
    InboxComponent,
    ManageOrdersComponent,
    ManageSalesComponent,
    FavoritesComponent,
    WithdrawlsComponent,
    ProfileComponent,
    PasswordComponent,
    FinanceComponent,
    AccountComponent,
    EmailNotificationsComponent,
    WhenAuthorSelectedComponent,
    MyGigsComponent,
    OrderDetailsComponent,    
    PaymentsComponent,
    NotificationsComponent,
    PressComponent,
    HeaderComponent,
    Header1Component,
    Header2Component,
    FeedbackComponent,
    FooterComponent,
    ResetPasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    Ng2CarouselamosModule,
    MyDatePickerModule
  ],
  providers: [AuthService,ValidateService,GigService,AdminService,AuthGuard,AdminAuthGuard],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
