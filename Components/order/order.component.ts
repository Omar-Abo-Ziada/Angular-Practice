import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, booleanAttribute, viewChild } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Icategory } from '../../src/models/icategory';
import { FormatCreditCardPipe } from "../../src/app/pipes/format-credit-card.pipe";
import { Iproduct } from '../../src/models/iproduct';
import { reduce } from 'rxjs';
import { ApiCategoryService } from '../../src/Services/api-category.service';

@Component({
    selector: 'app-order',
    standalone: true,
    templateUrl: './order.component.html',
    styleUrl: './order.component.css',
    imports: [ProductsComponent, FormsModule, CommonModule, FormatCreditCardPipe]
})
export class OrderComponent implements AfterViewInit , OnInit , OnChanges{

  categories: Icategory[] = [];

    selectedCategId : number = 0 ;

    creditCardNumber : number = 1234567891234567 ;   // 16 digits
    // 0000000000000000

  recievedTotalOrderPrice: number = 0;

   currentProdCount : number = 0 ;

   addedToCartProducts : Iproduct[];

  //recievedProduct : Iproduct = {name :"_" , id : 0 , quantity : 0 , price : 0 , catId : 0 , imgUrl : "" , orderedQuantity : 0 } ;

   currentCategoryName : string = "";

   @ViewChild(ProductsComponent) productComp ! : ProductsComponent

    constructor(private _ApiCategoryService : ApiCategoryService){

        // this.categories = [
        //     { id: 1, name: "phones" },
        //     { id: 2, name: "Labtops" },
        //     { id: 3, name: "hand watches" },
        //   ];

    this.addedToCartProducts = new Array();

    }

  ngOnChanges(changes: SimpleChanges): void {

    this._ApiCategoryService.getAllCategories().subscribe({
      next : res => {
        this.categories = res ;
      } , 
      error : err => {
        console.error(err) ; 
        alert("Failed to connect to server , make suer that the server is running and try again");
      }
    });

  }

  ngOnInit(): void {

    this._ApiCategoryService.getAllCategories().subscribe({
      next : res => {
        this.categories = res ;
      } , 
      error : err => {
        console.error(err) ; 
        alert("Failed to connect to server , make suer that the server is running and try again");
      }
    });
    
  }

  ngAfterViewInit(): void
  {
    console.log(this.productComp);
  }

    trackProducts(index : number , prod : Icategory)
    {
      // returning some thinf unique so that the ngfor can track the changed element and change them only not the entire array
      // better to be simple value (=>not obj) and can't be changed ( =>so don't use index)
       return prod.id ; 
    }

    handleAddToCartEvent(prod : Iproduct)
    {
       let isfound : boolean = false ;

        this.addedToCartProducts.forEach(p => 
        {
             if (p.id == prod.id)
             {
                p.orderedQuantity = prod.orderedQuantity ;

                isfound = true ;
             }
        });
         
        if(!isfound)
        {
            this.addedToCartProducts.push(prod);
        }
    }

    handleTotalPriceEvent(values : [number , number])
    {
        this.recievedTotalOrderPrice = values[0] ;

        this.currentProdCount = values[1] ;
    }

}
