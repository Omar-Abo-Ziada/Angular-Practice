import { Routes } from '@angular/router';
import { HomeComponent } from '../../Components/home/home.component';
import { LoginComponent } from '../../Components/login/login.component';
import { AboutusComponent } from '../../Components/aboutus/aboutus.component';
import { NotFoundComponent } from '../../Components/not-found/not-found.component';
import { OrderComponent } from '../../Components/order/order.component';
import { ProductsComponent } from '../../Components/products/products.component';
import { ValuesComponent } from '../../Components/values/values.component';
import { VisionComponent } from '../../Components/vision/vision.component';
import { DetailsComponent } from '../../Components/details/details.component';
import { AddProductComponent } from '../../Components/add-product/add-product.component';
import { EditProductComponent } from '../../Components/edit-product/edit-product.component';

export const routes: Routes = 
[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    
    { path: 'login', component: LoginComponent },

    { path: 'aboutus', component: AboutusComponent , children:[
        {path : '' , redirectTo : 'values' , pathMatch : 'full' },
        {path : 'values' , component : ValuesComponent},
        {path : 'vision' , component : VisionComponent}
    ] },

    { path: 'order', component: OrderComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'Add', component: AddProductComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'edit/:id', component: EditProductComponent },

    { path: '**', component: NotFoundComponent },
];
