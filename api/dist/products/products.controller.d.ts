import { ProductsService } from "./products.service";
import { AddProductDto } from "./dto/add-product.dto";
import { EditProductDto } from "./dto/edit-product.dto";
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    addProduct(addProductDto: AddProductDto): Promise<import("./products.model").Product>;
    getProducts(): Promise<import("./products.model").Product[]>;
    deleteProduct(id: number): Promise<void>;
    editProduct(id: number, editProductDto: EditProductDto): Promise<void>;
}
