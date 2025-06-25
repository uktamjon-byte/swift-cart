import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../shared/services/shop.service';
import { IProduct } from '../../../shop/types/interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-product',
  templateUrl: './checkout-product.component.html',
  styleUrls: ['./checkout-product.component.scss']
})
export class CheckoutProductComponent implements OnInit {
checkoutForm:FormGroup;
isTermsChecked:boolean = false;
orderProducts:IProduct[]=[];
selectedCountry: string = '';
regions: string[] = [];
selectedPaymentMethod:string = '';
  constructor(private shopService:ShopService) {
      this.checkoutForm = new FormGroup({
              email: new FormControl('', [Validators.required,Validators.email]),
              phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
              firstName: new FormControl('', Validators.required),
              lastName: new FormControl('', Validators.required),
              address1: new FormControl('', Validators.required),
              address2: new FormControl(''),
              city: new FormControl('', Validators.required),
              postCode: new FormControl('', Validators.required),
              country: new FormControl('', Validators.required),
              region: new FormControl('', Validators.required),
              note: new FormControl(''),
              paymentMethod: new FormControl('', Validators.required),
              shippingMethod: new FormControl('', Validators.required),
              cardholderCountry: new FormControl('', Validators.required),
              expireDate: new FormControl('', Validators.required),
              cardNumber: new FormControl('', Validators.required),
              cvc: new FormControl('', Validators.required),
           });
   }
  countries = [
    { name: 'USA', code: 'US', regions: ['California', 'Texas', 'Florida'] },
    { name: 'Canada', code: 'CA', regions: ['Ontario', 'Quebec', 'British Columbia'] },
    { name: 'Germany', code: 'DE', regions: ['Bavaria', 'Berlin', 'Hesse'] }
  ]; 
  
  paymentMethods = [
  { name: 'paymentPaypalName', isActive: false, description: 'paymentPaypalDescription' },
  { name: 'paymentCashName', isActive: false, description: 'paymentCashDescription' },
  { name: 'paymentDcName', isActive: false, description: 'paymentDcDescription' }
];

  shippingMethods = [
  { name: 'freeShipping', price: 0 },
  { name: 'localPickup', price: 12 },
  { name: 'flatRate', price: 20 }
];

 
  
  ngOnInit() {
    this.orderProducts = this.shopService.pruduct;
    this.checkoutForm.get('region')?.disable();
    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe((value: string) => {
    this.selectedPaymentMethod = value;
    });

    if (this.paymentMethods.length > 0) {
      const firstMethod = this.paymentMethods[0];
      firstMethod.isActive = true; // visually checked
      this.checkoutForm.get('paymentMethod')?.setValue(firstMethod.name); // set form value
    }
    if (this.shippingMethods.length > 0) {
      const firstMethod = this.shippingMethods[0]; // visually checked
      this.checkoutForm.get('shippingMethod')?.setValue(firstMethod.name); // set form value
    }

  }

  submitCheckoutForm(){
    console.log('checkform', this.checkoutForm.value);
    console.log('checkform');
  }


  onCountryChange(event:Event){
    const target = event.target as HTMLSelectElement; // Explicitly cast event.target
    const countryName = target.value;
    console.log('sdsd', countryName)

    const selected = this.countries.find(c => c.name === countryName);
    this.regions = selected ? selected.regions : [];
    this.checkoutForm.get('region')?.[this.regions.length === 0 ? 'disable' : 'enable']();
  }

}
