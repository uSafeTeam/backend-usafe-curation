import { Test, TestingModule } from '@nestjs/testing';
import { NewProductsController } from './new_products.controller';

describe('NewProductsController', () => {
  let controller: NewProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewProductsController],
    }).compile();

    controller = module.get<NewProductsController>(NewProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
