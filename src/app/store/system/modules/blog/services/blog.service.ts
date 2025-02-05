import { HttpClient } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { IPostBlog } from "../types/interfaces/blog.interface";

@Injectable()
export class BlogService {
    public postBlogs:IPostBlog[]=[]
  constructor(private http: HttpClient) {
    this.postBlogs.push(
        {
            postTitle: 'The Top E-commerce Trends Shaping the Future of Online Retail',
            imgSrc: '',
            id: 1,
            date: new Date(),
            author: 'Super Admin',
            details: {
                content: `In the ever-evolving landscape of online retail, staying ahead of the curve is essential for businesses seeking sustained growth and relevance. 
                This comprehensive exploration delves into the top e-commerce trends poised to shape the future of online retail, offering invaluable insights into emerging technologies, shifting consumer behaviors, and evolving market dynamics.
        
                From the rise of omnichannel shopping experiences to the growing prominence of mobile commerce and social commerce, each trend represents a pivotal shift in how consumers discover, engage with, and purchase products online. Moreover, advancements in artificial intelligence, augmented reality, and personalization are redefining the customer journey, creating new opportunities for brands to connect with their audience in meaningful ways.
        
                Through in-depth analysis, real-world examples, and expert commentary, this article illuminates the forces driving change within the e-commerce landscape and the implications for businesses of all sizes. Whether you're a seasoned industry veteran or a newcomer to the world of online retail, understanding these trends is paramount for success in an increasingly competitive market.
        
                Join us as we embark on a journey of discovery, uncovering the transformative potential of these trends and charting a course towards a future where innovation, adaptability, and customer-centricity reign supreme in the world of online retail.`,
                tags: [
                    'DigitalCommerce',
                    'LimitedTimeDeals',
                    'SavingsTips',
                    'FlashSales',
                    'PriceComparison',
                    'ClientFeedback',
                    'EcommerceTools',
                ]
            }
        },
        {
            postTitle: 'The Top E-commerce Trends Shaping the Future of Online Retail',
            imgSrc: '',
            id: 2,
            date: new Date(), 
            author: 'Super Admin',
            details: {
                content: `In the ever-evolving landscape of online retail, staying ahead of the curve is essential for businesses seeking sustained growth and relevance. 
                This comprehensive exploration delves into the top e-commerce trends poised to shape the future of online retail, offering invaluable insights into emerging technologies, shifting consumer behaviors, and evolving market dynamics.
        
                From the rise of omnichannel shopping experiences to the growing prominence of mobile commerce and social commerce, each trend represents a pivotal shift in how consumers discover, engage with, and purchase products online. Moreover, advancements in artificial intelligence, augmented reality, and personalization are redefining the customer journey, creating new opportunities for brands to connect with their audience in meaningful ways.
        
                Through in-depth analysis, real-world examples, and expert commentary, this article illuminates the forces driving change within the e-commerce landscape and the implications for businesses of all sizes. Whether you're a seasoned industry veteran or a newcomer to the world of online retail, understanding these trends is paramount for success in an increasingly competitive market.
        
                Join us as we embark on a journey of discovery, uncovering the transformative potential of these trends and charting a course towards a future where innovation, adaptability, and customer-centricity reign supreme in the world of online retail.`,
                tags: [
                    'DigitalCommerce',
                    'LimitedTimeDeals',
                    'SavingsTips',
                    'FlashSales',
                    'PriceComparison',
                    'ClientFeedback',
                    'EcommerceTools',
                ]
            }
        },
          {
            postTitle: 'The Top E-commerce Trends Shaping the Future of Online Retail',
            imgSrc: '',
            id: 3,
            date: new Date(), 
            author: 'Super Admin',
            details: {
                content: `In the ever-evolving landscape of online retail, staying ahead of the curve is essential for businesses seeking sustained growth and relevance. 
                This comprehensive exploration delves into the top e-commerce trends poised to shape the future of online retail, offering invaluable insights into emerging technologies, shifting consumer behaviors, and evolving market dynamics.
        
                From the rise of omnichannel shopping experiences to the growing prominence of mobile commerce and social commerce, each trend represents a pivotal shift in how consumers discover, engage with, and purchase products online. Moreover, advancements in artificial intelligence, augmented reality, and personalization are redefining the customer journey, creating new opportunities for brands to connect with their audience in meaningful ways.
        
                Through in-depth analysis, real-world examples, and expert commentary, this article illuminates the forces driving change within the e-commerce landscape and the implications for businesses of all sizes. Whether you're a seasoned industry veteran or a newcomer to the world of online retail, understanding these trends is paramount for success in an increasingly competitive market.
        
                Join us as we embark on a journey of discovery, uncovering the transformative potential of these trends and charting a course towards a future where innovation, adaptability, and customer-centricity reign supreme in the world of online retail.`,
                tags: [
                    'DigitalCommerce',
                    'LimitedTimeDeals',
                    'SavingsTips',
                    'FlashSales',
                    'PriceComparison',
                    'ClientFeedback',
                    'EcommerceTools',
                ]
            }
        },
          {
            postTitle: 'The Top E-commerce Trends Shaping the Future of Online Retail',
            imgSrc: '',
            id: 4,
            date: new Date(),
            author: 'Super Admin',
            details: {
                content: `In the ever-evolving landscape of online retail, staying ahead of the curve is essential for businesses seeking sustained growth and relevance. 
                This comprehensive exploration delves into the top e-commerce trends poised to shape the future of online retail, offering invaluable insights into emerging technologies, shifting consumer behaviors, and evolving market dynamics.
        
                From the rise of omnichannel shopping experiences to the growing prominence of mobile commerce and social commerce, each trend represents a pivotal shift in how consumers discover, engage with, and purchase products online. Moreover, advancements in artificial intelligence, augmented reality, and personalization are redefining the customer journey, creating new opportunities for brands to connect with their audience in meaningful ways.
        
                Through in-depth analysis, real-world examples, and expert commentary, this article illuminates the forces driving change within the e-commerce landscape and the implications for businesses of all sizes. Whether you're a seasoned industry veteran or a newcomer to the world of online retail, understanding these trends is paramount for success in an increasingly competitive market.
        
                Join us as we embark on a journey of discovery, uncovering the transformative potential of these trends and charting a course towards a future where innovation, adaptability, and customer-centricity reign supreme in the world of online retail.`,
                tags: [
                    'DigitalCommerce',
                    'LimitedTimeDeals',
                    'SavingsTips',
                    'FlashSales',
                    'PriceComparison',
                    'ClientFeedback',
                    'EcommerceTools',
                ]
            }
        },
          {
            postTitle: 'The Top E-commerce Trends Shaping the Future of Online Retail',
            imgSrc: '',
            id: 5,
            date: new Date(),
            author: 'Super Admin',
            details: {
                content: `In the ever-evolving landscape of online retail, staying ahead of the curve is essential for businesses seeking sustained growth and relevance. 
                This comprehensive exploration delves into the top e-commerce trends poised to shape the future of online retail, offering invaluable insights into emerging technologies, shifting consumer behaviors, and evolving market dynamics.
        
                From the rise of omnichannel shopping experiences to the growing prominence of mobile commerce and social commerce, each trend represents a pivotal shift in how consumers discover, engage with, and purchase products online. Moreover, advancements in artificial intelligence, augmented reality, and personalization are redefining the customer journey, creating new opportunities for brands to connect with their audience in meaningful ways.
        
                Through in-depth analysis, real-world examples, and expert commentary, this article illuminates the forces driving change within the e-commerce landscape and the implications for businesses of all sizes. Whether you're a seasoned industry veteran or a newcomer to the world of online retail, understanding these trends is paramount for success in an increasingly competitive market.
        
                Join us as we embark on a journey of discovery, uncovering the transformative potential of these trends and charting a course towards a future where innovation, adaptability, and customer-centricity reign supreme in the world of online retail.`,
                tags: [
                    'DigitalCommerce',
                    'LimitedTimeDeals',
                    'SavingsTips',
                    'FlashSales',
                    'PriceComparison',
                    'ClientFeedback',
                    'EcommerceTools',
                ]
            }
        },
          {
            postTitle: 'The Top E-commerce Trends Shaping the Future of Online Retail',
            imgSrc: '', 
            id: 6,
            date: new Date(), 
            author: 'Super Admin',
            details: {
                content: `In the ever-evolving landscape of online retail, staying ahead of the curve is essential for businesses seeking sustained growth and relevance. 
                This comprehensive exploration delves into the top e-commerce trends poised to shape the future of online retail, offering invaluable insights into emerging technologies, shifting consumer behaviors, and evolving market dynamics.
        
                From the rise of omnichannel shopping experiences to the growing prominence of mobile commerce and social commerce, each trend represents a pivotal shift in how consumers discover, engage with, and purchase products online. Moreover, advancements in artificial intelligence, augmented reality, and personalization are redefining the customer journey, creating new opportunities for brands to connect with their audience in meaningful ways.
        
                Through in-depth analysis, real-world examples, and expert commentary, this article illuminates the forces driving change within the e-commerce landscape and the implications for businesses of all sizes. Whether you're a seasoned industry veteran or a newcomer to the world of online retail, understanding these trends is paramount for success in an increasingly competitive market.
        
                Join us as we embark on a journey of discovery, uncovering the transformative potential of these trends and charting a course towards a future where innovation, adaptability, and customer-centricity reign supreme in the world of online retail.`,
                tags: [
                    'DigitalCommerce',
                    'LimitedTimeDeals',
                    'SavingsTips',
                    'FlashSales',
                    'PriceComparison', // Fixed typo
                    'ClientFeedback',
                    'EcommerceTools',
                ]
            }
        },
        {
            postTitle: 'The Top E-commerce Trends Shaping the Future of Online Retail',
            imgSrc: '', 
            id: 7,
            date: new Date(), 
            author: 'Super Admin',
            details: {
                content: `In the ever-evolving landscape of online retail, staying ahead of the curve is essential for businesses seeking sustained growth and relevance. 
                This comprehensive exploration delves into the top e-commerce trends poised to shape the future of online retail, offering invaluable insights into emerging technologies, shifting consumer behaviors, and evolving market dynamics.
        
                From the rise of omnichannel shopping experiences to the growing prominence of mobile commerce and social commerce, each trend represents a pivotal shift in how consumers discover, engage with, and purchase products online. Moreover, advancements in artificial intelligence, augmented reality, and personalization are redefining the customer journey, creating new opportunities for brands to connect with their audience in meaningful ways.
        
                Through in-depth analysis, real-world examples, and expert commentary, this article illuminates the forces driving change within the e-commerce landscape and the implications for businesses of all sizes. Whether you're a seasoned industry veteran or a newcomer to the world of online retail, understanding these trends is paramount for success in an increasingly competitive market.
        
                Join us as we embark on a journey of discovery, uncovering the transformative potential of these trends and charting a course towards a future where innovation, adaptability, and customer-centricity reign supreme in the world of online retail.`,
                tags: [
                    'DigitalCommerce',
                    'LimitedTimeDeals',
                    'SavingsTips',
                    'FlashSales',
                    'PriceComparison', // Fixed typo
                    'ClientFeedback',
                    'EcommerceTools',
                ]
            }
        }
        
    )
  }

  
}
