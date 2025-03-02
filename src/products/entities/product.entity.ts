import { Provider } from "src/providers/entities/provider.entity";
import { Column, ManyToOne, Entity, PrimaryGeneratedColumn } from "typeorm";@Entity()

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
  @ManyToOne(() => Provider, (provider) => provider.products)
  provider: Provider
}