import { Injectable } from '@angular/core';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class StaticProductsService {

  products : Iproduct[]

  constructor() 
  {
    this.products = [
      { id: "1", name: "Samsung", orderedQuantity:0, price: 12000, quantity: 5, catId: 1, imgUrl: "https://th.bing.com/th/id/R.7d55af56b9e7ea4b4eb3cebdcd2d754f?rik=IXvHRYOQ1jN%2b7g&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2016%2f06%2fSamsung-Mobile-Phone-PNG-Image.png&ehk=lxcLJ12AsgXKiLDd3tjaBY%2fR1nu01sKnLVi90bWusLA%3d&risl=&pid=ImgRaw&r=0" },
      { id: "2", name: "Iphone", orderedQuantity:0, price: 40000, quantity: 2, catId: 1, imgUrl: "https://th.bing.com/th/id/R.30e71f6a3d2674779227a548f86e0527?rik=1Z5SeGTF%2fMD%2fgA&pid=ImgRaw&r=0" },
      { id: "3", name: "dell", orderedQuantity:0, price: 35000, quantity: 12, catId: 2, imgUrl: "https://www.pngarts.com/files/4/Dell-Laptop-PNG-Image.png" },
      { id: "4", name: "lenovo", orderedQuantity:0, price: 50000, quantity: 9, catId: 2, imgUrl: "https://www.pngall.com/wp-content/uploads/8/Lenovo-Laptop-PNG-Free-Download.png" },
      { id: "5", name: "Gshock", orderedQuantity:0, price: 5000, quantity: 10, catId: 3, imgUrl: "https://paradoxfwc.com/wp-content/uploads/2019/11/GSTB100D-1A_hd.png" },
      { id: "6", name: "Rolex",  orderedQuantity:0, price: 100000, quantity: 4, catId: 3, imgUrl: "https://pluspng.com/img-png/rolex-png-submariner-date-360.png" },
    ];

   }

   getAll()
   {
     return this.products ;
   }

   getById(id : string ) : Iproduct | undefined
   {
       return this.products.find(p => p.id == id)
   }

   getByCategoryId(id : number) : Iproduct[] 
   {
      if(id == 0)
      {
        return this.products ;
      }
      else
      {
        return this.products.filter( p => p.catId == id);
      }
   }

   mapProductsToIds() : string[]
   {
     return this.products.map(p => p.id)
   }

} 
 