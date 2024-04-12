import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from '../../Components/products/products.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { NewNavComponent } from '../../Components/new-nav/new-nav.component';
import { OrderComponent } from "../../Components/order/order.component";



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NewNavComponent, ProductsComponent, FooterComponent, OrderComponent]
})
export class AppComponent {
  title = 'test2';
}
