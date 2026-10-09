import { Controller, Get, Post, Query, Render, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import {CreateProductDto} from "./CreateProductDto.dto.js"

 interface OnlineShop {
  name: string
  category: string
  price: number
  stock: number
}


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  OnlineShops: OnlineShop[] =
    [
      {
        "name": "Vezeték nélküli egér",
        "category": "elektronika",
        "price": 8990,
        "stock": 12
      },
      {
        "name": "Programozás kezdőknek",
        "category": "könyv",
        "price": 6490,
        "stock": 4
      },
      {
        "name": "Mechanikus billentyűzet",
        "category": "elektronika",
        "price": 24990,
        "stock": 3
      },
      {
        "name": "Fekete kapucnis pulóver",
        "category": "ruházat",
        "price": 12990,
        "stock": 8
      },
      {
        "name": "Catan társasjáték",
        "category": "játék",
        "price": 11990,
        "stock": 0
      },
      {
        "name": "USB-C töltőkábel",
        "category": "elektronika",
        "price": 4990,
        "stock": 25
      },
      {
        "name": "Adidas sportcipő",
        "category": "ruházat",
        "price": 27990,
        "stock": 2
      },
      {
        "name": "A kis herceg",
        "category": "könyv",
        "price": 3990,
        "stock": 15
      },
      {
        "name": "LEGO City rendőrségi állomás",
        "category": "játék",
        "price": 34990,
        "stock": 5
      },
      {
        "name": "Bluetooth hangszóró",
        "category": "elektronika",
        "price": 15990,
        "stock": 7
      }
    ]


  @Get()
  @Render('index')
  arSzerintNovekvo() {
    return {
      Onlineshops: this.OnlineShops.toSorted((a, b) => a.price - b.price)
    }
  }

  @Get("filter")
  @Render("filter")
  filterShop(@Query("category") category?: string) {
    return {
      category,
      Onlineshops: this.OnlineShops
        .filter(shop =>shop.category === category)
        .toSorted((a, b) => b.stock - a.stock)
    }
  }


  @Get("new")
  @Render("new")
  newDataForm(){
    return { success: false };
  }
  
  @Post("new")
  @Render("new")
  newData(@Body()body: CreateProductDto ){

    const newProduct : OnlineShop={
      name: body.name,
      category:body.category,
      price:parseInt(body.price),
      stock: parseInt(body.stock)

    }
    this.OnlineShops.push(newProduct)

    return{
      success:true
    }
  }


  






}
