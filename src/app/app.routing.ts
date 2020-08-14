import { BookingStepThreeComponent } from './components/booking/booking-step-three/booking-step-three.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { CheckoutResultComponent } from './components/checkout/checkout-result/checkout-result.component';
import { CheckoutDetailsComponent } from './components/checkout/checkout-details/checkout-details.component';
import { AuthGuard } from './services/authGuard.service';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoachComponent } from './components/coach/coach.component';
import { DisciplineComponent } from './components/discipline/discipline.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookingComponent } from './components/booking/booking.component';
import { AdminComponent } from './components/admin/admin.component';
import { Routes } from '@angular/router';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { BeatspinComponent } from './components/disciplines/beatspin/beatspin.component';
import { BeatbarreComponent } from './components/disciplines/beatbarre/beatbarre.component';
import { BeatyogaComponent } from './components/disciplines/beatyoga/beatyoga.component';
import { BeatpowerComponent } from './components/disciplines/beatpower/beatpower.component';
import { BookingStepTwoComponent } from './components/booking/booking-step-two/booking-step-two.component';
import { BookingConfirmationComponent } from './components/booking/booking-confirmation/booking-confirmation.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordRecoveryStepOneComponent } from './components/password-recovery/password-recovery-step-one/password-recovery-step-one.component';
import { PasswordRecoveryStepTwoComponent } from './components/password-recovery/password-recovery-step-two/password-recovery-step-two.component';
import { PaypalComponent } from './Core/utilities/paypal/paypal.component';

export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard', component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'panel', component: UserPanelComponent, canActivate: [AuthGuard] },
      { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
      { path: 'booking/select/:idHorario', component: BookingStepTwoComponent, canActivate: [AuthGuard] },
      { path: 'booking/summary/:idHorario', component: BookingStepThreeComponent, canActivate: [AuthGuard] },
      { path: 'booking/success', component: BookingConfirmationComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
      { path: 'discipline', component: DisciplineComponent },
      { path: 'coach', component: CoachComponent },
      { path: 'checkout-details/:idPaquete', component: CheckoutDetailsComponent, canActivate: [AuthGuard] },
      { path: 'checkout-result/:idPago', component: CheckoutResultComponent, canActivate: [AuthGuard] },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'disciplines', component: DisciplineComponent, children: [] },
      { path: 'disciplines/beatspin', component: BeatspinComponent, children: [] },
      { path: 'disciplines/beatbarre', component: BeatbarreComponent, children: [] },
      { path: 'disciplines/beatyoga', component: BeatyogaComponent, children: [] },
      { path: 'disciplines/beatpower', component: BeatpowerComponent, children: [] },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'registro', component: RegisterComponent },
      { path: 'recover', component: PasswordRecoveryStepOneComponent },
      { path: 'newpassword', component: PasswordRecoveryStepTwoComponent },
      { path: 'paypal', component: PaypalComponent }
    ]
  },
];
