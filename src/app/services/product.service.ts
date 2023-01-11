import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[] | []>()

  constructor(private http:HttpClient) { }

  addProduct(data:product){

   return this.http.post('http://localhost:3000/product',data);
  }
  productList(){
    return this.http.get<product[]>('http://localhost:3000/product');
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/product/${id}`);
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/product/${id}`);
  }

  updateProduct(product:product){

    return this.http.put(`http://localhost:3000/product/${product.id}`,product);

  }

  popularProducts(){

    return this.http.get<product[]>('http://localhost:3000/product?_limit=5');
   
  }

  trendyProducts(){
    return this.http.get<product[]>('http://localhost:3000/product?_limit=8');
   
  }
  searchProducts(query:string){
    return this.http.get<product[]>(`http://localhost:3000/product?q=${query}`);
   
  }
  localAddToCart(data:product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart)
    {
      localStorage.setItem('localCart',JSON.stringify([data]));
    }else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }
}
