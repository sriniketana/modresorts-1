import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DataStore } from './dataStore';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ResortsPage } from '../pages/resorts/resorts';
import { ResortsdetailsPage } from '../pages/resortsdetails/resortsdetails';
import { MerchPage } from '../pages/merch/merch';
import { LiveUpdateProvider } from '../providers/live-update/live-update';
import { ChatbotPage } from '../pages/chatbot/chatbot';
import { AttractionsPage } from '../pages/attractions/attractions';
import { OtploginPage } from '../pages/otplogin/otplogin';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SettingsPage,
    HomePage,
    TabsPage,
    ResortsPage,
    ResortsdetailsPage,
    MerchPage,
    ChatbotPage,
    AttractionsPage,
    OtploginPage
  ],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), LoginPageModule],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SettingsPage,
    HomePage,
    LoginPage,
    TabsPage,
    ResortsPage,
    ResortsdetailsPage,
    MerchPage,
    ChatbotPage,
    AttractionsPage,
    OtploginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataStore,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LiveUpdateProvider
  ]
})
export class AppModule {}
