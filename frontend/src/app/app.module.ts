import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CalenderComponent} from './components/calender/calender.component';
import {DoctorPatientsOverviewComponent} from './components/doctor/doctor-patients-overview/doctor-patients-overview.component';
import {DoctorPatientsFilesComponent} from './components/doctor/doctor-patients-files/doctor-patients-files.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service/auth.service';
import {ChatComponent} from './components/chat/chat.component';
import {ChatMessageComponent} from './components/chat/chat-message/chat-message.component';
import {TokenStorageService} from './services/auth.service/token-storage.service';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {HttpClientModule} from '@angular/common/http';
import {CalendarCommonModule, CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import { MyStompConfig } from './config/my-rx-stomp.config';
import { PatientPanelComponent } from './components/patient-panel/patient-panel.component';
import { PatientPanelBaseTileComponent } from './components/patient-panel/patient-panel-tile/patient-panel-base-tile.component';
import { PatientPanelAppointmentTileComponent } from './components/patient-panel/patient-panel-appointment-tile/patient-panel-appointment-tile.component';
import { PatientPanelPatientinfoTileComponent } from './components/patient-panel/patient-panel-info-tile/patient-panel-patientinfo-tile.component';
import { AppointmentService } from './services/appointment.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { PatientPanelChatTileComponent } from './components/patient-panel/patient-panel-chat-tile/patient-panel-chat-tile.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { DoctorPatientsLinkComponent } from './components/doctor/doctor-patients-link/doctor-patients-link.component';
import {NavBarComponent} from './components/default/nav-bar/nav-bar/nav-bar.component';
import {PageNotFoundComponent} from './components/default/page-not-found/page-not-found.component';
import {DoctorPatientsAddComponent} from './components/doctor/doctor-patients-add/doctor-patients-add.component';
import {HelpComponent} from './components/default/help/help.component';
import {HomeComponent} from './components/default/home/home.component';
import {RegistrationComponent} from './components/default/registration/registration.component';
import {LoginComponent} from './components/default/login/login/login.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangepasswordComponent } from './components/edit-profile/changepassword/changepassword.component';
import {DoctorPatientsComponent} from './components/doctor/doctor-patients/doctor-patients.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        CalenderComponent,
        DoctorPatientsComponent,
        DoctorPatientsOverviewComponent,
        DoctorPatientsFilesComponent,
        LoginComponent,
        PageNotFoundComponent,
        RegistrationComponent,
        ChatComponent,
        ChatMessageComponent,
        HomeComponent,
        PatientPanelComponent,
        PatientPanelBaseTileComponent,
        PatientPanelAppointmentTileComponent,
        PatientPanelPatientinfoTileComponent,
        PatientPanelChatTileComponent,
        AdminSidebarComponent,
        AdminRegisterComponent,
        AdminHomeComponent,
        DoctorPatientsLinkComponent,
        HelpComponent,
        DoctorPatientsAddComponent,
        EditProfileComponent,
        ChangepasswordComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
        CalendarCommonModule,
        CalendarModule,
        AngularMyDatePickerModule,
        ReactiveFormsModule
    ],
    bootstrap: [AppComponent],
    providers: [
        TokenStorageService,
        AppointmentService,
        AuthService,
        authInterceptorProviders,
        {
            provide: InjectableRxStompConfig,
            useClass: MyStompConfig,
            deps: [TokenStorageService]
        },
        {
            provide: RxStompService,
            useFactory: rxStompServiceFactory,
            deps: [InjectableRxStompConfig]
        }],
})

export class AppModule {
}
