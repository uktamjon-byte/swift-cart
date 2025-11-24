import { Component, OnInit } from '@angular/core';
import { ICustomerCare } from '../../types/interfaces/pages.interface';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss'],
})
export class UserRequestComponent implements OnInit {
  collapsed: any;
  constructor() {}
  userRequests: ICustomerCare[] = [
    {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      question: 'How can I reset my account password?',
      phone: '+1 202 555 0134',
    },
    {
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      question: 'Do you offer international shipping?',
      phone: '+44 7890 123456',
    },
    {
      name: 'Sophia Davis',
      email: 'sophia.davis@example.com',
      question: 'Can I cancel my order after payment?',
      phone: '+1 303 555 0198',
    },
    {
      name: 'Daniel Smith',
      email: 'daniel.smith@example.com',
      question: 'What is your refund policy?',
      phone: '+61 412 345 678',
    },
  ];
  ngOnInit(): void {}

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  onRowRemoved(e: any) {
    console.log('Deleted:', e.data);
  }
}
