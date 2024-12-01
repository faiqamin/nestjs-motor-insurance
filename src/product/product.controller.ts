import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProduct(
    @Query('productCode') productCode: string,
    @Query('location') location: string,
  ) {
    return this.productService.getProduct(productCode, location);
  }

  @Post()
  @UseGuards(AdminGuard)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Put()
  @UseGuards(AdminGuard)
  updateProduct(
    @Query('productCode') productCode: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(productCode, updateProductDto);
  }

  @Delete()
  @UseGuards(AdminGuard)
  deleteProduct(@Query('productCode') productCode: string) {
    return this.productService.deleteProduct(productCode);
  }
}
