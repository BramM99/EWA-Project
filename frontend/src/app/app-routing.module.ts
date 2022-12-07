import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/default/login/login/login.component';
import {DoctorPatientsOverviewComponent} from './components/doctor/doctor-patients-overview/doctor-patients-overview.component';
import {ChatComponent} from './components/chat/chat.component';
import {DoctorPatientsFilesComponent} from './components/doctor/doctor-patients-files/doctor-patients-files.component';
import {PatientPanelComponent} from './components/patient-panel/patient-panel.component';
import {AuthGuardService} from './services/auth-guard.service';
import {CalenderComponent} from './components/calender/calender.component';
import {HomeComponent} from './components/default/home/home.component';
import {AdminSidebarComponent} from './components/admin/admin-sidebar/admin-sidebar.component';
import {AdminRegisterComponent} from './components/admin/admin-register/admin-register.component';
import {AdminHomeComponent} from './components/admin/admin-home/admin-home.component';
import {Role} from './models/Role';
import {DoctorPatientsLinkComponent} from './components/doctor/doctor-patients-link/doctor-patients-link.component';
import {HelpComponent} from './components/default/help/help.component';
import {RegistrationComponent} from './components/default/registration/registration.component';
import {PageNotFoundComponent} from './components/default/page-not-found/page-not-found.component';
import {DoctorPatientsAddComponent} from './components/doctor/doctor-patients-add/doctor-patients-add.component';
import {DoctorPatientsComponent} from './components/doctor/doctor-patients/doctor-patients.component';
import {ChangepasswordComponent} from './components/edit-profile/changepassword/changepassword.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'help', component: HelpComponent},
    {path: 'register', component: RegistrationComponent},
    {
        path: 'patients', canActivate: [AuthGuardService], data: {
            roles: [
                Role.docter
            ]
        }, component: DoctorPatientsOverviewComponent
    },
    {path: 'patient-menu', component: DoctorPatientsComponent},
    {path: 'patients-add', component: DoctorPatientsAddComponent},
    {path: 'patients-link', component: DoctorPatientsLinkComponent},
    {path: 'patients/:id', component: DoctorPatientsFilesComponent},
    {path: 'home', component: HomeComponent},
    {path: 'werknemer', component: DoctorPatientsOverviewComponent},
    {path: 'werknemer/:id', component: DoctorPatientsFilesComponent},
    {path: 'chat/:id', component: ChatComponent},
    {path: 'editprofile', component: EditProfileComponent},
    {path: 'editprofile/changepassword', component: ChangepasswordComponent},
    {path: 'calendar', component: CalenderComponent},
    {path: 'werknemer/patientfile', component: DoctorPatientsFilesComponent},
    {path: 'patientpanel', component: PatientPanelComponent},
    {path: 'admin', component: AdminSidebarComponent, canActivate: [AuthGuardService], data: {
            roles: [
                Role.admin
            ]
        }, children: [
            {path: 'adminRegister', component: AdminRegisterComponent},
            {path: 'adminOverview', component: AdminHomeComponent},
        ]
    },
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true, relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
