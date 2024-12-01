import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { AdminGuard } from 'src/common/guards/admin.guard';

const mockService = {
    getProduct: jest.fn(),
    createProduct: jest.fn(),
    deleteProduct: jest.fn(),
};

describe('ProductController', () => {
    let controller: ProductController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [{ provide: ProductService, useValue: mockService }],
        })
            .overrideGuard(AdminGuard)
            .useValue({ canActivate: jest.fn(() => true) })
            .compile();

        controller = module.get<ProductController>(ProductController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should get a product', async () => {
        const productCode = '1000';
        const location = 'West Malaysia';
        const product = { id: 1, productCode, location, price: 300 };
        mockService.getProduct.mockResolvedValue(product);

        expect(await controller.getProduct(productCode, location)).toEqual(product);
    });

    it('should create a product', async () => {
        const product = { productCode: '1000', location: 'West Malaysia', price: 300 };
        const savedProduct = { id: 1, ...product };
        mockService.createProduct.mockResolvedValue(savedProduct);

        expect(await controller.createProduct(product)).toEqual(savedProduct);
        expect(mockService.createProduct).toHaveBeenCalledWith(product);
    });
});
