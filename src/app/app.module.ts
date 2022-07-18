import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';




@NgModule({
    declarations: [AppComponent, ProductListComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule,ReactiveFormsModule,FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
