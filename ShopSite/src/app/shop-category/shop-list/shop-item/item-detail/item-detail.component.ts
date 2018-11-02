import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ItemsService } from '../../../../services/items.service';
import { ComunicationService } from '../../../../services/comunication.service';
import { ShopItemComponent } from '../shop-item.component';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

	public idNumber:Number;
	public selectedItem;
	public wishList;
	public basketItem:Boolean;
	public buyingList = [];
  public quantity:any;

  constructor(private ts:ToastrService,private activateRoutes:ActivatedRoute,private itemAuth:ItemsService,private comm:ComunicationService) {
  	this.getParamId()
  	this.getSelectedItem();
  }

  ngOnInit() {
  }

  rating(e){
    console.log('clicked');
    this.SetRatingStar(e);
    
  }  

  SetRatingStar(event){
     // $(".stea").on("click",function(){
       console.log($(event.path[0]).attr('value'))
       $('input.rating-value').val($(event.path[0]).attr('value'));
      console.log($(".rating-value").val(),"valoare la input")
      return $('.stea').each(function() {
    if (parseInt($('.rating-value').val()) >= parseInt($(this).attr('value'))) {
      console.log($(this));
      $(this).addClass('rating-selected');
      $(this).html('&#9733;');
    } 
    else
    {
      $(this).removeClass('rating-selected');
      $(this).html('&#9734;');
    }

      });
    // })
  }

  sendRateItem(){
    console.log('mortii tai de obiect',this.itemAuth.item[0].item_type)
    if ($('.rating-value').val() != 0){
      this.itemAuth.rateItem(this.idNumber,$('.rating-value').val(),this.itemAuth.item[0].item_type).then( res => {
        console.log(res);
        if (res == false){
          this.ts.error('User has allready rated this item','Item Rated');
        }
        else {
          this.ts.success('You have succesfuly rated this item','Item Rated');
        }
      })
    }
  }


  getParamId(){
  	this.activateRoutes.params.subscribe( params => {this.idNumber=params.id;})
  }

  getSelectedItem(){

  	this.itemAuth.getItem(this.idNumber).then(res => {
  			this.selectedItem = this.itemAuth.item[0];
        this.quantity = res[0].numar;
    });
  }


  buyProduct(event){
      if (this.quantity != 0){

        if (sessionStorage.getItem('basketItem') == 'false' && sessionStorage.getItem('buyArray') != null ){
          location.reload();
        }
      	this.basketItem = true;
        localStorage.setItem('buyBucketList',''+this.buyingList);
        this.comm.sendObject({data:true,item:event.path[2].firstElementChild.firstElementChild.innerText});
       	console.log(event.path[2].firstElementChild.firstElementChild.innerText,'asdasdasda',this.buyingList);

      }
      else {

        this.ts.error('ItemsList','There are not enough items in the shop');
      }	
      this.quantity = this.quantity - 1;
      if (this.quantity < 0 ){
        this.quantity = 0;
      } 
  }

}
