import { Component } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(private barcodeScanner: BarcodeScanner,
    private dataLocal: DataLocalService) { }

  // ionViewDidEnter() {
  //   console.log('ionViewDidEnter()');
  // }

  // ionViewDidLeave() {
  //   console.log('ionViewDidLeave()');
  // }

  // ionViewWillEnter() {
  //   console.log('ionViewWillEnter()');
  // }

  // ionViewWillLeave() {
  //   console.log('ionViewWillLeave()');
  // }

  scan() {
    this.barcodeScanner.scan()
    .then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (!barcodeData.cancelled) {
        this.dataLocal.saveRecord(barcodeData.format, barcodeData.text);
      }
    }).catch(err => {
      console.log('Error', err);
      //console.log(barcodeData);
      
      // this.dataLocal.saveRecord('QRCode', 'https://www.google.com/');
      this.dataLocal.saveRecord('QRCode', 'geo:37.47676802112046,-4.429460150382935');
    });
  }

}
