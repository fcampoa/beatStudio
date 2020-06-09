import { SeatSelectionComponent } from './components/booking/seat-selection/seat-selection.component';
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
import { DiciplineBeatspinComponent } from './components/dicipline-beatspin/dicipline-beatspin.component';

export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard', component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'panel', component: UserPanelComponent, canActivate: [AuthGuard] },
      { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
      { path: 'booking-select/:idHorario', component: SeatSelectionComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
      { path: 'discipline', component: DisciplineComponent },
      { path: 'discipline/beatspin', component: DiciplineBeatspinComponent },
      { path: 'coach', component: CoachComponent },
      { path: 'checkout-details/:idPaquete', component: CheckoutDetailsComponent, canActivate: [AuthGuard] },
      { path: 'checkout-result/:idPago', component: CheckoutResultComponent, canActivate: [AuthGuard] },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'disciplines', component: DisciplineComponent, children: [] },
      { path: 'privacy', component: PrivacyComponent },
    ]
  },

];
