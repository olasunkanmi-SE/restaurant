import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  saveToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  getToken() {
    return localStorage.getItem('jwt_token');
  }

  removeToken(): void {
    localStorage.removeItem('$token');
  }

  saveItem(alias: string, item: any): void {
    localStorage.setItem(alias, item);
  }

  getItem(alias: string) {
    return localStorage.getItem(alias);
  }

  removeItem(alias: string): void {
    localStorage.removeItem(alias);
  }

  setLocalObject(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalObject(key: string) {
    const localObject = localStorage.getItem(key);
    return localObject ? JSON.parse(localObject) : null;
  }

  removeLocalObject(key: string): void {
    return localStorage.removeItem(key);
  }
}
