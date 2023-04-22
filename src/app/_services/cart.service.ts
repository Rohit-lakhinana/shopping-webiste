import { Injectable } from '@angular/core';
import { Product } from '../models/cart.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  data: Product[] = [
    { id: 1,
      name: ' Red T-shirt',
      price: 400,
      qty: 1,
      weight:200,
      "imageUrl": "https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008__340.png"
      
    },
    { id: 2,
      name: 'White Shirt',
      price: 300,
      qty: 1,
      weight:200,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScIHeaPRtS81SfZgV0Z3p3HYx_YjOidK606r9w2-pp7A&usqp=CAU&ec=48600113"
    },
    { id: 3,
      name: 'black jean',
      price: 400,
      qty: 1,
      weight:200,
      imageUrl: "data:image/jpeg;base64,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"
    },
    { id: 4,
      name: 'Combo-shirts yellow',
      price: 900,
      qty: 1,
      weight:200,
      imageUrl: "https://cdn.shopify.com/s/files/1/1002/7150/products/New-Mockups---no-hanger---TShirt-Yellow.jpg?v=1639657077"
    },
    { id: 5,
      name: 'hoodie',
      price: 1000,
      qty: 1,
      weight:200,
      imageUrl: "data:image/jpeg;base64,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"
    },
   
  ]

  private cart = []
  private cartItemCount = new BehaviorSubject(0);
  
  
  constructor() { }

  getProducts(){
    return this.data;
  }

  getCart(){
    return this.cart;
  }

  getCartItemCount(): BehaviorSubject<number> {
		return this.cartItemCount;
	}

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.qty += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.qty = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (const [index, item] of this.cart.entries()) {
			if (item.id === product.id) {
				item.qty -= 1;
				if (item.qty === 0) {
					this.cart.splice(index, 1);
				}
			}
		}
		this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (const [index, item] of this.cart.entries()) {
			if (item.id === product.id) {
				this.cartItemCount.next(this.cartItemCount.value - item.qty);
				this.cart.splice(index, 1);
			}
		}
  }
}
