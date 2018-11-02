import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item.model';
import { PaginationService } from '../../../services/pagination.service';
import { ComunicationService } from '../../../services/comunication.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit,OnDestroy {
	public arrayItems:any;
  

  
  constructor(private page:PaginationService,private comm:ComunicationService) {
  	this.page.getItems().then(res => {
  		this.arrayItems = res;
      console.log('ciprian: atentie !@',this.arrayItems);
      
  	})
  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }


}
