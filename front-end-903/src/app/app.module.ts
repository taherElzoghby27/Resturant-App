import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';
import {ProductsComponent} from './componants/products/products.component';
import {HeaderComponent} from './componants/header/header.component';
import {CategoryComponent} from './componants/category/category.component';
import {CardDetailsComponent} from './componants/card-details/card-details.component';
import {CardComponent} from './componants/card/card.component';
import {BrowserModule} from '@angular/platform-browser';
import {FooterComponent} from './componants/footer/footer.component';
import {ChefsComponent} from './componants/chefs/chefs.component';
import {ContactInfoComponent} from './componants/contact-info/contact-info.component';
import {APP_BASE_HREF} from '@angular/common';
import {PanelComponent} from './componants/panel/panel.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

// http://localhost:4200/
export const routes: Routes = [
  // http://localhost:4200/products
  {path: 'products', component: ProductsComponent},
  {path: 'category/:id', component: ProductsComponent},
  {path: 'search/:key', component: ProductsComponent},
  {path: 'category/:id/search/:key', component: ProductsComponent},
  // http://localhost:4200/cardDetails
  {path: 'cardDetails', component: CardDetailsComponent},
  // http://localhost:4200/cardDetails
  {path: 'contact-info', component: ContactInfoComponent},
  // http://localhost:4200/chefs
  {path: 'chefs', component: ChefsComponent},
  {path: 'panel', component: PanelComponent},
  // http://localhost:4200/
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

/*
*   // http://localhost:4200/
  {path: '', component:OrderItemsComponent}
* */
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    CategoryComponent,
    CardDetailsComponent,
    CardComponent,
    FooterComponent,
    ChefsComponent,
    ContactInfoComponent,
    PanelComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbPaginationModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
