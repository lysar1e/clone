import { Model, Table, Column, DataType } from "sequelize-typescript";

interface ProductCreationAttributes {
  type: string;
  brand: string;
  title: string;
  img: string;
  price: string;
}

@Table({ tableName: "products" })
export class Product extends Model<Product, ProductCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brand: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  img: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: string;
}
