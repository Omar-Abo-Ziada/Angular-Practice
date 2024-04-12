import { Component, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiProductsService } from '../../src/Services/api-products.service';
import { Icategory } from '../../src/models/icategory';
import { ApiCategoryService } from '../../src/Services/api-category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Iproduct } from '../../src/models/iproduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ CommonModule , FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  categories: Icategory[] = [];
  // selectedCatID: number = 0;

  product : Iproduct = {} as Iproduct ; 

  selectedFile: File | null = null;

  constructor
  (private _ApiCategoryService: ApiCategoryService ,
    private _ApiProductsService : ApiProductsService , 
    private _Router : Router
  ) {}

  ngOnInit(): void {

    //this.selectedCatID = 0; // Ensure selectedCatID is set to 0 when the component initializes

    this.product.catId = 0 ;

    this.fetchCategories();
  }

  fetchCategories(): void {

    this._ApiCategoryService.getAllCategories().subscribe({
      next: res => {
        this.categories = res;
      },
      error: err => {
        console.error(err);
        alert("Failed to connect to the server. Make sure that the server is running and try again.");
      }
    });
  }

  onFileSelected(event: any): void {

    if (event.target.files && event.target.files.length > 0) {

      const file = event.target.files[0];

      this.uploadImage(file);
    }
  }
  uploadImage(file: File): void {
    const formData = new FormData();
    formData.append('image', file);
  
    this._ApiProductsService.uploadImage(formData).subscribe(
      imageUrl => {
        console.log('Image uploaded successfully. URL:', imageUrl);
        // Handle the response (e.g., update product with the image URL)
      },
      error => {
        console.error('Error uploading image:', error);
      }
    );
  }
  
  

  // addNewProduct()
  // {
  //   console.log(this.product)

  //   this._ApiProductsService.addNewProduct(this.product).subscribe({
  //     next : res => {

  //       console.log("response :");
  //       console.log(res);

  //       alert("Product Added Successfully")

  //       this._Router.navigateByUrl(`/products`);
      
  //     } ,
  //     error : err => {
  //       console.error(err) ; 
  //       alert("Failed to Add Product , check the server is running then try again")
  //     }
  //   })
  // }

  addNewProduct(): void {

    if (this.selectedFile) {

      const formData = new FormData();

      formData.append('image', this.selectedFile);

      this._ApiProductsService.uploadImage(formData).subscribe(imageUrl => {

        this.product.imgUrl = imageUrl;

        this.saveProduct();
      });
    } else {

      alert("Please select an image file.");

    }
  }

  saveProduct(): void {

    this._ApiProductsService.addNewProduct(this.product).subscribe({

      next: () => {

        alert("Product Added Successfully");

        this._Router.navigateByUrl(`/products`);

      },
      error: err => {

        console.error(err);

        alert("Failed to Add Product. Please try again later.");
      }
    });
  }

}