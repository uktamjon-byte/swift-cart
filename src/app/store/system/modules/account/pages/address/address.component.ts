import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addressForm:FormGroup;
  isAddressCardActive:boolean = true;
  isEditAddressActive:boolean = false;
  regions:string[]=[];
  constructor(private dialog:MatDialog) {
        this.addressForm = new FormGroup({
                  firstName: new FormControl('', Validators.required),
                  lastName: new FormControl('', Validators.required),
                  address1: new FormControl('', Validators.required),
                  address2: new FormControl('', Validators.required),
                  city: new FormControl('', Validators.required),
                  region: new FormControl('', Validators.required),
                  country: new FormControl('', Validators.required),
                  postCode: new FormControl('', Validators.required),

                })
   }

   countries = [
    { name: 'USA', code: 'US', regions: ['California', 'Texas', 'Florida'] },
    { name: 'Canada', code: 'CA', regions: ['Ontario', 'Quebec', 'British Columbia'] },
    { name: 'Germany', code: 'DE', regions: ['Bavaria', 'Berlin', 'Hesse'] }
  ]; 
 
  ngOnInit(): void {
  }

  deleteAddress(){
     this.dialog.open(ConfirmWindowComponent, {
      data:{
        title:'Demo Admin',
        message:'Are you sure you wonna delete this address?'
      }
     })
  }

  onCountryChange($event:Event){
    let target = $event.target as HTMLSelectElement;
    const countryName = target.value;

    const selected = this.countries.find(c => c.name === countryName);
    this.regions = selected ? selected.regions : [];
    this.addressForm.get('region')?.[this.regions.length === 0 ? 'disable' : 'enable']();
  }

  onSubmit(){
    console.log('red bull', this.addressForm.value)
  }

  toggleAddress(){
    this.isAddressCardActive = !this.isAddressCardActive;
    this.isEditAddressActive = !this.isEditAddressActive;
  }
}
