import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash ,faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList:undefined | product[];
  productDeleteMessage:undefined | string;
  iconDelete = faTrash;
  iconEdit = faEdit;

  constructor(private product:ProductService) { }

  ngOnInit(): void {

    this.listProduct();

  }

  deleteProduct(id:number){
    console.warn('id is :' ,id);
    this.product.deleteProduct(id).subscribe((result)=>{
      this.listProduct();
      if(result){
        this.productDeleteMessage = "Product deleted Success Fully";
      }
    })
    setTimeout(()=>{
      this.productDeleteMessage = undefined;
    },3000);
  }

  listProduct(){
    this.product.productList().subscribe((result)=>{
      this.productList = result;
    })
  }

}
