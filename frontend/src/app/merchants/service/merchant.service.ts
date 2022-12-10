import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { IMerchant } from './../../shared/models/merchant.model';
import { IMerchantService } from './merchant-service.interface';

@Injectable({
  providedIn: 'root',
})
export class MerchantService implements IMerchantService {
  private readonly baseUrl: string = environment.backendUrl;
  constructor(private readonly http: HttpClient) {}

  getMerchants(): Observable<IMerchant[]> {
    return this.http.get<IMerchant[]>(`${this.baseUrl}/restaurants`);
  }
}
