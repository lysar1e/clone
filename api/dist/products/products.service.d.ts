import { Product } from "./products.model";
import { AddProductDto } from "./dto/add-product.dto";
export declare class ProductsService {
    private productRepository;
    constructor(productRepository: typeof Product);
    addProduct(productDto: AddProductDto): Promise<Product>;
    getProducts(): Promise<Product[]>;
    deleteProduct(id: number): Promise<void>;
    editProduct(id: number): Promise<void>;
}
