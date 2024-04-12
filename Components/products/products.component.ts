import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Iproduct } from '../../src/models/iproduct';
import { CommonModule } from '@angular/common';
import { Icategory } from '../../src/models/icategory';
import { FormsModule } from '@angular/forms';
import { VisualizeDirective } from '../../src/app/Directives/visualize.directive';
import { FormatCreditCardPipe } from "../../src/app/pipes/format-credit-card.pipe";
import { StaticProductsService } from '../../src/Services/static-products.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiProductsService } from '../../src/Services/api-products.service';
import { environment } from '../../src/environments/environment.development';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    imports: [CommonModule, FormsModule, VisualizeDirective, FormatCreditCardPipe , RouterLink , RouterLinkActive  ]
})
export class ProductsComponent implements OnChanges , OnInit {

  products: Iproduct[] = [];

  filteredProducts: Iproduct[] = [];

  totalOrderPrice: number = 0;

  @Input() recievedSelectedCatId : number = 0 ;

  @Output() onAddToCart : EventEmitter<Iproduct> = new EventEmitter<Iproduct>() ;

  @Output() onTotalOrderPriceChanged : EventEmitter<[number , number]> = new EventEmitter<[number , number]>() ;  // => creating a tuble to send more than number


  constructor
  ( private _router : Router ,
    private _apiProductsService : ApiProductsService)
   {
    // this.filteredProducts = this._staticProductsService.getAll() ;

    // this._apiProductsService.getAllProducts().subscribe(res =>{
    //   this.products = res ;
    // } );
  }

  ngOnInit(): void {

    // I Think it's not really important because oncahnges handeles it any way
    // this._apiProductsService.getAllProducts().subscribe(res => {

    //   this.filteredProducts = res ;
    // });

    // to handel the success and failer :
    this._apiProductsService.getAllProducts().subscribe({

      next : res => {

        this.filteredProducts = res ;

      } , 
      error : err => {

        console.error(err);

        alert("Error : Failed to connect to the server , make suer that the server is running and try again");

      } 
    });
  }

  ngOnChanges(): void 
  {
    // now I am calling the api 
    //  this.filterProductsFn();
    // this.filteredProducts = this._staticProductsService.getByCategoryId(this.recievedSelectedCatId);

    // this._apiProductsService.getProductsByCatId(this.recievedSelectedCatId)
    // .subscribe(res =>{

    //   console.log(res) ;

    //   if(this.recievedSelectedCatId != 0)
    //   {

    //     this.filteredProducts = res ;
    //   }
    //   else
    //   {

    //     this._apiProductsService.getAllProducts().subscribe(res => {

    //       this.filteredProducts = res ;

    //     })
    //   }

    // } );

    //=============================================
    // to handel the success and failer :

    this._apiProductsService.getProductsByCatId(this.recievedSelectedCatId).subscribe({

      next : res => {

        if(this.recievedSelectedCatId != 0){

          this.filteredProducts = res ;
        }
        else
        {
          this._apiProductsService.getAllProducts().subscribe({

            next : res => {this.filteredProducts = res} ,

            error : err => {
              console.error(err); 

               alert("Error : Failed to connect to the server , make suer that the server is running and try again");
              }
          })
        }
      } ,

      error : err => {
        console.error(err);
        alert("Error : Failed to connect to the server , make suer that the server is running and try again");
      }
    });

    //===============================================================================================
   // to track any changes and always gets the latest version of products after (edit or delete or add)
   // I don't think it's right

    // this._apiProductsService.getAllProducts().subscribe({
    //   next : res => {
    //     this.products = res ;
    //   } , 
    //   error : err => {
    //     console.error(err);
    //     alert("Error : Failed to connect to the server , make suer that the server is running and try again");
    //   } });
  }

  buy(quan: string , prodId: string) {

    let count = parseInt(quan);

    if (isNaN(count)) 
    {

      alert("Enter the quantity first");

      // count = 1;

      // this.products.forEach(prod =>
      //    {
      //   if (prod.id == prodId) 
      //   {
      //     if(prod.quantity > 0)
      //     {
      //       this.totalOrderPrice += prod.price * count;

      //       prod.orderedQuantity += count ;

      //       prod.quantity -= count ;  // 1

      //       this.onAddToCart.emit(prod);

      //       this.onTotalOrderPriceChanged.emit([this.totalOrderPrice , count]);

      //       // this.onTotalOrderPriceChanged.emit([this.totalOrderPrice , count]);

      //       prod.quantity -= 1 ;
      //     }else{
      //       alert("This product is out of stock for now")
      //     }
      //   }
      // });
    }
    else 
    {
      this.products.forEach(prod => 
        {
        if (prod.id == prodId)
         {
          if(prod.quantity - count >= 0)
          {
            this.totalOrderPrice += prod.price * count;

            prod.orderedQuantity += count ;

            prod.quantity -= count ;
   
            this.onAddToCart.emit(prod);

            this.onTotalOrderPriceChanged.emit([this.totalOrderPrice , count]);

          }
          else
          {
            alert(`There are only ${prod.quantity} items available`)
          }
        }
      });
    }
  }

  filterProductsFn()
  {
    // if(this.recievedSelectedCatId == 0)
    // {
    //   this.filteredProducts = this.products ;
    // }
    // else
    // {
    //   this.filteredProducts = this.products.filter(p => p.catId == this.recievedSelectedCatId);
    // }
  }

  goToDetails(id : string)
  {
      this._router.navigateByUrl(`/details/${id}`);  // takes the url as string

    // this._router.navigate(['/details' , id]);  // takes the url as a first element of array

    // using this service instead of routrtlink if i wanted to do some thing before routing or saving ata dtabase or whatever

  }

  edit(id : string){

    this._router.navigateByUrl(`/edit/${id}`);

  }

  deleteProduct(id : string){

    console.log(id);
    
    let confirmResponse =  confirm("Are you sure you want to delete this product ? ");

    if(confirmResponse == true ){

      this._apiProductsService.deleteProduct(id).subscribe({

        next : res => {

           // Remove the deleted product from the local array
           this.filteredProducts = this.filteredProducts.filter(prod => prod.id !== id);

          console.log("successfully deleted");
          
          console.log(res);

        } ,

        error : err => {

          alert("Failed To delete , check the json-server is running then try again")

          console.log(err);
          
        }
      });

      alert("deleted");

    }else{

      alert("ok , never mind");

    }

    //this._router.navigateByUrl(`/delete${id}`);

  }
}
