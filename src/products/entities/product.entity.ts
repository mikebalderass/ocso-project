import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  productId: string;
  @Column('text')
  productName: string;
  @Column('float')
  price: number;
  @Column('int')
  countSeal: number;
  // @Column('uuid')
  // provider: string;
}