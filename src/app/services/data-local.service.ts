import { Injectable } from '@angular/core';
import { Registration } from '../models/registration.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;
  record: Registration[] = [];

  constructor(private storage: Storage) {
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
    console.log(this.record);
    this._storage?.set('records', this.record);
  }

}
