import { Component, OnInit, ViewChild } from '@angular/core';
import { IFaq } from '../../types/interfaces/pages.interface';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  collapsed: any;
  selectedFaq!: IFaq;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  constructor(private router: Router) {}
  faqs: IFaq[] = [
    {
      id: 1,
      title: 'How can I track my order?',
      description:
        'You can track your order status by visiting the “My Orders” section in your account dashboard.',
      isActive: true,
    },
    {
      id: 2,
      title: 'What is your return policy?',
      description:
        'We accept returns within 14 days of delivery, provided that the item is unused and in its original packaging.',
      isActive: false,
    },
    {
      id: 3,
      title: 'Do you offer international shipping?',
      description:
        'Yes, we ship to most countries worldwide. Shipping fees and delivery times vary by destination.',
      isActive: false,
    },
    {
      id: 4,
      title: 'How can I contact customer support?',
      description:
        'You can reach us through the “Contact Us” page or by emailing support@example.com.',
      isActive: false,
    },
  ];
  ngOnInit(): void {}

  truncateText(text: string, maxLength: number = 100): string {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  onRowRemoved(e: any) {
    console.log('Deleted:', e.data);
  }

  onRowClick($event: any) {
    this.selectedFaq = $event.data;
    this.router.navigate([`pages/faq/edit/${this.selectedFaq.id}`]);
  }
}
