import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CartComponent } from './cart/cart.component';
import { TabsComponent } from './tabs/tabs.component';
import { DishComponent } from './dish/dish.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { OrdersComponent } from './admin/dashboard/orders/orders.component';
import { StatsComponent } from './admin/dashboard/stats/stats.component';
import { ItemComponent } from './cart/item/item.component';
import { BinComponent } from './cart/bin/bin.component';
import { TotalComponent } from './cart/total/total.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CartComponent,
    TabsComponent,
    DishComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    OrdersComponent,
    StatsComponent,
    ItemComponent,
    BinComponent,
    TotalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
