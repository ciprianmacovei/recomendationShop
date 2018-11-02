import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PaginationService } from '../../../services/pagination.service';
@Component({
  selector: 'app-shop-pager',
  templateUrl: './shop-pager.component.html',
  styleUrls: ['./shop-pager.component.css']
})
export class ShopPagerComponent implements OnInit {

	@Input()
  private page:number = 1;
  @Input()
  public totalPages:number = 0;
  @Output()
  private changePage:EventEmitter<Number> = new EventEmitter<Number>();

  private items:any;
	private itemsList:number;
	private startItem:number = 0;
  private totalNumberOfItems:number;


  constructor(private pageS:PaginationService) {
  	this.pageS.getItems().then(res => {
  		this.items = res;
  		this.itemsList = this.items.length;
  		console.log('ding on the inside',this.items);
      this.totalNumberOfItemsForPages();
      this.totalNumberOfPages();

  	})
    .then( res => {this.pageS.getItemsQuery(0,6).then(res => {this.items = res})})


   
  }


  totalNumberOfItemsForPages(){
    for(let i in this.items){
        this.totalNumberOfItems = Number(i);
      }
      this.totalNumberOfItems = this.totalNumberOfItems + 1;
  }

  totalNumberOfPages(){
    this.totalPages = Math.ceil(this.totalNumberOfItems / 6);
    if (this.totalNumberOfItems % 6 != 0){
      // this.totalPages = this.totalPages + 1;
    }
  }

  nextPost(){
    this.page = this.page + 1;
    this.changePage.emit(this.page)
    
    console.log('numarul de pagini',this.totalPages,'pagina',this.page,'total',this.totalNumberOfItems)
    this.pageS.getItemsQuery((this.page-1)*6,6).then( res => this.items = res);

  }


  priviousPost(){
    this.page = this.page - 1;
    this.changePage.emit(this.page)
    console.log('numarul de pagini',this.totalPages,'pagina',this.page,'total',this.totalNumberOfItems)
    this.pageS.getItemsQuery((this.page-1)*6,6).then( res => this.items = res);

  }


  ngOnInit() {
  }

}
