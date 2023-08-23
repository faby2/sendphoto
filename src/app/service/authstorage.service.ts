import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthstorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  saveToken(token: string) {
    return this.set('authToken', token);
  }

  getToken():Promise<boolean> {
    return this.get('authToken');
  }

  removeToken() {
    return this._storage?.remove('authToken');
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async isLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    console.log('token', token)
    return new Promise((resolve,reject)=>{
      if(token)
        resolve(true)
      else
        reject(true)
    })
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key:string) : any {
    return this._storage?.get(key)
  }
}
