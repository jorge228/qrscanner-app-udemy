import { Injectable } from '@angular/core';
import { Registration } from '../models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  record: Registration[] = [];

  constructor() { }

  saveRecord(format: string, text: string) {
    const newRecord = new Registration(format, text);
    this.record.unshift(newRecord);
    console.log(this.record);
  }

}
