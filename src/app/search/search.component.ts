import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult:undefined | product[];
  noSearchResult = false;
  searchQuery:string| undefined | null;
  constructor(private product:ProductService,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.product.searchProducts(query).subscribe((result)=>{

     this.searchResult = result;
     if(this.searchResult.length < 1){
      this.noSearchResult = true
      this.searchQuery = query;
    }
      
    })
  }

}
