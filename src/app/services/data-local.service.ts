import { Injectable } from '@angular/core';
import { Registration } from '../models/registration.model';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;
  record: Registration[] = [];

  constructor(private storage: Storage,
    private navCtrl: NavController,
    private iab: InAppBrowser,
    private file: File) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storage?.get('records')
      .then(resp => {
        this.record = resp || [];
      });
    this._storage = storage;
  }

  saveRecord(format: string, text: string) {
    const newRecord = new Registration(format, text);
    this.record.unshift(newRecord);
    // console.log(this.record);
    this._storage?.set('records', this.record);
    this.openRecord(newRecord);
  }

  openRecord(record: Registration) {
    this.navCtrl.navigateForward('/tabs/tab2');
    switch (record.type) {
      case 'http':
        this.iab.create(record.text, '_system');
        break;
      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/map/${record.text}`);
        break;
      default:
        break;
    }
  }

  sendMail() {
    const temp = [];
    const titles = 'Tipo, Formato, Fecha de Creación, Texto\n';
    temp.push(titles);
    this.record.forEach(element => {
      const line = `${element.type},${element.format},${element.created},${element.text.replace(',', ' ')}\n`;
      temp.push(line)
    });
    // console.log(temp.join(' '));
    this.createMyFile(temp.join(' '));
  }

  createMyFile(text: string) {

    this.file.checkFile(this.file.dataDirectory, 'registros.csv')
      .then(existe => {
        console.log('Exoste archivo?', text);
        return this.writeInMyFile(text);
      })
      .catch(err => {
        return this.file.createFile(this.file.dataDirectory, 'registros.cvs', false)
          .then(creado => {
            this.writeInMyFile(text);
          })
          .catch(err => {
            console.log('No se pudo crear el archivo', err);
          });
      });

  }

  async writeInMyFile(text: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', text);
    console.log('Archivo Creado en: ', this.file.dataDirectory + 'registros.csv');
  }

}
