import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the MapasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mapas',
  templateUrl: 'mapas.html',
})
export class MapasPage {

  title: string = 'My Home Town App';
  lat: number = 0;
  lng: number = 0;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    ,public viewctrl:ViewController) {

      console.log(this.navParams.get("coord"));

      let coordsArrat = this.navParams.get("coord").split(",");
      this.lat = Number( coordsArrat[0].replace("geo:", ""));
      this.lng = Number( coordsArrat[1]);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapasPage');
    
  }

  cerrarModal(){
    this.viewctrl.dismiss();
  }

}
