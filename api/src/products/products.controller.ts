import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AddProductDto } from "./dto/add-product.dto";
import { EditProductDto } from "./dto/edit-product.dto";
@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  addProduct(@Body() addProductDto: AddProductDto) {
    return this.productsService.addProduct(addProductDto);
  }

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Delete(":id")
  deleteProduct(@Param("id") id: number) {
    return this.productsService.deleteProduct(id);
  }

  @Patch(":id")
  editProduct(@Param("id") id: number, @Body() editProductDto: EditProductDto) {
    return this.productsService.editProduct(id, editProductDto);
  }
}
