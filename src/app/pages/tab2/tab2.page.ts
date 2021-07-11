import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Registration } from '../../models/registration.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocal: DataLocalService) { }

  sendMail() {
    console.log('send mail');
  }

  openRecord(r: Registration) {
    console.log(r);
  }

}
