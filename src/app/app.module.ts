import { NavbarComponent } from './shared/navbar/navbar.component';
import { UtilitiesModule } from './Core/utilities.module';
import { PaymentComponent } from './components/payment/payment.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { CoachComponent } from './components/coach/coach.component';
import { BookingComponent } from './components/booking/booking.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponent } from './components/admin/admin.component';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './shared/navbar/navbar.module';
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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    // SidebarModule,
    // NavbarModule,
   // ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgbModule,
    GlobalServiceModule.forRoot(),
    UtilitiesModule
  ],
  exports: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [GlobalApiService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
