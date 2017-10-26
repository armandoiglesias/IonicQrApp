import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ScanData } from '../../models/scan-data.model';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ModalController, Platform, ToastController } from 'ionic-angular';
import { MapasPage } from '../../pages/index.paginas';

// Plugin
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';



@Injectable()
export class HistorialProvider {

  private _historial: ScanData[] = [];


  constructor(public iab: InAppBrowser
      , public modalctrl:ModalController
      , private contacts: Contacts, private platform:Platform
      , private toastCtrl:ToastController, private emailComposer: EmailComposer) {
  }

  cargarHistorial() {
    return this._historial;
  }

  agregarHistorial(texto: string) {
    let data = new ScanData(texto);
    this._historial.unshift(data);
    this.abrir_scan(0);
  }

  abrir_scan(index: number) {
    let scanData = this._historial[index];
console.log(scanData.tipo);
    switch (scanData.tipo) {
      case 'http':
      this.iab.create(scanData.info);
        break;
        case "mapa":
          this.modalctrl.create(MapasPage, { coord: scanData.info }).present();
          break;
          case "contacto":
          this.crearContacto(scanData.info);
          break;
          case 'email':
            let htmlLink = scanData.info;
            htmlLink = htmlLink.replace("MATMSG:TO:", "mailto:");
            htmlLink = htmlLink.replace(";SUB:", "?subject=");
            htmlLink = htmlLink.replace(";BODY:", "&body=");
            htmlLink = htmlLink.replace(";;", "");
            htmlLink = htmlLink.replace(/\s/g, "%20");
            //this.crearCorreo();
            console.log(htmlLink);
            this.iab.create(htmlLink, "_blank");
          break;
      default:
        console.error("Error, tipo no soportado");
    }
    // let browser = this.iab.create('https://ionicframework.com/');

    // browser.executeScript(...);
    // browser.insertCSS(...);
    // browser.close();
  }

  private crearCorreo(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(!available) {
        //Now we know we can send
        return;
      }
     });
     
     let email = {
       to: 'max@mustermann.de',
       cc: 'erika@mustermann.de',
       bcc: [],
       attachments: [
         
       ],
       subject: 'Es una prueba',
       body: 'correo de prueba',
       isHtml: true
     };
     
     // Send a text message using default options
     this.emailComposer.open(email);
  }

  private crearContacto(texto:string){
    let campos : any = this.parse_vcard(texto);
    console.log(campos);

    if(!this.platform.is("cordova"))
    {
      console.warn("No se puede crear contacto en el navegador");
      return;
    }

    let contact: Contact = this.contacts.create();
    
    contact.name = new ContactName(null, 'Borrar', 'Borrar');
    contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
    contact.save().then(
      () => this.createToast("Se Creo el contacto"),
      (error: any) => this.createToast("Error al crear contacto " + error)
    );
    
  }

  private createToast(mensaje:string){
    this.toastCtrl.create({
      message : mensaje
      , duration : 3000
      , closeButtonText: "Ok"
      , showCloseButton : true
    }).present();
  }

  private parse_vcard( input:string ) {
    
        var Re1 = /^(version|fn|title|org):(.+)$/i;
        var Re2 = /^([^:;]+);([^:]+):(.+)$/;
        var ReKey = /item\d{1,2}\./;
        var fields = {};
    
        input.split(/\r\n|\r|\n/).forEach(function (line) {
            var results, key;
    
            if (Re1.test(line)) {
                results = line.match(Re1);
                key = results[1].toLowerCase();
                fields[key] = results[2];
            } else if (Re2.test(line)) {
                results = line.match(Re2);
                key = results[1].replace(ReKey, '').toLowerCase();
    
                var meta = {};
                results[2].split(';')
                    .map(function (p, i) {
                    var match = p.match(/([a-z]+)=(.*)/i);
                    if (match) {
                        return [match[1], match[2]];
                    } else {
                        return ["TYPE" + (i === 0 ? "" : i), p];
                    }
                })
                    .forEach(function (p) {
                    meta[p[0]] = p[1];
                });
    
                if (!fields[key]) fields[key] = [];
    
                fields[key].push({
                    meta: meta,
                    value: results[3].split(';')
                })
            }
        });
    
        return fields;
    };

}
