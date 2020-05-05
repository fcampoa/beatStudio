import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { CoachComponent } from './components/coach/coach.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BookingComponent } from './components/booking/booking.component';
import { AdminComponent } from './components/admin/admin.component';
import { QuickAppProMaterialModule } from './Core/material.module';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { NotificationsService } from './services/notifications.service';
import { UserService } from './services/user.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UtilitiesModule } from './Core/utilities.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterModule } from './shared/footer/footer.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { GlobalServiceModule } from './Core/global/globa-service.module';
import { RouterModule } from '@angular/router';
import { GlobalApiService } from './Core/global/global-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt-interceptor.service';
import { ErrorInterceptor } from './services/error-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutes } from './app.routing';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { ParamsService } from './Core/global/params-service.service';
import { GenericApiCallService } from './Core/global/generic-api-call.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BookingComponent,
    CheckoutComponent,
    CoachComponent,
    DisciplineComponent,
    LoginComponent,
    PaymentComponent,
    ProfileComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    UserPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgbModule,
    GlobalServiceModule.forRoot(),
    CommonModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    QuickAppProMaterialModule,
    UtilitiesModule
    // AdminModule
  ],
  exports: [
  ],
  providers: [GlobalApiService, UserService, NotificationsService,
     ToastrService, ParamsService, GenericApiCallService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
