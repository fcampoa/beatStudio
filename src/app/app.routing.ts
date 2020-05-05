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

export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: AdminComponent,
    children: [
  { path: 'panel', component: UserPanelComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'discipline', component: DisciplineComponent },
  { path: 'coach', component: CoachComponent },
 ]},
  // {
  //   path: 'dashboard',
  //   component: AdminComponent,
  //   children: [

  //       {
  //     path: 'admin',
  //     loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  // }
  // ]},
];
