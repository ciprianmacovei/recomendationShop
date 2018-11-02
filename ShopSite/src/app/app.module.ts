import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlTree ,DefaultUrlSerializer, UrlSerializer } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BootstrapModule } from './bootstrap.module'

//services
import { SearchBarService } from './services/search-bar.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { ItemsService } from './services/items.service';
import { ComunicationService } from './services/comunication.service';
import { PaginationService } from './services/pagination.service';
import { ChatbotService } from './services/chatbot.service';
//routes
import { appRoutes} from '../routes';
import { RouterModule } from '@angular/router'; 

//components
import { GamingComponent } from './shop-category/chategory-items/gaming/gaming.component';
import { ElectClimComponent } from './shop-category/chategory-items/elect-clim/elect-clim.component';
import { PcSoftComponent } from './shop-category/chategory-items/pc-soft/pc-soft.component';
import { AutoMotoComponent } from './shop-category/chategory-items/auto-moto/auto-moto.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShopCategoryComponent } from './shop-category/shop-category.component';
import { ShopListComponent } from './shop-category/shop-list/shop-list.component';
import { ShopItemComponent } from './shop-category/shop-list/shop-item/shop-item.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ItemDetailComponent } from './shop-category/shop-list/shop-item/item-detail/item-detail.component';
import { LoginCredentialPannelComponent } from './login-credential-pannel/login-credential-pannel.component';
import { ItemBasketComponent } from './shop-category/shop-list/item-basket/item-basket.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ChategoryItemsComponent } from './shop-category/chategory-items/chategory-items.component';
import { LapTabTelComponent } from './shop-category/chategory-items/lap-tab-tel/lap-tab-tel.component';
import { SportComponent } from './shop-category/chategory-items/sport/sport.component';
import { TvMultimediaComponent } from './shop-category/chategory-items/tv-multimedia/tv-multimedia.component';
import { ShopPagerComponent } from './shop-category/shop-list/shop-pager/shop-pager.component';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
import { DelieveryComponent } from './delievery/delievery.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShopCategoryComponent,
    ShopListComponent,
    ShopItemComponent,
    LoginComponent,
    RegisterComponent,
    ItemDetailComponent,
    LoginCredentialPannelComponent,
    ItemBasketComponent,
    SearchBarComponent,
    ChategoryItemsComponent,
    AutoMotoComponent,
    PcSoftComponent,
    ElectClimComponent,
    GamingComponent,
    LapTabTelComponent,
    SportComponent,
    TvMultimediaComponent,
    ShopPagerComponent,
    ContactComponent,
    PricingComponent,
    DelieveryComponent,
  ],
  imports:[
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    BootstrapModule
  ],
  providers:[
  AuthGuard,
  AuthenticationService,
  ItemsService,
  ComunicationService,
  SearchBarService,
  PaginationService,
  BsModalService,
  ChatbotService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
