import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { GuardadosPage, MapasPage, TabsPage } from '../pages/index.paginas';

//Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

// Servicios
import { HistorialProvider } from '../providers/historial/historial';

import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    MyApp,
    HomePage, GuardadosPage, MapasPage, TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
    , AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDE807WHrPnV95oRrQ8iohN0YyQX0XChWA'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, GuardadosPage, MapasPage, TabsPage
  ],
  providers: [
    StatusBar, BarcodeScanner,InAppBrowser, 
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistorialProvider, Contacts, EmailComposer
  ]
})
export class AppModule {}
