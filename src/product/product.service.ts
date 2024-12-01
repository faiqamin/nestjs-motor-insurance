import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getProduct(productCode: string, location: string): Promise<Product> {
    return this.productRepo.findOne({ where: { productCode, location } });
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(createProductDto); // Maps DTO to entity
    return this.productRepo.save(product); // Persists entity in the database
  }

  async updateProduct(productCode: string, update: Partial<Product>) {
    const product = await this.productRepo.findOne({ where: { productCode } });
    if (!product) throw new NotFoundException('Product not found');
    return this.productRepo.save({ ...product, ...update });
  }

  async deleteProduct(productCode: string) {
    const result = await this.productRepo.delete({ productCode });
    if (!result.affected) throw new NotFoundException('Product not found');
    return result;
  }
}
