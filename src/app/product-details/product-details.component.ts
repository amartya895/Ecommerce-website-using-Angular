import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;

  constructor(private product: ProductService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);

    productId && this.product.getProduct(productId).subscribe((result) => {

      this.productData = result;
      let cartData= localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId=== item.id.toString());
        if(items.length){
          this.removeCart=true
        }else{
          this.removeCart=false
        }
      }
    });


  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity -= 1;
    }

  }

  addToCart() {
    if (this.productData) {
      this.productData.productQuantity = this.productQuantity;
      console.warn(this.productData);
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart=true;
      }
    }
  }
  removeToCart(productId: number) {

  }

}
