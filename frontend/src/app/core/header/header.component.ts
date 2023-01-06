import { AuthService } from './../../auth/service/auth.service';
import { Store, select } from '@ngrx/store';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as fromAuthReducer from '../../auth/state/auth.reducer';
import * as fromAppReducer from '../../state/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  mobiles: string[] = [];
  accessories: string[] = [];
  fashion: string[] = [];
  laptops: string[] = [];
  games: string[] = [];
  watches: string[] = [];
  mobileAccessories: string[] = [];
  audios: string[] = [];
  smartDevices: string[] = [];

  isAuthenticated = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly store: Store<fromAuthReducer.IAuthState>,
    private readonly auth: AuthService
  ) {
    this.isAuthenticated = this.auth.IsAuthenticated();
  }

  signOut() {
    this.auth.logOut();
  }

  productsCategory = [
    {
      categoryName: 'ElectronicsDevices',
      children: [
        {
          type: 'Mobile & Tablets',
          children: ['Mobiles', 'Landlines', 'Tablets'],
        },
        {
          type: 'Laptop',
          children: ['Traditional Laptops', 'Gaming Laptops'],
        },
        {
          type: 'Console Gaming',
          children: ['Console', 'Console Game', 'Console Game Accessories'],
        },
        {
          type: 'Smart watches & Accessories',
          children: ['Fitness Trackers', 'Smart Trackers'],
        },
      ],
    },
    {
      categoryName: 'Electronics Acessories',
      children: [
        {
          type: 'Mobile Accesories',
          children: ['Phone Cases', 'Power Banks', 'Cables & Converters'],
        },
        {
          type: 'Audios',
          children: [
            'Head Phones & Head Sets',
            'Portable Speakers',
            'Home Audio',
          ],
        },
        {
          type: 'Smart Devices',
          children: [
            'Electronic Cigarrets',
            'Smart Speakers',
            'Virtual Reality',
          ],
        },
      ],
    },
    {
      categoryName: "Men's' Fashion",
      children: [
        {
          type: 'Men Clothing',
          children: ['Tshirt & Tanks', 'Shirts', 'Pants'],
        },
        {
          type: 'Men Shoes',
          children: ['Shoes', 'Boots', 'Flip Flops'],
        },
        {
          type: 'Accessories',
          children: ['Socks', 'Belts', 'Hat & Caps'],
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    const products: any[] = [];
    this.productsCategory.forEach((product) => {
      products.push(product);
      console.log(product);
      const electronics = products[0].children.length;
      this.mobiles = products[0].children[0].children;
      this.laptops = products[0].children[electronics - 3].children;
      this.games = products[0].children[electronics - 2].children;
      this.watches = products[0].children[electronics - 1].children;

      return products;
    });
  }
}
