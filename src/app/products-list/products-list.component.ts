import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { Product } from 'src/model/product.model';
import { ProductsService } from '../products.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public products$: Observable<Product[]>;
  public userFavorites$: Observable<string[]>;

  constructor(
    private productsService: ProductsService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter((params) => params.keys.length > 0),
        mergeMap((params) =>
          this.userService.addToFavorites(params.get('pid'))
        )
      )
      .subscribe();
    this.products$ = this.productsService.getProducts();
    this.userFavorites$ = this.userService.getFavorites();
  }

}
