import { BookingConfirmationComponent } from './components/booking/booking-confirmation/booking-confirmation.component';
import { BookingStepThreeComponent } from './components/booking/booking-step-three/booking-step-three.component';
import { SelectCardComponent } from './components/select-card/select-card.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ScheduleComponent } from './components/booking/schedule/schedule.component';
import { CheckoutResultComponent } from './components/checkout/checkout-result/checkout-result.component';
import { CheckoutDetailsComponent } from './components/checkout/checkout-details/checkout-details.component';
import { CreditCardPipe } from './Core/pipes/credit-card.pipe';
import { AddPaymentComponent } from './components/payment/add-payment/add-payment.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FixedBarDirective } from './Core/directives/fixed-bar.directive';
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
import { NotificationsService } from './services/notifications.service';
import { UserService } from './services/user.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UtilitiesModule } from './Core/utilities.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterModule } from './shared/footer/footer.module';
import { GlobalServiceModule } from './Core/global/globa-service.module';
import { RouterModule } from '@angular/router';
import { GlobalApiService } from './Core/global/global-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
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
import { ErrorsHandler } from './services/errors-handler.service';
import { CustomDatePipe } from './Core/pipes/custom-date.pipe';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog/public-api';
import { ScheduleDatePipe } from './Core/pipes/schudule-date.pipe';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { DiciplineBeatspinComponent } from './components/dicipline-beatspin/dicipline-beatspin.component';
import { BookingStepTwoComponent } from './components/booking/booking-step-two/booking-step-two.component';
import { InviteDirective } from './Core/directives/invites.directive';

@NgModule({
  declarations: [
    // Componentes
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
    UserPanelComponent,
    FooterComponent,
    AddPaymentComponent,
    CheckoutDetailsComponent,
    CheckoutResultComponent,
    ScheduleComponent,
    AboutComponent,
    ContactComponent,
    DisciplineComponent,
    SelectCardComponent,
    PrivacyComponent,
    DiciplineBeatspinComponent,
    BookingStepTwoComponent,
    BookingStepThreeComponent,
    BookingConfirmationComponent,
    // directives
    FixedBarDirective,
    InviteDirective,
    // pipes
    CustomDatePipe,
    CreditCardPipe,
    ScheduleDatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    FooterModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgbModule,
    GlobalServiceModule.forRoot(),
    CommonModule,
    MDBBootstrapModule.forRoot(),
    QuickAppProMaterialModule,
    UtilitiesModule,
    // AdminModule
  ],
  exports: [
  ],
  providers: [GlobalApiService, UserService, NotificationsService,
     ParamsService, GenericApiCallService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorsHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
