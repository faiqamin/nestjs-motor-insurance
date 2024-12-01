import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number; // Auto-generated ID

  @Column()
  productCode: string;

  @Column()
  location: string;

  @Column('decimal')
  price: number;
}
