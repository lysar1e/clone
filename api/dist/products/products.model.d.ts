import { Model } from "sequelize-typescript";
interface ProductCreationAttributes {
    type: string;
    brand: string;
    title: string;
    img: string;
    price: string;
}
export declare class Product extends Model<Product, ProductCreationAttributes> {
    id: number;
    type: string;
    brand: string;
    title: string;
    img: string;
    price: string;
}
export {};
