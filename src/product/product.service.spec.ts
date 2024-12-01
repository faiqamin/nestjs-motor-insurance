import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T>(): MockRepository<T> => ({
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
});

describe('ProductService', () => {
    let service: ProductService;
    let mockRepo: MockRepository<Product>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                { provide: getRepositoryToken(Product), useValue: createMockRepository<Product>() },
            ],
        }).compile();

        service = module.get<ProductService>(ProductService);
        mockRepo = module.get<MockRepository<Product>>(getRepositoryToken(Product));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a product', async () => {
        const productCode = '1000';
        const location = 'West Malaysia';
        const product = { id: 1, productCode, location, price: 300 };
        mockRepo.findOne?.mockResolvedValue(product);

        expect(await service.getProduct(productCode, location)).toEqual(product);
        expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { productCode, location } });
    });

    it('should create a product', async () => {
        const product = { productCode: '1000', location: 'West Malaysia', price: 300 };
        const savedProduct = { id: 1, ...product };

        mockRepo.create?.mockReturnValue(product);
        mockRepo.save?.mockResolvedValue(savedProduct);

        expect(await service.createProduct(product)).toEqual(savedProduct);
        expect(mockRepo.create).toHaveBeenCalledWith(product);
        expect(mockRepo.save).toHaveBeenCalledWith(product);
    });

    it('should delete a product', async () => {
        mockRepo.delete?.mockResolvedValue({ affected: 1 });

        expect(await service.deleteProduct('1000')).toEqual({ affected: 1 });
        expect(mockRepo.delete).toHaveBeenCalledWith({ productCode: '1000' });
    });
});
