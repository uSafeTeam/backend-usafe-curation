import { Test, TestingModule } from '@nestjs/testing';
import { NewProductsService } from './new_products.service';

describe('NewProductsService', () => {
  let service: NewProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewProductsService],
    }).compile();

    service = module.get<NewProductsService>(NewProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
