import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaticProductsService } from '../../src/Services/static-products.service';
import { Iproduct } from '../../src/models/iproduct';
import { CurrencyPipe, Location } from '@angular/common';
import { ApiProductsService } from '../../src/Services/api-products.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
 
  currentProductId : string = "";

  product : Iproduct | undefined = {} as Iproduct

  productsIds : string[] = []

  constructor
  (private _activatedRoute : ActivatedRoute ,
    // private _staticProductsService : StaticProductsService ,
  private _router : Router , 
  private _location : Location , 
  private _ApiProductService : ApiProductsService) 
  {

  }

  ngOnInit(): void 
  {
    // console.log( "ID :" + this._activatedRoute.snapshot.paramMap.get('id'));
   
    // this.currentProductId = Number(this._activatedRoute.snapshot.paramMap.get('id'));

    // this.product = this._staticProductsService.getById(this.currentProductId);

    this._activatedRoute.paramMap.subscribe(paramMapObj => {

      // this.currentProductId = Number( paramMapObj.get('id') );  
      //this.currentProductId =  paramMapObj.get('id') as string;   // u can use Type assertion to tell typescript to deal with it as string ,, but if null => run time error
    
      // or better check for null explicity like this :
      let tempId = paramMapObj.get('id') ; 

      if(tempId != null){

        this.currentProductId = tempId ;
      }
      else
      {
        console.log("Id = null") ;

        alert("there is no proudct found with this ID");
      }
      

 
      // this.product = this._staticProductsService.getById(this.currentProductId);
      this._ApiProductService.getProductById(this.currentProductId).subscribe({
        next : res => {
          this.product = res ;
        } ,
        error : err => {
          console.error(err);
          alert("Error : Failed to connect to the server , make sure that the server is running and try again")
        }
      });

    })

    //------------------------------------------------------
    // mapping the products IDs 

    this._ApiProductService.getAllProducts().subscribe({
      next : res => {
        
        this.productsIds = res.map(p => p.id);

        console.log("Products IDs mapped successfully");
        
      } , 
      error : err => {

        console.log(err);

        alert("Error : Failed to connect to the server , make sure that the server is running and try again")

      }
    });
    //------------------------------------------------------
  }

  next()
  {
     let currentIdIndex = this.productsIds.findIndex(id => id == this.currentProductId) ;

     if(currentIdIndex != this.productsIds.length - 1)
      {
      let nextProductId = this.productsIds[currentIdIndex + 1] ;

      // this.currentProductId = nextProductId ;
 
      // this.product = this._staticProductsService.getById(this.currentProductId);
 
      this._router.navigateByUrl(`/details/${nextProductId}`);
     }
  }

  prev()
  {
    let currentIdIndex = this.productsIds.findIndex(id => id == this.currentProductId) ;

    if(currentIdIndex > 0)
    {
      let prevProductId = this.productsIds[currentIdIndex - 1] ;

      // this.currentProductId = prevProductId ;
  
      // this.product = this._staticProductsService.getById(this.currentProductId);
  
      this._router.navigateByUrl(`/details/${prevProductId}`);
    }
  }

  backStack()
  {
      this._location.back();
  }

}
