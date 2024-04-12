import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiCategoryService } from '../../src/Services/api-category.service';
import { Icategory } from '../../src/models/icategory';
import { Iproduct } from '../../src/models/iproduct';
import { ApiProductsService } from '../../src/Services/api-products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  categories : Icategory[] = []

  product : Iproduct = {} as Iproduct

  constructor(
    private _ApiCategoryService : ApiCategoryService , 
    private _ApiProductsService : ApiProductsService ,
    private _Router : Router ,
    private _ActivatedRoute : ActivatedRoute
  ) 
  {
    
  }

  ngOnInit(): void {

    // --------------------------------------------------------------

    this._ActivatedRoute.paramMap.subscribe(paramMapObj => {

      // this.currentProductId = Number( paramMapObj.get('id') );  
      //this.currentProductId =  paramMapObj.get('id') as string;   // u can use Type assertion to tell typescript to deal with it as string ,, but if null => run time error
    
      // or better check for null explicity like this :
      let tempId = paramMapObj.get('id') ; 

      if(tempId != null){

        this.product.id = tempId ;
      }
      else
      {
        console.log("Id = null") ;

        alert("there is no proudct found with this ID");
      }
      
      this._ApiProductsService.getProductById(this.product.id).subscribe({

        next : res => {

          this.product = res ;
        } ,
        error : err => {

          console.error(err);

          alert("Error : Failed to connect to the server , make suer that the server is running and try again")

        }
      });

    })

    //this.productsIds = this._staticProductsService.mapProductsToIds();

    //---------------------------------------------------------------

     this._ApiCategoryService.getAllCategories().subscribe({

      next : res => {

        this.categories = res ;

      } , 
      error : err => {

        console.log(err);

        alert("failed to connect the server , check the server is running then try again");
        
      }

    });
  }

  editProduct(){

    this._ApiProductsService.editProduct(this.product.id , this.product).subscribe({

      next : res => {

        console.log("edit success");

        alert("Edited successfully");

        this._Router.navigateByUrl(`/products`);
        
      } , 

      error : err => {

        console.log(err);

        alert("failed to connect the server , check the server is running then try again");
        
      }

    });

  }

}
