import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { LocalStorageService } from '../localStorageService';


export interface IBike {
  id?: number;
  image: string;
  description: string;
  price: number;
  quantity: number;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  bikes: Array<IBike> = [];
  nameParams = '';
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
  ) { }


  async ngOnInit() {
    const bikes = JSON.parse(localStorage.getItem('bikes'));
    if ( bikes && bikes.length > 0) {
      this.bikes = bikes;
    } else {
      this.bikes = await this.loadCartFromJSON()
    }
  }

  async loadCartFromJSON() {
    const bike = await this.http.get('assets/inventory.json').toPromise();
    return bike.json();
  }

  addItems(item: string) {
    switch (item) {
      case 'Bike1':
        this.bikes.unshift({
          "id": 1,
          "image": "../../ assets / bike1.jpeg",
          "description": "Bike Model 1",
          "price": 5000,
          "quantity": 1
        });
        break;
      case 'Bike2':
        this.bikes.unshift({
          "id": 2,
          "image": "../../assets/bike2.jpe",
          "description": "Bike Model 2",
          "price": 4000,
          "quantity": 1

        });
        break;
      case 'Bike3':
        this.bikes.unshift({
          "id": 3,
          "image":"../../assets/bike3.jpe",
          "description": "Bike Model 3",
          "price": 3000,
          "quantity": 1
        });
        break;
    }
  }

  deleteBike(index: number) {
    this.bikes.splice(index, 1);
    this.saveBike();
  }

  saveBike() {
    localStorage.setItem('bikes', JSON.stringify(this.bikes));
    this.toastService.showToast('success', 2000, 'Saved.')
  }

  validate(name: string, total: number, taxAmount: number, subTotal: number){
    if (!total){
    }
  }
  calculateTotal() {
    const total = this.bikes.reduce((acc: number, item: IBike) =>{
      acc += item.quantity * item.price;
      return acc;
    }, 0);
    const taxAmount = total * .15;
    const subTotal = total - taxAmount;
    const grandTotal = subTotal + taxAmount;
    this.router.navigate(['invoice', {
      name, taxAmount, subTotal, grandTotal}
    ])
    console.log('total is', total);
    
   










}
