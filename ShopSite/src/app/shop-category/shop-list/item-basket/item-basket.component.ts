import { Component, OnInit } from '@angular/core';
import { ComunicationService } from '../../../services/comunication.service';
import { ItemsService } from '../../../services/items.service';
import { AppComponent } from '../../../../app/app.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-item-basket',
  templateUrl: './item-basket.component.html',
  styleUrls: ['./item-basket.component.css']
})
export class ItemBasketComponent implements OnInit {

	private backetItems:any;

  constructor(private toastr:ToastrService,private nav:Router,private app:AppComponent,private comm:ComunicationService,private is:ItemsService) {
  	this.boughtItems();
  	console.log(this.backetItems);
   }

  ngOnInit() {
  }

  boughtItems(){
  	this.backetItems = sessionStorage.getItem('buyArray').split(',');
  	
  }

  purchaceItems(event){
  	this.is.buyItems(this.backetItems);
  	this.toastr.success('Items BucketList','Purchace Complete');
	sessionStorage.setItem('basketItem','false');
	console.log(event)
	sessionStorage.removeItem('buyArray')
	this.app.itemList = '';
	this.app.basketItemBuy = [];
	this.app.basketItemBoolean = false;
	this.nav.navigate(['home']);

  }

}
