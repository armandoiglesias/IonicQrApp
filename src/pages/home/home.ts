import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController, Platform } from 'ionic-angular'

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { HistorialProvider } from '../../providers/historial/historial'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController
    , private barcodeScanner: BarcodeScanner
  , public toastCtrl: ToastController
, private platform : Platform, 
private _historialService:HistorialProvider) {

  }

  scan(){

    if(!this.platform.is("cordova")){
      // this._historialService.agregarHistorial("http://www.google.com");
      // this._historialService.agregarHistorial("geo:10.4597466,-66.55810919999999");
      this._historialService.agregarHistorial( `MATMSG:TO:correo@correo.com;SUB:Hola Mundo;BODY:Es una prueba;;` );
      
      return;
    }
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      // alert("We got a barcode\n" +
      // "Result: " + result.text + "\n" +
      // "Format: " + result.format + "\n" +
      // "Cancelled: " + result.cancelled);
      //console.log("Dato Leido " + barcodeData);
      if (!barcodeData.cancelled && barcodeData.text != null){
        this._historialService.agregarHistorial(barcodeData.text);
      }


     }, (err) => {
         // An error occurred
         //console.error(err);
         this.presentToast(err);
     });
  }

  presentToast(mensaje:string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}
