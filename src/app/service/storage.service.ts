import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {}

  saveToken(token: string) {
    return this.storage.set('authToken', token);
  }

  getToken() {
    return this.storage.get('authToken');
  }

  removeToken() {
    return this.storage.remove('authToken');
  }
}
