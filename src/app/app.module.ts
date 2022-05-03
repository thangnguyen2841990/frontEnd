import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment.prod';
import {ImageListComponent} from './image/image-list/image-list.component';
import {NgModule} from '@angular/core';
import {DialogModule} from '@syncfusion/ej2-angular-popups';
import {BsModalService, ModalBackdropComponent, ModalContainerComponent, ModalModule} from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {JwtInterceptor} from './helper/jwt-interceptor';
import {ErrorInterceptor} from './helper/error-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ImageListComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    DialogModule,
    BrowserModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [
    AngularFireStorage,
    BsModalService,
    ComponentLoaderFactory,
    PositioningService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
