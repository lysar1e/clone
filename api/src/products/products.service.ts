import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./products.model";
import { AddProductDto } from "./dto/add-product.dto";
import { EditProductDto } from "./dto/edit-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product
  ) {}

  async addProduct(productDto: AddProductDto) {
    const product = await this.productRepository.create(productDto);
    return product;
  }

  async getProducts() {
    const products = await this.productRepository.findAll();
    return products;
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    return product.destroy();
  }

  async editProduct(id: number, editProductDto: EditProductDto) {
      const product = await this.productRepository.findOne({where: {id}});
  }
}
