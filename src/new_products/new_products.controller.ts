import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NewProductDto } from './dto/new_product.dto';
import { NewProductsService } from './new_products.service';
import { UpdateNewProductDto } from './dto/update_new_product.dto';
import { GoManyToFirebaseDto } from './dto/go_many_to_firebase.dto';

@Controller('/newProducts')
export class NewProductsController {
  private readonly logger = new Logger(NewProductsController.name);
  constructor(private readonly newProductsService: NewProductsService) {}

  @Get()
  findAll() {
    try {
      return this.newProductsService.findAll();
    } catch (error) {
      this.logger.error('Failed to retrieve products', error.stack);
      throw new InternalServerErrorException('Erro ao buscar produtos');
    }
  }

  @Get('/ping')
  ping() {
    return { message: 'pong' };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newProductsService.findOne(id);
  }

  @Post()
  create(@Body() data: NewProductDto) {
    return this.newProductsService.create(data);
  }

  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() data: UpdateNewProductDto) {
    try {
      const updated = await this.newProductsService.update(data, id);
      if (!updated) {
        throw new InternalServerErrorException(
          `Produto com id ${id} não encontrado`,
        );
      }

      return { success: true };
    } catch (err) {
      this.logger.error(`Failed to update product ${id}`, err.stack);
      throw new InternalServerErrorException('Erro ao atualizar produto');
    }
  }

  @Put('/goManyToFireBase')
  goManyToFireBase(@Body() dto: GoManyToFirebaseDto) {
    this.logger.log(`Going to send products to Firebase ${dto.ids}`, dto.ids);
    this.logger.log(`Going to send products to Firebase ${dto.whoSendToFirebase}`, dto.whoSendToFirebase);

    return this.newProductsService.goManyToFireBase(
      dto.ids,
      dto.whoSendToFirebase,
    );
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.newProductsService.delete(id);
  }
}
